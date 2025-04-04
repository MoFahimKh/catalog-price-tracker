import { ethers } from "ethers";

export const connectWallet = async (setAccount:any, setError:any, setBalance:any) => {
    if (window && window.ethereum && window.ethereum.isMetaMask) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Ensure the network is Sepolia
        const network = await provider.getNetwork();
        if (network.chainId != BigInt(11155111)) {
          setError("Please switch to the Sepolia network in MetaMask.");
          return;
        }

        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = signer.address;
        setAccount(address);

        const balanceInWei = await provider.getBalance(address);
        const balanceInEth = parseFloat(ethers.formatEther(balanceInWei));
        setBalance(balanceInEth);
        setError(null);
      } catch (err) {
        setError("Failed to connect wallet.");
        console.error(err);
      }
    } else {
      setError("MetaMask is not installed.");
    }
  };