import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Cart/Cart";

const Layout = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Sidebar />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
