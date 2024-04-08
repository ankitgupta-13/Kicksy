import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { getCurrentUser } from "./api/user.api.ts";
import "./App.css";
import { PaymentButton } from "./components/index.ts";
import Layout from "./Layout";
import Anime from "./pages/Anime/Anime.tsx";
import BlogPage from "./pages/BlogPage/BlogPage.tsx";
import Blogs from "./pages/Blogs/Blogs.tsx";
import Checkout from "./pages/Checkout/Checkout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import OrderList from "./pages/Dashboard/UserDashboard/OrderList/OrderList.tsx";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import ProductDesc from "./pages/ProductDesc/ProductDesc.tsx";
import Register from "./pages/Register/Register.tsx";
import Seller from "./pages/Seller/Seller.tsx";
import Shop from "./pages/Shop/Shop.tsx";
import TrackOrder from "./pages/TrackOrder/TrackOrder.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import { login, logout } from "./redux/reducers/authSlice.ts";
import { setInitialCartItems } from "./redux/reducers/cartSlice.ts";
import { RootState } from "./redux/store/store.ts";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, userData } = useSelector((state: RootState) => state.auth);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout loading={loading} />}>
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

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData.statusCode === 200) {
          setLoading(false);
          dispatch(login({ userData: userData.data }));
          dispatch(setInitialCartItems(userData.data.cart));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading, dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
