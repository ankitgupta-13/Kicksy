import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store/store.ts";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register/Register.tsx";
import Verification from "./pages/Verification/Verification.tsx";
import Login from "./pages/Login/Login.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Home from "./pages/Home/Home.tsx";
import ProductDesc from "./pages/ProductDesc/ProductDesc.tsx";
import Shop from "./pages/Shop/Shop.tsx";
import Anime from "./pages/Anime/Anime.tsx";
import TrackOrder from "./pages/TrackOrder/TrackOrder.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Layout from "./Layout";
import { getCurrentUser } from "./api/user.api.ts";
import { useEffect, useState } from "react";
import { login, logout } from "./redux/reducers/authSlice.ts";
import Blogs from "./pages/Blogs/Blogs.tsx";

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
          <Route path="/verify" element={<Verification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/productdesc" element={<ProductDesc />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/blogs" element={<Blogs/>} />
        </Route>
        <Route
          element={
            <ProtectedRoutes userRole={userData?.role} status={status} />
          }
        >
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </>
    )
  );

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData.statusCode === 200) {
          setLoading(false);
          dispatch(login({ userData: userData.data }));
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
