import { useSelector } from "react-redux";
import style from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const { currentSection, currentAction } = useSelector(
    (state) => state.dashboard
  );
  return (
    <div className={style.container}>
      <div>Dashboard</div>
      {currentSection && (
        <div className={style.step}>
          <div className={style.circle}></div>
          <div>{currentSection}</div>
        </div>
      )}
      {currentAction && (
        <div className={style.step}>
          <div className={style.circle}></div>
          <div>{currentAction}</div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
