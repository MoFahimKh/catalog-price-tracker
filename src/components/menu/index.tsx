import style from "./style.module.scss";

export const Menu = () => {
  return (
    <div>
      <div className={style["menu-container"]}>
        <div>Summary</div>
        <div className={style["active-tab"]}>Chart</div>
        <div>Statistics</div>
        <div>Analysis</div>
        <div>Settings</div>
      </div>
    </div>
  );
};
