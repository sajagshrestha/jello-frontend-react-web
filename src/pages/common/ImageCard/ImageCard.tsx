import {
  Bookmark,
  BookmarkBorderOutlined,
  ChatBubbleOutlineSharp,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { TagDTO } from "src/api/dto/tag";
import { UploaderDTO } from "src/api/dto/user";
import IconCheckBox from "../IconCheckBox";
import {
  AuthorName,
  AuthorSection,
  Caption,
  CaptionSection,
  ImageCardContainer,
  MainImageSection,
  PostedDate,
  PostInfoSection,
  StatsSection,
  TagsSection,
  TitleSection,
  WallPaper,
} from "./ImageCard.styles";

interface Props {
  likeCount: number;
  liked: boolean;
  saved: boolean;
  commentCount: number;
  caption: string;
  uploader: UploaderDTO;
  url: string;
  tags: TagDTO[];
  createdOnDate: string;
}

const ImageCard: React.FC<Props> = ({
  likeCount,
  liked,
  saved,
  commentCount,
  caption,
  uploader,
  url,
  tags,
  createdOnDate,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isSaved, setIsSaved] = useState(saved);
  const [wallpaperLikeCount, setWallpaperLikeCount] = useState(likeCount);

  const onLikeClick = () => {
    if (isLiked) {
      setWallpaperLikeCount(wallpaperLikeCount - 1);
    } else {
      setWallpaperLikeCount(wallpaperLikeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const onSaveClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <ImageCardContainer>
      <TitleSection>
        <AuthorSection>
          <Avatar
            src={`https://avatars.dicebear.com/api/bottts/${
              uploader.id + 50
            }.svg`}
          />
          <PostInfoSection>
            <AuthorName>{uploader.username}</AuthorName>
            <PostedDate>{`Posted ${createdOnDate} ago`}</PostedDate>
          </PostInfoSection>
        </AuthorSection>
      </TitleSection>
      <CaptionSection>
        <Caption>{caption}</Caption>
      </CaptionSection>
      <TagsSection>
        {tags.map((tag) => (
          <span>{`#${tag.name}  `}</span>
        ))}
      </TagsSection>
      <MainImageSection>
        <WallPaper src={url} alt="" />
      </MainImageSection>
      <StatsSection>
        <IconCheckBox
          name="Like"
          checkedName="Unlike"
          checked={isLiked}
          label={wallpaperLikeCount}
          onClick={onLikeClick}
          icon={<FavoriteBorder sx={{ color: pink[500] }} />}
          checkedIcon={<Favorite sx={{ color: pink[500] }} />}
        />
        <IconCheckBox
          name="Comments"
          checkedName="Comments"
          checked={false}
          label={commentCount}
          icon={<ChatBubbleOutlineSharp />}
          checkedIcon={<ChatBubbleOutlineSharp />}
        />
        <IconCheckBox
          name="Save"
          checkedName="Unsave"
          label="Save"
          checkedLabel="Saved"
          checked={isSaved}
          onClick={onSaveClick}
          icon={<BookmarkBorderOutlined />}
          checkedIcon={<Bookmark />}
        />
      </StatsSection>
    </ImageCardContainer>
  );
};

export default ImageCard;
