const endpoints = {
  SIGNUP: "/register",
  LOGIN: "/login",
  UPLOAD_IMAGE: "/images",
  POPULAR: "images/popular",
  SEARCH_TAG: "/tags/search",
  FEED: "users/feed",
  LIKE_IMAGE: "images/:id/like",
  PROFILE: "users/:id",
  AVATAR: `https://avatars.dicebear.com/api/bottts/:id.svg`,
  FOLLOW: "users/:id/follow",
  SAVE_IMAGE: "images/:id/save",
  SAVED_IMAGE: "users/saved-images",
};

export default endpoints;
