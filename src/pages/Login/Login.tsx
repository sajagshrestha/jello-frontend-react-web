import {Button} from '@mui/material';
import ROUTES from '../../Router/routes';
import {Link} from '@mui/material';
import {UserDTO} from '../../api/dto/user';
import {signup} from '../../api/services/auth-service';
import {useAppDispatch} from '../../redux';
import {loginUser} from '../../redux/slices/auth-slice';

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const testAxios = async () => {
        const user: UserDTO = {
            username: 'sj001321117',
            password: 'password'
        };
        await dispatch(loginUser(user));
    };

    return (
        <div>
            <Button onClick={testAxios}>Login</Button>
            <Link href={ROUTES.SIGNUP}>Sign up</Link>
        </div>
    );
};

export default Login;
