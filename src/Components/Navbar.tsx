import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
const pages = ["Home", "LogIn", "SignUp"];
const pages2 = ["Products", "Brands", "CheckOut", "SingleProduct", "Profilee"];
interface Arr {
  isUser: string;
  accessToken: string;
  refreshToken: string;
}
const ResponsiveAppBar = () => {
  const [isUser, setIsUser] = useState<null | boolean>(false);
  const [loggedin, setLoggedin] = useState<Array<Arr>>();
  const location = useLocation();
  const Navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("LoggedInUser");
    Navigate("/Home");
    setIsUser(false);
  };
  React.useEffect(() => {
    const user = localStorage.getItem("LoggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      setLoggedin(userData);
      setIsUser(true);
    }
  }, [location.pathname]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: "#66bb6a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            OrionEStore
          </Typography>
          {isUser && loggedin ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  // onClick={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/Products"
                      >
                        Products
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages2
                  .filter(
                    (page2) => page2 !== "CheckOut" && page2 !== "SingleProduct"
                  )
                  .map((page2) => (
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "white",
                        display: "block",
                        margin: "10px",
                        fontSize: "17px",
                      }}
                      to={`/${page2}`}
                      key={page2}
                      onClick={handleCloseNavMenu}
                    >
                      {page2}
                    </Link>
                  ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/Redirect"
                        style={{ textDecoration: "none", color: "Blue" }}
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  // onClick={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/Home"
                      >
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/Login"
                      >
                        Login
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/Signup"
                      >
                        Signup
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

//================================navbar filter
//    {pages2
// .map((page2) => (
//   <Link
//     style={{
//       textDecoration: "none",
//       color: "white",
//       display: "block",
//       margin: "10px",
//       fontSize: "17px",
//     }}
//     to={`/${page2}`}
//     key={page2}
//     onClick={handleCloseNavMenu}
//   >
//     {page2}
//   </Link>
// ))}
