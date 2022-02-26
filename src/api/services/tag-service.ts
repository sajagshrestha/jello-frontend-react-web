import { jelloWithAuth } from "..";
import endpoints from "../endpoints";

const searchParam = "?search=";
// tags/search?search=apple
const searchTags = async (search: string) => {
  return jelloWithAuth.get(endpoints.SEARCH_TAG + searchParam + search);
};

const getPopularTags = async () => {
  return jelloWithAuth.get(endpoints.POPULAR_TAGS).then((res) => res?.data);
};

const TagService = {
  searchTags,
  getPopularTags,
};

export default TagService;
