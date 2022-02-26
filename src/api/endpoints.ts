const endpoints = {
  SIGNUP: "/register",
  LOGIN: "/login",
  UPLOAD_IMAGE: "/images",
  UPDATE_IMAGE: "/images/:id",
  POPULAR: "images/popular",
  SEARCH_TAG: "/tags/search",
  FEED: "users/feed",
  LIKE_IMAGE: "images/:id/like",
  PROFILE: "users/:id",
  AVATAR: `https://avatars.dicebear.com/api/bottts/:id.svg`,
  FOLLOW: "users/:id/follow",
  SAVE_IMAGE: "images/:id/save",
  SAVED_IMAGE: "users/saved-images",
  SEARCH: "search",
  POST: "/images/:id",
  EDIT_IMAGE: "/images/:id",
  POST_COMMENT: "/comment",
  POPULAR_TAGS: "/tags/popular",
};

export default endpoints;
