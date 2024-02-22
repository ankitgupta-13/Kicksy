import { useSelector, useDispatch } from "react-redux";
import {
  closeSection,
  selectAction,
  toggleSection,
} from "../../../redux/reducers/dashboardSlice";
import logo from "../../../assets/Krisksy.svg";
import style from "./Sidebar.module.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Container } from "@mui/material";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sectionsState } = useSelector((state) => state.dashboard);

  const sections = [
    {
      user: {
        actions: ["allUser", "profileUser", "editUser"],
        icon: <AccountBoxRoundedIcon />,
      },
    },
    {
      product: {
        actions: ["allProduct", "addProduct"],
        icon: <AccountBoxRoundedIcon />,
      },
    },
    {
      order: {
        actions: ["allOrder", "editOrder", "deleteOrder"],
        icon: <ShoppingCartRoundedIcon />,
      },
    },
    {
      blog: {
        actions: ["addblog", "listblogs"],
        icon: <NoteAltRoundedIcon />,
      },
    },
  ];

  const handleSectionClick = (sectionName) => {
    dispatch(toggleSection(sectionName));
  };

  const handleActionClick = (sectionName, actionName) => {
    dispatch(
      selectAction({ selectedSection: sectionName, selectedAction: actionName })
    );
  };

  return (
    <Container
      sx={{
        width: "15%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "10px",
        overflow: "auto",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <img className={style.Logo} src={logo} alt="" />
      <div>
        <h2>Overview</h2>
        <button
          className={style.sectionButton}
          onClick={() => dispatch(closeSection())}
        >
          App
        </button>
      </div>
      <div>
        <h2>Management</h2>
        {sections.map((section, index) => {
          const sectionName = Object.keys(section)[0];
          const actions = section[sectionName].actions;
          return (
            <div key={index} className={style.section}>
              <div
                onClick={() => handleSectionClick(sectionName)}
                className={style.sectionButton}
              >
                <div className={style.sectionName}>
                  {section[sectionName].icon}
                  <p>{sectionName}</p>
                </div>
                <KeyboardArrowRightRoundedIcon
                  style={{
                    transform: sectionsState[sectionName]
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              {sectionsState[sectionName] && (
                <div className={style.actions}>
                  {actions.map((action, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleActionClick(sectionName, action)}
                        className={style.actionButton}
                      >
                        <p>{action}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Sidebar;
