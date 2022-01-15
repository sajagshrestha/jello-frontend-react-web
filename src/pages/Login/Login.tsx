import { Button, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../../api/dto/user";
import { RootState, useAppDispatch } from "../../redux";
import { loginUser } from "../../redux/slices/auth-slice";
import ROUTES from "../../Router/routes";
import { loginValidationSchema } from "../../validators/login";

export const Login: React.FC = () => {
  const { isFetching } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: UserDTO = {
    username: "",
    password: "",
  };

  const onSubmit = async (values: UserDTO) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate(ROUTES.BASE);
      });
  };

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginValidationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        value={values.username}
        onChange={handleChange}
        helperText={touched.username && errors.username}
        error={touched.username && !!errors.username}
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
      <Button type="submit">{isFetching ? "Loading" : "Login"}</Button>
      <span>
        Need an account? <Link href={ROUTES.SIGNUP}>Signup</Link>
      </span>
    </form>
  );
};

export default Login;
