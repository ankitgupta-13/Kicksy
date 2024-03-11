import style from "./MainContent.module.css";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import ListOrder from "../Order/ListOrder/ListOrder";
import Analytics from "../Analytics/Analytics";
import { Container } from "../../../../components";

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
        case "allProduct":
          content = <ListProduct />;
          break;
      }
      break;
    case "order":
      switch (currentAction) {
        case "allOrder":
          content = <ListOrder />;
          break;
      }
      break;
    default:
      content = <Analytics />;
      break;
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className={style.content}>{content}</div>
    </Container>
  );
};

export default MainContent;
