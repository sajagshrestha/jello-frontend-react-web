import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ImageDTO, { PostedImageDTO } from "src/api/dto/image";
import { TagDTO } from "src/api/dto/tag";
import ImageService from "src/api/services/image-service";
import ImaggaService from "src/api/services/imagga-service";
import { WallPaper } from "src/pages/common/ImageCard/ImageCard.styles";
import MultiSelect from "src/pages/common/MultiSelect";
import { useAppDispatch } from "src/redux";
import { openSnackbar } from "src/redux/slices/snackbar";
import ROUTES from "src/Router/routes";
import { FlexRow } from "src/theme/baseStyles";
import { interpolate } from "src/utils/string";
import {
  FeedContainer,
  FeedSeparator,
  FeedTitle,
  FeedTitleSection,
} from "../Feed/Feed.styles";
import { ImagePlaceHolder, UploadFormContainer } from "./Upload.styles";
import widgetConfig from "./widget-config";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface PROPS {
  isEditMode?: boolean;
  imageData?: PostedImageDTO;
}
const UploadForm: React.FC<PROPS> = ({ isEditMode, imageData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /**
   * States.
   */
  const [image, setImage] = useState<ImageDTO>({
    caption: imageData?.caption || "",
    url: imageData?.url || "",
    thumbnailUrl: imageData?.thumbnailUrl || "",
    tags: imageData?.tags || [],
  });

  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false);

  /**
   * Mutations.
   */
  const uploadImageMutation = useMutation((image: ImageDTO) => {
    return ImageService.uploadImage(image);
  });

  const editImageMutation = useMutation((image: ImageDTO) => {
    return ImageService.editImage(image, imageData?.id || 0);
  });

  /**
   * Cloudinary upload widget.
   */
  const widget = window.cloudinary.createUploadWidget(
    widgetConfig,
    async (error: any, result: any) => {
      if (error) {
        //Show Snackbar Component
      }
      if (!error && result && result.event === "success") {
        const uploadedImageInfo: any = result.info;

        const tags = await ImaggaService.generateTags(
          uploadedImageInfo?.url || ""
        );

        setImage({
          ...image,
          url: uploadedImageInfo?.url || "",
          thumbnailUrl: uploadedImageInfo?.thumbnail_url || "",
          tags: tags,
        });

        setHasUploadedImage(true);
      }
    }
  );

  /**
   * Event Handlers.
   */
  const uploadImage = async () => {
    uploadImageMutation
      .mutateAsync(image)
      .then((res) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "success",
            message: "Image uploaded.",
          })
        );
        navigate(interpolate(ROUTES.POST, { id: res?.data?.id }));
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "error",
            message: "Failed to upload image.",
          })
        );
      });
  };

  const editImage = async () => {
    editImageMutation
      .mutateAsync(image)
      .then((res) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "success",
            message: "Image edited.",
          })
        );
        navigate(interpolate(ROUTES.POST, { id: res?.data?.id }));
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: "error",
            message: "Failed to update image.",
          })
        );
      });
  };

  const showWidget = () => {
    widget.open();
  };

  const updateTags = (tags: TagDTO[]) => {
    setImage({
      ...image,
      tags: tags,
    });
  };

  const onChangeHandler = (event: any) => {
    setImage({
      ...image,
      caption: event.target.value,
    });
  };
  /**
   * Main actions
   */

  return (
    <>
      <FeedSeparator>
        <FeedTitleSection>
          <FeedTitle>{isEditMode ? "Edit" : "Upload"}</FeedTitle>
        </FeedTitleSection>
      </FeedSeparator>
      <FeedContainer>
        <FeedSeparator>
          <UploadFormContainer>
            <TextField
              name="caption"
              label="Caption"
              value={image.caption}
              onChange={onChangeHandler}
            />
            <MultiSelect updateTags={updateTags} tags={image.tags} />
            <ImagePlaceHolder
              hasBorder={isEditMode ? !isEditMode : !hasUploadedImage}
              onClick={showWidget}
            >
              {hasUploadedImage || isEditMode ? (
                <WallPaper src={image.url} />
              ) : (
                <p>Select an image</p>
              )}
            </ImagePlaceHolder>
            <FlexRow>
              <Button
                onClick={isEditMode ? editImage : uploadImage}
                disabled={isEditMode ? !isEditMode : !hasUploadedImage}
              >
                {isEditMode ? "Save" : "Upload"}
              </Button>
            </FlexRow>
            <p>{uploadImageMutation.isSuccess ? "uploaded" : ""}</p>
          </UploadFormContainer>
        </FeedSeparator>
      </FeedContainer>
    </>
  );
};

export default UploadForm;
