import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import { ProfileDTO } from "../dto/profile";
import endpoints from "../endpoints";
import PostService from "./post-services";

const fromJSON: (data: ProfileDTO) => ProfileDTO = ({
  id,
  username,
  followerCount,
  followingCount,
  images,
}) => ({
  id,
  username,
  followerCount,
  followingCount,
  images: images.map(PostService.fromJSON),
});

const getProfile = async (id: number | string) => {
  return jelloWithAuth
    .get(interpolate(endpoints.PROFILE, { id }))
    .then((res) => fromJSON(res?.data));
};

const ProfileService = {
  getProfile,
};

export default ProfileService;
