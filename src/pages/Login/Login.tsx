import React from 'react';
import {Button, TextField, FormHelperText, Link} from '@mui/material';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {UserDTO} from '../../api/dto/user';
import {useAppDispatch, RootState} from '../../redux';
import {loginUser} from '../../redux/slices/auth-slice';
import ROUTES from '../../Router/routes';
import {loginValidationSchema} from '../../validators/login';

export const Login: React.FC = () => {
    const {isFetching, isError, errorMessage} = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: UserDTO = {
        username: '',
        password: ''
    };

    const onSubmit = async (values: UserDTO) => {
        dispatch(loginUser(values))
            .unwrap()
            .then(() => {
                navigate(ROUTES.HOME);
            });
    };

    const {handleSubmit, handleChange, values, touched, errors} = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginValidationSchema
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
            <FormHelperText error={isError} hidden={!isError}>
                {errorMessage}
            </FormHelperText>
            <Button type="submit">{isFetching ? 'Loading' : 'Login'}</Button>
            <span>
                Need an account? <Link href={ROUTES.SIGNUP}>Signup</Link>
            </span>
        </form>
    );
};

export default Login;
