import "./App.css";
import { Routes, Route, useLocation} from "react-router-dom";
import ResponsiveAppBar from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Profile } from "./Pages/Profile";
import { Products } from "./Pages/Products";
import { Logout } from "@mui/icons-material";
import { useState, useEffect } from "react";

// import { UserConfirm } from "./Pages/UserConfirm";
interface Arr {
  isUser: string;
  accessToken: string;
  refreshToken: string;
}
function App() {
  const [isAuth, setIsAuth] = useState<null | boolean>(false);
  const [login, setLogin] = useState<Array<Arr>>();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("Loggedinuser");
    if (user) {
      const userData = JSON.parse(user);
      setLogin(userData);
      setIsAuth(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <ResponsiveAppBar />
      {isAuth && login ? (
        <>
          <Routes>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/Products" element={<Products />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
