import React, { useState, useEffect } from "react";
import { fetchPriceChange } from "../../utils/fetchPriceChange";
import style from "./style.module.scss";
import Loader from "../../assets/loading.svg";

type PriceChangeProps = {
  currency?: string;
  balance: number | null;
  account: string | null;
};

const isMetaMaskInstalled = (): boolean => {
  return (
    typeof window !== "undefined" &&
    typeof (window as any).ethereum !== "undefined"
  );
};

export const EthereumPriceChange: React.FC<PriceChangeProps> = ({
  currency = "usd",
  balance,
  account,
}) => {
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const metamaskAvailable = isMetaMaskInstalled();

  useEffect(() => {
    const init = async () => {
      await fetchPriceChange(
        setLoading,
        setPriceChange,
        setError,
        setEthPrice,
        currency
      );
    };
    init();
  }, [currency, balance]);

  if (!metamaskAvailable) {
    return (
      <div className={style["container"]}>
        <div className={style["price-in-usd"]}>
          $63,179.71 <span className={style["usd"]}>USD</span>
        </div>
        <div className={style["price-change"]} style={{ color: "#67BF6B" }}>
          +$2,161.42 (3.54%)
        </div>
        <div
          className={style["note"]}
          style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}
        >
          This is a dummy value shown because MetaMask is not installed.
        </div>
      </div>
    );
  }

  if (balance === null) return null;

  const convertedBalance = ethPrice !== null ? balance * ethPrice : null;
  const balanceChange =
    convertedBalance !== null && priceChange !== null
      ? (convertedBalance * priceChange) / 100
      : null;

  if (loading)
    return (
      <div>
        <img src={Loader} alt="Loading..." height={20} width={20} />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    account && (
      <div className={style["container"]}>
        <div className={style["price-in-usd"]}>
          {convertedBalance !== null && `$${convertedBalance.toFixed(2)}`}
          <div className={style["usd"]}>USD</div>
        </div>
        <div
          className={style["price-change"]}
          style={{
            color: priceChange && priceChange > 0 ? "#67BF6B" : "#f71d1d",
          }}
        >
          {priceChange !== null
            ? `Change: ${
                balanceChange !== null ? `$${balanceChange.toFixed(2)}` : "N/A"
              } (${priceChange.toFixed(2)}%)`
            : "Data not available."}
        </div>
      </div>
    )
  );
};
