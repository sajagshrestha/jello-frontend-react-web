import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Must be 3 character or more")
    .max(20, "Must be 20 character or less")
    .required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Must be 6 character or more")
    .max(20, "Must be 20 character or less")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
