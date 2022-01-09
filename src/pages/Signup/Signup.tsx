import React from 'react';
import {Button, TextField, FormHelperText, Link} from '@mui/material';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {UserDTO} from '../../api/dto/user';
import {useAppDispatch, RootState} from '../../redux';
import {signupUser} from '../../redux/slices/auth-slice';
import ROUTES from '../../Router/routes';

export const Signup: React.FC = () => {
    const {isFetching, isError, errorMessage} = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: UserDTO = {
        username: '',
        email: '',
        password: ''
    };

    const onSubmit = async (values: UserDTO) => {
        dispatch(signupUser(values))
            .unwrap()
            .then(() => {
                navigate(ROUTES.HOME);
            });
    };

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
            />
            <TextField name="email" label="Email" value={values.email} onChange={handleChange} />
            <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
            />
            <FormHelperText error={isError} hidden={!isError}>
                {errorMessage}
            </FormHelperText>
            <Button type="submit">{isFetching ? 'Loading' : 'Sign up'}</Button>
            <span>
                Already have an account? <Link href={ROUTES.LOGIN}>Login</Link>
            </span>
        </form>
    );
};

export default Signup;
