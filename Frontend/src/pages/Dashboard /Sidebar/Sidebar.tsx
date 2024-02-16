import { useSelector, useDispatch } from "react-redux";
import {
  selectAction,
  toggleSection,
} from "../../../redux/reducers/dashboardSlice";

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
    <div>
      <h1>Sidebar</h1>
      {sections.map((section, index) => {
        const sectionName = Object.keys(section)[0];
        return (
          <div key={index}>
            <button onClick={() => handleSectionClick(sectionName)}>
              {sectionName}
            </button>
            {sectionsState[sectionName] && (
              <ul>
                {Object.values(section)[0].map((action, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={() => handleActionClick(sectionName, action)}
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
