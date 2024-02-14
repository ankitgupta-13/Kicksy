import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentAction = useSelector((state) => state.dashboard.selectedAction);
  console.log(currentAction);
  return (
    <div>
      <h1>Dashboard</h1>
      <Sidebar />
      <MainContent selectedAction={currentAction} />
    </div>
  );
};

export default Dashboard;
