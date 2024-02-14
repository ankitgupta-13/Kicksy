import { useSelector, useDispatch } from "react-redux";
import { toggleSection } from "../../../redux/reducers/dashboardSlice";

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
    <div>
      <h1>Sidebar</h1>
      {sections.map((section, index) => {
        const sectionName = Object.keys(section)[0];
        return (
          <div key={index}>
            <button onClick={() => dispatch(toggleSection(sectionName))}>
              {sectionName}
            </button>
            {sectionsState[sectionName] && (
              <ul>
                {Object.values(section)[0].map((action, index) => {
                  return <li key={index}>{action}</li>;
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
