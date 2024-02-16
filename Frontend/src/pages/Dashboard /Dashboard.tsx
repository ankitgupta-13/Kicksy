import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";
import style from "./Dashboard.module.css";

const Dashboard = () => {
  const { currentSection, currentAction } = useSelector(
    (state) => state.dashboard
  );
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={style.container}>
        <Sidebar />
        <MainContent
          currentSection={currentSection}
          currentAction={currentAction}
        />
      </div>
    </div>
  );
};

export default Dashboard;
