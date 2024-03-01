import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import login from "../Images/login.jpg";
// import axios from "axios";
import Api from "../Components/Api";
import "../App.css";
import { Logins } from "../Schemas/Logins";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Store/Reducers/authSlice";
import {
  Box,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
interface Log {
  email: string;
  password: string;
}
interface Props {
  fullName: string;
}

export const Login: React.FC = () => {
  const defaulttheme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<Props | null>(null);
  const [token, setToken] = useState<Props | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("Loggedinuser");
    if (data) {
      const user = JSON.parse(data);
      const decode = jwtDecode(user.accessToken);
      setToken(user.accessToken);
      setUser(decode as Props);
    }
  }, []);
  console.log("user details", user);
  
  const handleLogin = (data: { email: string; password: string }) => {
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: user?.fullName,
          token: token,
        })
      );
    }, 1000);
    return Api.post("/tokens", data);
  };

  // const handleLogin = (data: { email: string; password: string }) => {
  //   return axios.post(
  //     "https://orionapi0.customerdemourl.com/api/tokens",
  //     data,
  //     {
  //       headers: {
  //         tenant: "root",
  //       },
  //     }
  //   );
  // };

  const initialValues: Log = {
    email: "",
    password: "",
  };

  return (
    <>
      <ThemeProvider theme={defaulttheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${login})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                mx: 4,
                my: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <ToastContainer />
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={Logins}
                onSubmit={async (values: Log, { setSubmitting, resetForm }) => {
                  const payload: Log = {
                    email: values.email,
                    password: values.password,
                  };
                  try {
                    const loginresponse = await handleLogin(payload);
                    console.log("loginresponse from login.tsx:", loginresponse);
                    const loggedinuser = {
                      isUser: true,
                      accessToken: loginresponse.data.token,
                      refreshToken: loginresponse.data.refreshToken,
                    };
                    localStorage.setItem(
                      "Loggedinuser",
                      JSON.stringify(loggedinuser)
                    );

                    if (loginresponse.status === 200) {
                      toast.success("Login Successful");
                      console.log(loginresponse.data);
                      setTimeout(() => {
                        navigate("/Profile");
                      }, 2000);
                      setSubmitting(false);
                    }
                  } catch (error: any) {
                    toast.error("Invalid Credentials");
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,

                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={values.email}
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      autoComplete="email"
                      autoFocus
                    />
                    {touched.email && errors.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {touched.password && errors.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isSubmitting}
                    >
                      Log In
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link href="Signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                  </Box>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
