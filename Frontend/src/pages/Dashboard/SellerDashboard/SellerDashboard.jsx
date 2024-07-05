import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { Breadcrumb, Container } from "../../../components";
import MainContent from "./MainContent/MainContent";
import style from "./SellerDashboard.module.css";
import Sidebar from "./Sidebar/Sidebar";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { currentSection, currentAction } = useSelector(
    (state) => state.sellerDashboard
  );
  return (
    <Container
      sx={{
        flexDirection: "row",
        gap: "0px",
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
            color: sidebarOpen ? "black" : "black",
          }}
        >
          {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </MediaQuery>
      <div className={style.right} style={{ paddingTop: "3rem" }}>
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

export default SellerDashboard;
