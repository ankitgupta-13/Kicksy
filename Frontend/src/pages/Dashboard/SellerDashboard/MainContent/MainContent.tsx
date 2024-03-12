import style from "./MainContent.module.css";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import ListOrder from "../Order/ListOrder/ListOrder";
import Analytics from "../Analytics/Analytics";
import { Container } from "../../../../components";
import DetailProduct from "../Product/DetailProduct/DetailProduct";

const MainContent = ({ currentSection, currentAction }) => {
  let content = null;
  switch (currentSection) {
    case "product":
      switch (currentAction) {
        case "addProduct":
          content = <CreateProduct />;
          break;
        case "detailProduct":
          content = <DetailProduct />;
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
