import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";
import style from "./Dashboard.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Dashboard = () => {
  const { currentSection, currentAction } = useSelector(
    (state) => state.dashboard
  );
  return (
    <div>
      <div className={style.container}>
        <Sidebar />
        <div className={style.right}>
          <Breadcrumb />
          <MainContent
            currentSection={currentSection}
            currentAction={currentAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
