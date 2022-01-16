import { jelloWithAuth } from "..";
import ImageDTO from "../dto/image";
import endpoints from "../endpoints";

const searchParam = "?search=";
// tags/search?search=apple
const searchTags = async (search: string) => {
  return jelloWithAuth.get(endpoints.SEARCH_TAG + searchParam + search);
};

const TagService = {
  searchTags
};

export default TagService;
