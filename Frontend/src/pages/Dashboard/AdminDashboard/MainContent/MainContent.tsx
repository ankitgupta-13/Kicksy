import { Container } from "../../../../components";
import Analytics from "../Analytics/Analytics";
import AddBlog from "../Blog/AddBlog/AddBlog";
import ListBlogs from "../Blog/ListBlogs/ListBlogs";
import ListOrder from "../Order/ListOrder/ListOrder";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import DetailProduct from "../Product/DetailProduct/DetailProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import RequestProduct from "../Product/RequestProduct/RequestProduct";
import ListSeller from "../Seller/ListSeller/ListSeller";
import RequestSeller from "../Seller/RequestSeller/RequestSeller";
import ListUser from "../User/ListUser/ListUser";
import style from "./MainContent.module.css";

const MainContent = ({ currentSection, currentAction }) => {
  let content = null;
  console.log(currentAction, currentSection)
  switch (currentSection) {
    case "Product":
      switch (currentAction) {
        case "Add Product":
          content = <CreateProduct />;
          break;
        case "Product Detail":
          content = <DetailProduct />;
          break;
        case "All Product":
          content = <ListProduct />;
          break;
        case "Product Request":
          content = <RequestProduct />;
          break;
      }

      break;
    case "Order":
      switch (currentAction) {
        case "All Order":
          content = <ListOrder />;
          break;
      }
      break;
    case "User":
      switch (currentAction) {
        case "All User":
          content = <ListUser/>;
          break;
      }
      break;
    case "Seller":
      switch (currentAction) {
        case "All Seller":
          content = <ListSeller />;
          break;
        case "Seller Request":
          content = <RequestSeller />;
          break;
      }
      break;
    case "Blog":
      switch (currentAction) {
        case "Add blog":
          content = <AddBlog />;
          break;
        case "Blogs List":
          content = <ListBlogs />;
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
