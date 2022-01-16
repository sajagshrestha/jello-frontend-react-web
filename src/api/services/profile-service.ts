import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import { ProfileDTO } from "../dto/profile";
import endpoints from "../endpoints";
import PostService from "./post-services";

const fromJSON: (data: ProfileDTO) => ProfileDTO = (data) => ({
  ...data,
  images: data.images.map(PostService.fromJSON)
});

const getProfile = async (id: number | string) => {
  return jelloWithAuth
    .get(interpolate(endpoints.PROFILE, { id }))
    .then((res) => fromJSON(res?.data));
};

const follow = async (id: number) => {
  return jelloWithAuth.post(interpolate(endpoints.FOLLOW, { id }));
};

const unfollow = async (id: number) => {
  return jelloWithAuth.delete(interpolate(endpoints.FOLLOW, { id }));
};

const ProfileService = {
  getProfile,
  follow,
  unfollow
};

export default ProfileService;
