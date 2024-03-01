import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import ResponsiveAppBar from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Profile } from "./Pages/Profile";
import { Products } from "./Pages/Products";
import { Logout } from "@mui/icons-material";
import  {Pagenf}  from "./Pages/Pagenf";
// import { useState, useEffect } from "react";
import PrivateRoutes from "./Utils/PrivateRoutes";
import PublicRoutes from "./Utils/PublicRoutes";
import { Redirect } from "./Pages/Redirect";

// import { UserConfirm } from "./Pages/UserConfirm";
// interface Arr {
//   isUser: string;
//   accessToken: string;
//   refreshToken: string;
// }
function App() {
  // const [isAuth, setIsAuth] = useState<null | boolean>(false);
  // const [login, setLogin] = useState<Array<Arr>>();
  // const location = useLocation();

  // useEffect(() => {
  //   const user = localStorage.getItem("Loggedinuser");
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     setLogin(userData);
  //     setIsAuth(true);
  //   }
  // }, [location.pathname]);

  return (
    <div>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <PublicRoutes>
                <Outlet />
              </PublicRoutes>
            }
          >
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="*" element={<Pagenf />} />
          </Route>

          <Route
            element={
              <PrivateRoutes>
                <Outlet />
              </PrivateRoutes>
            }
          >
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Redirect" element={<Redirect />} />
            <Route path="/Redirect" element={<Logout />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Pagenf" element={<Pagenf />} />
            <Route path="*" element={<Pagenf />} />

          </Route>
        </Routes>
      </Router>
    </div>

    // <div>
    //   <ResponsiveAppBar />
    //   {isAuth ? (
    //     <>
    //       <Routes>
    //         <Route path="/Profile" element={<Profile />} />
    //         <Route path="/Logout" element={<Logout />} />
    //         <Route path="/Products" element={<Products />} />
    //       </Routes>
    //     </>
    //   ) : (
    //     <>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/Home" element={<Home />} />
    //         <Route path="/Login" element={<Login />} />
    //         <Route path="/Signup" element={<Signup />} />
    //       </Routes>
    //     </>
    //   )}
    // </div>
  );
}

export default App;
