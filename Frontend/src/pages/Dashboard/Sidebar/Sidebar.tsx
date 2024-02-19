import { useSelector, useDispatch } from "react-redux";
import {
  selectAction,
  toggleSection,
} from "../../../redux/reducers/dashboardSlice";
import logo from "../../../assets/Krisksy.svg";
import style from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sectionsState } = useSelector((state) => state.dashboard);
  const sections = [
    {
      user: ["allUser", "editUser", "deleteUser"],
    },
    {
      product: ["addProduct", "editProduct", "deleteProduct"],
    },
    {
      order: ["allOrder", "editOrder", "deleteOrder"],
    },
    {
      blogs: ["addblog", "listblogs"],
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
    <div className={style.sidebarcontainer}>
      <img className={style.Logo} src={logo} alt="" />
      {sections.map((section, index) => {
        const sectionName = Object.keys(section)[0];
        return (
          <div key={index}>
            <button
              onClick={() => handleSectionClick(sectionName)}
              className={style.fullWidthButton}
            >
              {sectionName}
            </button>
            {sectionsState[sectionName] && (
              <ul>
                {Object.values(section)[0].map((action, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={() => handleActionClick(sectionName, action)}
                        className={style.subButton}
                      >
                        {action}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
