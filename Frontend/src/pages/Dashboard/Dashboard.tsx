import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { useSelector } from "react-redux";
import style from "./Dashboard.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Container } from "../../components";

const Dashboard = () => {
  const { currentSection, currentAction } = useSelector(
    (state) => state.dashboard
  );
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Sidebar />
      <div className={style.right}>
        <Breadcrumb />
        <MainContent
          currentSection={currentSection}
          currentAction={currentAction}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
