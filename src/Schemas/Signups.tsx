import * as Yup from "yup";
// interface CP{
//     confirmpassword:string|null,
// }
const digitsOnly = (value:string) => /^\d+$/.test(value)
export const Signups = Yup.object({
  firstName: Yup.string()
    .min(2, "Name must have atleast 2 characters")
    .max(8)
    .required("Please enter your Name"),
  lastName: Yup.string()
    .min(2, "Surname must have atleast 2 characters")
    .max(10)
    .required("Please enter your Surname"),
  email: Yup.string().email().required("Please enter your email"),
  userName: Yup.string().required("Please enter your Username"),
  phoneNumber: Yup.string().required("Please enter your Phone Number").test('Digits only', 'The field should have digits only', digitsOnly),
  password: Yup.string()
    .required()
    .min(5, "Password must be 5 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmpassword: Yup.string()
    .required("please confirm your password")
    .oneOf([Yup.ref("password"), "null"], "Passwords dont Match"),
});
