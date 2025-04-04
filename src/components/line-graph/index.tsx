import { TabsPanel } from "../tabs/tabsPanel";
import React, { useEffect, useState } from "react";
import { LineGraph } from "./line-graph";
import style from "./style.module.scss";
import bgImg from "../../assets/volume.svg";
import fullscreen from "../../assets/icon.svg";
import compare from "../../assets/icon1.svg";
import VerticalLinesDiv from "./vertical-lines";

interface LineGraphViewProps {
  tokenName: string | undefined;
  setTokenState: any;
  tokenState: any;
}

const tabs = [
  {
    id: "1d",
    duration: 1,
  },
  {
    id: "3d",
    duration: 3,
  },
  {
    id: "1m",
    duration: 30,
  },
  {
    id: "6m",
    duration: 1800,
  },
  {
    id: "1y",
    duration: 365,
  },
  {
    id: "max",
    duration: 3650,
  },
];

export const LineGraphView: React.FC<LineGraphViewProps> = ({
  tokenName,
  setTokenState,
  tokenState,
}) => {
  const [activeTab, setActiveTab] = useState<any>(tabs[0]);
  const [duration, setDuration] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fiatCurrency = "usd";

  useEffect(() => {
    const activeTabDetails = tabs.find((tab) => tab.id == activeTab);
    const duration = activeTabDetails
      ? activeTabDetails.duration
      : tabs[0].duration;
    setDuration(duration);
  }, [activeTab]);

  return (
    <div className={style["graph-container"]}>
      {tokenState?.diff && (
        <div className={style["graph-tabs"]}>
          <div className={style["graph-tabs-right"]}>
            <div
              className={style["graph-tabs-items"]}
              style={{ cursor: "pointer" }}
            >
              <img src={fullscreen} alt="" />
              Fullscreen
            </div>
            <div className={style["graph-tabs-items"]}>
              <img src={compare} alt="" />
              Compare
            </div>
          </div>
          <TabsPanel
            tabs={tabs}
            activeTabId={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
      {!loading && !tokenState?.diff && (
        <div className={style["errorText"]}>Line Graph unavailable</div>
      )}
      <div
        style={{
          position: "relative",
          border: "2px solid #E2E4E7",
          borderTop: "none",
        }}
      >
        <VerticalLinesDiv />
        <LineGraph
          duration={duration}
          tokenName={tokenName}
          setTokenState={setTokenState}
          loading={loading}
          setLoading={setLoading}
          vsCurrency={fiatCurrency}
        />
        <img src={bgImg} alt="" style={{ marginBottom: "-3px" }} />
      </div>
    </div>
  );
};
