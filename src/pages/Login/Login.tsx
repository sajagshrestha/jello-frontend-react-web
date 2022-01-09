import {Button} from '@mui/material';
import ROUTES from '../../Router/routes';
import {Link} from '@mui/material';
import {UserDTO} from '../../api/dto/user';
import {signup} from '../../api/services/auth-service';

function Login() {
    const testAxios = async () => {
        const user: UserDTO = {
            username: 'sj00137',
            email: 'test@gmai13l.com',
            password: 'password'
        };
        await signup(user);
    };
    return (
        <div>
            <Button onClick={testAxios}>Login</Button>
            <Link href={ROUTES.SIGNUP}>Sign up</Link>
        </div>
    );
}

export default Login;
