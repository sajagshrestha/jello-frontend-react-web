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
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { TagDTO } from "src/api/dto/tag";
import { UploaderDTO } from "src/api/dto/user";
import ImageService from "src/api/services/image-service";
import PostService from "src/api/services/post-services";
import ROUTES from "src/Router/routes";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import IconCheckBox from "../IconCheckBox";
import {
  AuthorName,
  AuthorSection,
  Caption,
  CaptionSection,
  ImageCardContainer,
  MainImageSection,
  MenuSection,
  PostedDate,
  PostInfoSection,
  StatsSection,
  TagsSection,
  TitleSection,
  WallPaper,
} from "./ImageCard.styles";
import { RootState, useAppDispatch } from "src/redux";
import { openSnackbar } from "src/redux/slices/snackbar";
import { useSelector } from "react-redux";
import ImageCardOption from "./ImageCardOption";

interface Props {
  id: number;
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
  id,
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
  /**
   * Hooks
   */
  const dispatch = useAppDispatch();

  /**
   * States
   */
  const [isLiked, setIsLiked] = useState(liked);
  const [isSaved, setIsSaved] = useState(saved);
  const [wallpaperLikeCount, setWallpaperLikeCount] = useState(likeCount);

  /**
   * Hooks
   */
  const navigate = useNavigate();
  const storedUser = useSelector((state: RootState) => state.auth);

  /**
   * To check if profile is of signed in user;
   */
  const isSelf = uploader.id === +storedUser.id;

  /**
   * Mutations
   */
  const likeMutation = useMutation(PostService.likePost);
  const saveImageMutation = useMutation(ImageService.saveImage);
  const removeSavedImageMutation = useMutation(ImageService.removeSavedImage);

  /**
   * Event Handlers
   */
  const onLikeClick = () => {
    if (isLiked) {
      setWallpaperLikeCount(wallpaperLikeCount - 1);
    } else {
      setWallpaperLikeCount(wallpaperLikeCount + 1);
    }

    likeMutation.mutate(id);
    setIsLiked(!isLiked);
  };

  const onSaveClick = () => {
    if (isSaved) {
      removeSavedImageMutation.mutateAsync(id).then((res) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "success",
            message: res.data.message,
          })
        );
      });
    } else {
      saveImageMutation.mutateAsync(id).then((res) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "success",
            message: res.data.message,
          })
        );
      });
    }
    setIsSaved(!isSaved);
  };

  const redirectToProfile = () => {
    const profileLink = interpolate(ROUTES.PROFILE, { id: uploader.id });
    navigate(profileLink);
  };

  /**
   * main
   */
  return (
    <ImageCardContainer>
      <TitleSection>
        <AuthorSection>
          <Avatar src={getAvatar(uploader.id)} onClick={redirectToProfile} />
          <PostInfoSection>
            <AuthorName onClick={redirectToProfile}>
              {uploader.username}
            </AuthorName>
            <PostedDate>{`Posted ${createdOnDate} ago`}</PostedDate>
          </PostInfoSection>
          {isSelf && (
            <MenuSection>
              <ImageCardOption id={id} />
            </MenuSection>
          )}
        </AuthorSection>
      </TitleSection>
      <CaptionSection>
        <Caption>{caption}</Caption>
      </CaptionSection>
      <TagsSection>
        {tags.map((tag) => (
          <span key={tag.name}>{`#${tag.name}  `}</span>
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
