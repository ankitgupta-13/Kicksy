import { useSelector, useDispatch } from "react-redux";
import { toggleSection } from "../../../redux/reducers/dashboardSlice";
import logo from "../../../assets/Krisksy.svg";
import style from "./Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sectionsState = useSelector((state) => state.dashboard.sectionsState);
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
  ];
  return (
    <div className={style.sidebarcontainer}>
      <img className={style.Logo} src={logo} alt="" />
      {sections.map((section, index) => {
        const sectionName = Object.keys(section)[0];
        return (
          <div key={index} className={style.sidebarSection}>
          <button
            onClick={() => dispatch(toggleSection(sectionName))}
            className={style.fullWidthButton}
          >
            {sectionName}
          </button>

          {sectionsState[sectionName] && (
            <ul>
              {Object.values(section)[0].map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          )}
        </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
