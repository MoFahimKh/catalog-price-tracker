import { useState } from "react";
import "./App.css";
import { LineGraphView } from "./components/line-graph";
import { Menu } from "./components/menu";
import { EthereumPriceChange } from "./components/price-change";
import { ConnectWallet } from "./components/connect-wallet";

function App() {
  const [tokenState, setTokenState] = useState(0);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  return (
    <div>
      <ConnectWallet
        account={account}
        setAccount={setAccount}
        balance={balance}
        setBalance={setBalance}
      />
      <EthereumPriceChange balance={balance} account={account} />
      <Menu />
      <LineGraphView
        tokenName={"ethereum"}
        tokenState={tokenState}
        setTokenState={setTokenState}
      />
    </div>
  );
}

export default App;
