import { Button, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../../api/dto/user";
import { RootState, useAppDispatch } from "../../redux";
import { signupUser } from "../../redux/slices/auth-slice";
import ROUTES from "../../Router/routes";
import { signUpValidationSchema } from "../../validators/signup";
import Logo from "../common/Logo/Logo";
import {
  AuthContainer,
  AuthForm,
  AuthHelperText,
  FieldWrapper,
} from "../Login/Login.styles";

export const Signup: React.FC = () => {
  const { isFetching } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: UserDTO = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: UserDTO) => {
    dispatch(signupUser(values))
      .unwrap()
      .then(() => {
        navigate(ROUTES.BASE);
      });
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: signUpValidationSchema,
  });

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <Logo width={170} height={80} />
        <TextField
          name="username"
          label="Username"
          value={values.username}
          onChange={handleChange}
          helperText={touched.username && errors.username}
          error={touched.username && !!errors.username}
        />
        <TextField
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          helperText={touched.email && errors.email}
          error={touched.email && !!errors.email}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          helperText={touched.password && errors.password}
          error={touched.password && !!errors.password}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          helperText={touched.confirmPassword && errors.confirmPassword}
          error={touched.confirmPassword && !!errors.confirmPassword}
        />
        <Button type="submit">{isFetching ? "Loading" : "Sign up"}</Button>
        <AuthHelperText>
          Already have an account? <Link href={ROUTES.LOGIN}>Login</Link>
        </AuthHelperText>
      </AuthForm>
    </AuthContainer>
  );
};

export default Signup;
