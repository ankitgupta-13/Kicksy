import DetailOrder from "../Order/DetailOrder/DetailOrder";
import ListOrder from "../Order/ListOrder/ListOrder";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import ListProduct from "../Product/ListProduct/ListProduct";

const MainContent = ({ selectedAction }) => {
  let content = null;

  switch (selectedAction) {
    case "product":
      switch (selectedAction) {
        case "create":
          content = <CreateProduct />;
          break;
        case "edit":
          content = <EditProduct />;
          break;
        default:
          content = <ListProduct />;
      }
      break;
    case "order":
      switch (selectedAction) {
        case "list":
          content = <ListOrder />;
          break;
        default:
          content = <DetailOrder />;
      }
      break;
    case "customer":
      // Render components for customer section
      break;
    default:
    // Render default content
  }

  return <div className="main-content">{content}</div>;
};

export default MainContent;
