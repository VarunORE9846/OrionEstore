import * as yup from "yup";
export const Logins = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required(),
});
