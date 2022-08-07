import {
  Bookmark,
  BookmarkBorderOutlined,
  ChatBubbleOutlineSharp,
  CloudDownloadOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { pink } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TagDTO } from "src/api/dto/tag";
import { UploaderDTO } from "src/api/dto/user";
import ImageService from "src/api/services/image-service";
import PostService from "src/api/services/post-services";
import { RootState, useAppDispatch } from "src/redux";
import { openSnackbar } from "src/redux/slices/snackbar";
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
import ImageCardOption from "./ImageCardOption";
import fileDownload from "js-file-download";
import { Tag } from "src/pages/Home/PopularTags/PopularTags";
import ConfirmationModal from "../ConfirmationModal";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
  const deleteImageMutation = useMutation((id: number) => {
    return ImageService.deleteImage(id);
  });

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

  const onCommentClick = () => {
    const postLink = interpolate(ROUTES.POST, { id });
    navigate(postLink);
  };

  const redirectToProfile = () => {
    const profileLink = interpolate(ROUTES.PROFILE, { id: uploader.id });
    navigate(profileLink);
  };

  const onDownloadClick = () => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, `wallpaper${id}.jpg`);
      });
  };
  const handleDelete = async () => {
    try {
      await deleteImageMutation.mutateAsync(id);
      queryClient.invalidateQueries("profile");
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "success",
          message: "Image deleted.",
        })
      );
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: "error",
          message: "Failed to Delete Image.",
        })
      );
    }
  };

  const handleEdit = () => {
    navigate(interpolate(ROUTES.EDIT, { id }));
  };

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
              <ImageCardOption
                id={id}
                handleDelete={() => setIsDeleteModalOpen(true)}
                handleEdit={handleEdit}
              />
            </MenuSection>
          )}
        </AuthorSection>
      </TitleSection>
      <CaptionSection>
        <Caption>{caption}</Caption>
      </CaptionSection>
      <TagsSection>
        {tags.map((tag) => (
          <Tag
            key={tag.name}
            isImageCard
            to={interpolate(ROUTES.TAG, { id: tag.id, name: tag.name })}
          >{`#${tag.name}  `}</Tag>
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
          onClick={onCommentClick}
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
        <IconCheckBox
          name="Download"
          checkedName="Download"
          label="Download"
          checkedLabel="Download"
          checked={false}
          onClick={onDownloadClick}
          icon={<CloudDownloadOutlined />}
          checkedIcon={<CloudDownloadOutlined />}
        />
      </StatsSection>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccessHandler={handleDelete}
        confirmButtonText="Delete"
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this post?"
      />
    </ImageCardContainer>
  );
};

export default ImageCard;
