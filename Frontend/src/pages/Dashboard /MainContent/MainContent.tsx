import Analytics from "../Analytics/Analytics";
import DetailOrder from "../Order/DetailOrder/DetailOrder";
import ListOrder from "../Order/ListOrder/ListOrder";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import ListUser from "../User/ListUser/ListUser";

const MainContent = ({ currentSection, currentAction }) => {
  let content = null;
  switch (currentSection) {
    case "product":
      switch (currentAction) {
        case "addProduct":
          content = <CreateProduct />;
          break;
        case "editProduct":
          content = <EditProduct />;
          break;
        case "listProduct":
          content = <ListProduct />;
          break;
        default:
          content = <Analytics />;
      }
      break;
    case "order":
      switch (currentAction) {
        case "allOrder":
          content = <ListOrder />;
          break;
        default:
          content = <Analytics />;
      }
      break;
    case "user":
      switch (currentAction) {
        case "allUser":
          content = <ListUser />;
          break;
        default:
          content = <Analytics />;
      }
      break;
    default:
    // Render default content
  }

  return (
    <>
    <h1>Dashboard</h1>  
      <div className="main-content">
      {content}
      </div>
    </>
  );
};

export default MainContent;
