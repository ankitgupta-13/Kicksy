import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { login, logout } from "./redux/reducers/authSlice";
import { Outlet } from "react-router-dom";
import { Header, Footer, Container, PaymentButton } from "./components/index";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData.statusCode === 200) {
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
    <Container sx={{ gap: "1rem" }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default App;
