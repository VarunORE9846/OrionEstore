import * as React from "react";
import "../App.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { Signups } from "../Schemas/Signups";
import axios from "axios";

const defaulttheme = createTheme();
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://orionesolutions.com/">
        OrionEStore
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

interface Formvalues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
  userName: string;
  phoneNumber: string;
}

const initialValues: Formvalues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
  userName: "",
  phoneNumber: "",
};
export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const handleSignup = (data: any) => {
    return axios.post(
      "https://orionapi0.customerdemourl.com/api/users/self-register",
      data,
      {
        headers: {
          tenant: "root",
        },
      }
    );
  };

  return (
    <>
      <ThemeProvider theme={defaulttheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
              Sign Up
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={Signups}
              onSubmit={async (values, { setSubmitting}) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  console.log("Values from Signup.tsx", values);
                  setSubmitting(false);
                }, 400);
                const payload: Formvalues = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                  confirmpassword: values.confirmpassword,
                  userName: values.userName,
                  phoneNumber: values.firstName,
                };
                try {
                  const signupresponse = await handleSignup(payload);
                  console.log("signupresponse", signupresponse);
                  if (signupresponse.status === 200) {
                    toast.success(signupresponse.data);
                    console.log(signupresponse.data);
                    setTimeout(() => {
                      navigate("/Login");
                    }, 3000);
                  }
                } catch (error: any) {
                  console.log("error", error?.response?.data?.messages);
                  const err: [] = error.response.data.messages;
                  err.forEach((item: string) => {
                    console.log(item);
                    toast.error(item);
                  });
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="firstName"
                        label="first Name"
                        autoFocus
                      />
                      {touched.firstName && errors.firstName ? (
                        <p className="form-error">{errors.firstName}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="family-name"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                      />
                      {touched.lastName && errors.lastName ? (
                        <p className="form-error">{errors.lastName}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                      />
                      {touched.email && errors.email ? (
                        <p className="form-error">{errors.email}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="userName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="userName"
                        label="UserName"
                      />
                      {touched.userName && errors.userName ? (
                        <p className="form-error">{errors.userName}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="phoneNumber"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                      />
                      {touched.phoneNumber && errors.phoneNumber ? (
                        <p className="form-error">{errors.phoneNumber}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="password"
                        label="Password"
                      />
                      {touched.password && errors.password ? (
                        <p className="form-error">{errors.password}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="confirm-password"
                        type="password"
                        name="confirmpassword"
                        value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        fullWidth
                        id="confirmpassword"
                        label="Confirm-password"
                      />
                      {touched.confirmpassword && errors.confirmpassword ? (
                        <p className="form-error">{errors.confirmpassword}</p>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="Login" variant="body2">
                        Already have an account? Login In
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
          <Copyright sx={{ mt: 23 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
