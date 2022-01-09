import {jelloWithoutAuth} from '..';
import {saveUserToLocalStorage} from '../../utils/local-storage';
import {UserDTO} from '../dto/user';
import * as endpoints from '../endpoints';

export const signup = async (userCredentials: UserDTO) => {
    const body = {
        ...userCredentials,
        name: userCredentials.username
    };

    try {
        const response = await jelloWithoutAuth.post(endpoints.SIGNUP, body);
        const {username, token} = response.data;

        saveUserToLocalStorage({username, token});

        return {username};
    } catch (error: any) {
        console.log(error?.message || error);
    }
};
