import { useSelector, useDispatch } from "react-redux";
import {
  closeSection,
  selectAction,
  toggleSection,
} from "../../../../redux/reducers/adminDashboardSlice";
import logo from "../../../../assets/Krisksy.svg";
import style from "./Sidebar.module.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Container } from "@mui/material";
import { RootState } from "../../../../redux/store/store";
import { Logo } from "../../../../components";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sectionsState } = useSelector(
    (state: RootState) => state.adminDashboard
  );

  const sections = [
    {
      User: {
        actions: ["All User", "Profile User", "Edit User"],
        icon: <AccountBoxRoundedIcon />,
      },
    },
    {
      seller: {
        actions: ["All Seller", "Profile Seller", "Seller Request"],
        icon: <AccountBoxRoundedIcon />,
      },
    },
    {
      product: {
        actions: [
          "All Product",
          "Product Detail",
          "Add Product",
          "Product Request",
        ],
        icon: <AccountBoxRoundedIcon />,
      },
    },
    {
      order: {
        actions: ["All Order", "Edit Order", "Delete Order"],
        icon: <ShoppingCartRoundedIcon />,
      },
    },
    {
      blog: {
        actions: ["Add Blog", "Blogs List"],
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
    <>
      <div className={style.sidebarBody}>
        <div className={style.Logo}>
          <Logo />
        </div>
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "10px",
            overflow: "auto",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <div onClick={() => navigate("/")}>
            <img className={style.Logo} src={logo} alt="" />
          </div>
          <div>
            <h2 className={style.SideBarSectionsHeading}>Overview</h2>
            <button
              className={style.sectionButton}
              onClick={() => dispatch(closeSection())}
            >
              App
            </button>
          </div>
          <div>
            <h2 className={style.SideBarSectionsHeading}>Management</h2>
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
                            onClick={() =>
                              handleActionClick(sectionName, action)
                            }
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
      </div>
    </>
  );
};

export default Sidebar;
