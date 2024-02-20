import { Container } from "../../../components";
import Analytics from "../Analytics/Analytics";
import AddBlog from "../Blog/AddBlog/AddBlog";
import ListBlogs from "../Blog/ListBlogs/ListBlogs";
import DetailOrder from "../Order/DetailOrder/DetailOrder";
import ListOrder from "../Order/ListOrder/ListOrder";
import CreateProduct from "../Product/CreateProduct/CreateProduct";
import EditProduct from "../Product/EditProduct/EditProduct";
import ListProduct from "../Product/ListProduct/ListProduct";
import ListUser from "../User/ListUser/ListUser";
import style from "./MainContent.module.css";

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
    case "blog":
      switch (currentAction) {
        case "addblog":
          content = <AddBlog />;
          break;
        case "listblogs":
          content = <ListBlogs />;
          break;
        default:
          content = <Analytics />;
      }
      break;
    default:
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={style.content}>{content}</div>
    </Container>
  );
};

export default MainContent;
