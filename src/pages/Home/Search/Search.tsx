import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchService from "src/api/services/search-service";
import ImageCard from "src/pages/common/ImageCard";
import UserCard from "src/pages/common/UserCard";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";
import { SearchContainer } from "./Search.styles";

const Search = () => {
  const [tabValue, setTabValue] = useState("1");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get("query");

  const { data, refetch } = useQuery("search", () => {
    if (!query) return;

    return SearchService.search(query);
  });

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <SearchContainer>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>{`Search results for ${query} :`}</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <TabContext value={tabValue}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={`Wallpapers (${data?.images.length || 0})`} value="1" />
          <Tab label={`Users (${data?.users.length || 0})`} value="2" />
        </TabList>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <FeedContainer>
            {data?.images.map((img) => (
              <FeedSeparator key={img.id}>
                <ImageCard
                  id={img.id}
                  likeCount={img.likeCount}
                  liked={img.isLiked}
                  saved={img.isSaved}
                  commentCount={img?.commentCount || 0}
                  caption={img.caption}
                  uploader={img.uploader}
                  url={img.url}
                  tags={img.tags}
                  createdOnDate={img.formatedCreatedOnDate}
                />
              </FeedSeparator>
            ))}
          </FeedContainer>
        </TabPanel>
        <TabPanel value="2">
          {data?.users.map((user) => (
            <div key={user.id}>
              <UserCard
                id={user.id}
                username={user.username}
                followerCount={user.followerCount}
                postCount={user.postCount}
                isFollowing={user.isFollowing ?? false}
              />
              <FeedSeparator />
            </div>
          ))}
        </TabPanel>
      </TabContext>
    </SearchContainer>
  );
};

export default Search;
