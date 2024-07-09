import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getCurrentUser } from "./api/user.api.js";
import "./App.css";
import { PaymentButton } from "./components/index.js";
import Layout from "./Layout";
import Anime from "./pages/Anime/Anime.jsx";
import BlogPage from "./pages/BlogPage/BlogPage.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import OrderList from "./pages/Dashboard/UserDashboard/OrderList/OrderList.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import ProductDesc from "./pages/ProductDesc/ProductDesc.jsx";
import Register from "./pages/Register/Register.jsx";
import Seller from "./pages/Seller/Seller.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import TrackOrder from "./pages/TrackOrder/TrackOrder.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { login, logout } from "./redux/reducers/authSlice.js";
import { setInitialCartItems } from "./redux/reducers/cartSlice.js";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/product/:id" element={<ProductDesc />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/payments" element={<PaymentButton amount={5000} />} />
          <Route path="/seller" element={<Seller />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
        <Route
          element={
            <ProtectedRoutes userRole={userData?.role} status={status} />
          }
        ></Route>
      </>
    )
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getCurrentUser();
      if (response && response.statusCode === 200) {
        dispatch(login({ userData: response.data }));
        dispatch(setInitialCartItems(response.data.cart));
        return response.data;
      } else {
        dispatch(logout());
        return null;
      }
    },
    staleTime: Infinity,
  });

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;
