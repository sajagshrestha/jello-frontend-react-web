import {USER_KEY} from '../constants/constant';

interface LocalUserDTO {
    username: string | null | undefined;
    token: string | null | undefined;
}

export const saveUserToLocalStorage = (localUser: LocalUserDTO) => {
    localStorage.setItem(USER_KEY, JSON.stringify(localUser));
};

export const getUserToLocalStorage: () => LocalUserDTO | null = () => {
    const user = localStorage.getItem(USER_KEY);

    if (user) {
        const {username, token} = JSON.parse(user);
        return {
            username,
            token
        };
    }

    return null;
};

export const getToken = () => {
    const user = getUserToLocalStorage();

    return user?.token;
};

export const getUsername = () => {
    const user = getUserToLocalStorage();

    return user?.username;
};
