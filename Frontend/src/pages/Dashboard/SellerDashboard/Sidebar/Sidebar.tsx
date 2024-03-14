import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import style from "./Sidebar.module.css";
import {
  closeSection,
  selectAction,
  toggleSection,
} from "../../../../redux/reducers/sellerDashboardSlice";
import { Container, Logo } from "../../../../components";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Sidebar = () => {
  const { sectionsState } = useSelector(
    (state: RootState) => state.sellerDashboard
  );
  const dispatch = useDispatch();
  const sections = [
    {
      product: {
        actions: ["allProduct", "addProduct", "detailProduct"],
        icon: <AccountBoxRoundedIcon style={{height:"28px", width:"28px",flexShrink:"0",marginRight:"16px"}} />,
      },
    },
    {
      order: {
        actions: ["allOrder"],
        icon: <ShoppingCartRoundedIcon style={{height:"28px", width:"28px",flexShrink:"0",marginRight:"16px"}}/>,
      },
    },
  ];
  return (
    <Container
      sx={{
        width: "20%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // gap: "20px",
        padding: "20px",
        overflow: "auto",
        borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
        fontFamily: 'sans-serif',
      }}
    >
      <img className={style.Logo} src={Logo} alt="" />
      <div className={style.SideBarSections}>
        <h2 className={style.SideBarSectionsHeading}>Overview</h2>
        <button
          className={style.sectionButton}
          onClick={() => dispatch(closeSection())}
        >
          App
        </button>
      </div>
      <div className={style.SideBarSections}>
        <h2 className={style.SideBarSectionsHeading}>Management</h2>
        {sections.map((section, index) => {
          const sectionName = Object.keys(section)[0];
          const actions = section[sectionName].actions;
          return (
            <div key={index} className={style.section}>
              <div
                onClick={() => dispatch(toggleSection(sectionName))}
                className={style.sectionButton}
              >
                <div className={style.sectionName}>
                  {section[sectionName].icon}
                  <p className={style.SectionNameHeading}>{sectionName}</p>
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
                          dispatch(
                            selectAction({
                              selectedSection: sectionName,
                              selectedAction: action,
                            })
                          )
                        }
                        className={style.actionButton}
                      >
                        <p className={style.SectionNameHeading}>{action}</p>
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
