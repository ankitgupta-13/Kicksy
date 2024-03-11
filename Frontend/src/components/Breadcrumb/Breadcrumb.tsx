import style from "./Breadcrumb.module.css";

const Breadcrumb = ({ currentSection, currentAction }) => {
  return (
    <div className={style.container}>
      <div className={style.heading}>Dashboard</div>
      {currentSection && (
        <div className={style.step}>
          <div className={style.circle}></div>
          <div> {currentSection}</div>
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
