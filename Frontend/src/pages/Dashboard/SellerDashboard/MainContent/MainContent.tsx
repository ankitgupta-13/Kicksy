import style from "./MainContent.module.css";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import ListOrder from "../Order/ListOrder/ListOrder";
import Analytics from "../Analytics/Analytics";
import { Container } from "../../../../components";
import DetailProduct from "../Product/DetailProduct/DetailProduct";
import OfferProduct from "../Product/OfferProduct/OfferProduct";
import RequestProduct from "../Product/RequestProduct/RequestProduct";

const MainContent = ({ currentSection, currentAction }) => {
  let content = null;
  switch (currentSection) {
    case "Product":
      switch (currentAction) {
        case "Create":
          content = <CreateProduct />;
          break;
        case "Details":
          content = <DetailProduct />;
          break;
        case "List":
          content = <ListProduct />;
          break;
        case "Offers":
          content = <OfferProduct />;
          break;
        case "Requests":
          content = <RequestProduct />;
          break;
      }
      break;
    case "Order":
      switch (currentAction) {
        case "List":
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
