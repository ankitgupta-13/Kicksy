import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";
import style from './Dashboard.module.css'

const Dashboard = () => {
  const currentAction = useSelector((state) => state.dashboard.selectedAction);
  console.log(currentAction);
  return (
    <div className={style.dashboard}>
      <Sidebar />
      <MainContent selectedAction={currentAction} />
    </div>
  );
};

export default Dashboard;
