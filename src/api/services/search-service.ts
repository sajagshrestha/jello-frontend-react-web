import { jelloWithAuth } from "..";
import { ProfileDTO } from "../dto/profile";
import { PostedImageDTO } from "../dto/image";
import endpoints from "../endpoints";
import PostService from "./post-services";

interface SearchResult {
  users: ProfileDTO[];
  images: PostedImageDTO[];
}

const fromJSON: (data: SearchResult) => SearchResult = (data) => ({
  users: data.users,
  images: data.images.map(PostService.fromJSON),
});

const searchParam = "?query=";

const search = async (query: string) => {
  return jelloWithAuth
    .get(endpoints.SEARCH + searchParam + query)
    .then((res) => fromJSON(res?.data));
};

const SearchService = {
  search,
};

export default SearchService;
