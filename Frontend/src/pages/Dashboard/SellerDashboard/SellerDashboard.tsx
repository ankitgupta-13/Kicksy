import style from "./SellerDashboard.module.css";
import Sidebar from "./Sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";
import { Breadcrumb, Container } from "../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import MediaQuery from "react-responsive";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { currentSection, currentAction } = useSelector(
    (state: RootState) => state.sellerDashboard
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
        <button className={style.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          left: sidebarOpen ? "82vw" : "1rem",
          top: sidebarOpen ? "2.4rem" : "1rem",
          color: sidebarOpen ? "black" : "black",
        }} >
          { sidebarOpen ? <CloseIcon /> : <MenuIcon /> }
        </button>
      </MediaQuery>
      <div className={style.right} style={{paddingTop: "3rem"}}>
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
