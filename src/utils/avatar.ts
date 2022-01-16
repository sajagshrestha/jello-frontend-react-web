import endpoints from "src/api/endpoints";
import { interpolate } from "./string";

export const getAvatar = (id: number | undefined) => {
  if (!id) return "";

  return interpolate(endpoints.AVATAR, {
    id: id + 50
  });
};
