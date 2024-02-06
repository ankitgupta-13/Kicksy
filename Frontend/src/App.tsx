import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { login, logout } from "./redux/reducers/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, Footer } from "./components/index.js";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth?.userData?.email);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        console.log(userData.data);
        if (userData.data.statusCode === 200) {
          dispatch(login({ userData: userData.data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Header />
      <p>{email} ankit</p>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
