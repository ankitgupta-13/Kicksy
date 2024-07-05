import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { Breadcrumb, Container } from "../../../components";
import style from "./AdminDashboard.module.css";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./Sidebar/Sidebar";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentSection, currentAction } = useSelector(
    (state) => state.adminDashboard
  );
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <MediaQuery minWidth={431}>
        <Sidebar ss={{ display: "" }} />
      </MediaQuery>
      <MediaQuery maxWidth={431}>
        <Sidebar ss={{ display: sidebarOpen ? "" : "none" }} />
        <button
          className={style.menuBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            left: sidebarOpen ? "82vw" : "1rem",
            top: sidebarOpen ? "2.4rem" : "1rem",
            color: sidebarOpen ? "white" : "black",
          }}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </MediaQuery>
      <div className={style.right}>
        <div className={style.Heading}>Admin Dashboard</div>
        <Breadcrumb
          currentSection={currentSection}
          currentAction={currentAction}
        />
        <MainContent
          currentSection={currentSection}
          currentAction={currentAction}
        />
      </div>
    </Container>
  );
};

export default AdminDashboard;
