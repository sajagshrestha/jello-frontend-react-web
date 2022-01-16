import { USER_KEY } from "../constants/constant";

interface LocalUserDTO {
  username: string | null | undefined;
  token: string | null | undefined;
  id: string | null | undefined;
}

export const saveUserToLocalStorage = (localUser: LocalUserDTO) => {
  localStorage.setItem(USER_KEY, JSON.stringify(localUser));
};

export const getUserFromLocalStorage: () => LocalUserDTO | null = () => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    const { id, username, token } = JSON.parse(user);

    return {
      id,
      username,
      token,
    };
  }

  return null;
};

export const getToken = () => {
  const user = getUserFromLocalStorage();

  return user?.token;
};

export const getUsername = () => {
  const user = getUserFromLocalStorage();

  return user?.username;
};

export const deleteUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
