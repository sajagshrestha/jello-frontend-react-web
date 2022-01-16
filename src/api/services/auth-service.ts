import { jelloWithoutAuth } from "..";
import { saveUserToLocalStorage } from "../../utils/local-storage";
import { UserDTO } from "../dto/user";
import endpoints from "../endpoints";

export const signup = async (userCredentials: UserDTO) => {
  const body = {
    ...userCredentials,
    name: userCredentials.username
  };

  return await jelloWithoutAuth
    .post(endpoints.SIGNUP, body)
    .then((response) => {
      const { id, username, accessToken } = response.data;

      saveUserToLocalStorage({ id, username, token: accessToken });

      return { id, username };
    });
};

export const login = async (userCredentials: UserDTO) => {
  return await jelloWithoutAuth
    .post(endpoints.LOGIN, userCredentials)
    .then((response) => {
      const { id, username, accessToken } = response.data;

      saveUserToLocalStorage({ id, username, token: accessToken });

      return { id, username };
    });
};
