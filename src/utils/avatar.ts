import endpoints from "src/api/endpoints";
import { interpolate } from "./string";

export const getAvatar = (id: number | undefined | string) => {
  if (!id) return "";

  if (typeof id === "string") {
    id = parseInt(id);
  }

  return interpolate(endpoints.AVATAR, {
    id: id + 50,
  });
};
