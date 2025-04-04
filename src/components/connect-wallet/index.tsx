import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { formatAddress } from "../../utils/formats";
import style from "./style.module.scss";
import { connectWallet } from "../../utils/connectWallet";

interface ConnectProps {
  account: string | null;
  balance: number | null;
  setAccount: any;
  setBalance: any;
}
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const ConnectWallet: React.FC<ConnectProps> = ({
  account,
  setAccount,
  balance,
  setBalance,
}) => {
  const [error, setError] = useState<string | null>(null);

  const updateAccountAndBalance = async (address: string) => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceInWei = await provider.getBalance(address);
      const balanceInEth = parseFloat(ethers.formatEther(balanceInWei));
      setAccount(address);
      setBalance(balanceInEth);
      setError(null);
    } catch (err) {
      setError("Failed to update wallet details.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          updateAccountAndBalance(accounts[0]);
        } else {
          // If no accounts, reset account and balance
          setAccount(null);
          setBalance(null);
        }
      });

      // Listen for network changes
      window.ethereum.on("chainChanged", () => {
        setAccount(null);
        setBalance(null);
        setError("Network changed. Please reconnect to Sepolia.");
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          updateAccountAndBalance
        );
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  return (
    <div className={style["connect-wallet-container"]}>
      {account && <div>Balance: {balance && balance.toFixed(4)} ETH</div>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <button onClick={() => connectWallet(setAccount, setError, setBalance)}>
        {account ? formatAddress(account) : "Connect Wallet"}
      </button>
    </div>
  );
};
