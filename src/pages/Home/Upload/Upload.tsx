import { useState } from "react";
import { Button, TextField } from "@mui/material";
import ImageDTO, { TagDTO } from "src/api/dto/image";
import widgetConfig from "./widget-config";
import { useMutation } from "react-query";
import ImageService from "src/api/services/image-service";
import MultiSelect from "src/pages/common/MultiSelect";
import ImaggaService from "src/api/services/imagga-service";

declare global {
  interface Window {
    cloudinary: any;
  }
}

function Upload() {
  /**
   * States.
   */
  const [image, setImage] = useState<ImageDTO>({
    caption: "",
    url: "",
    thumbnailUrl: "",
    tags: [],
  });

  const [hasUploadedImage, setHasUploadedImage] = useState<boolean>(false);

  /**
   * Mutations.
   */
  const uploadImageMutation = useMutation((image: ImageDTO) => {
    return ImageService.uploadImage(image);
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
          uploadedImageInfo?.url || "",
        );

        setImage({
          ...image,
          url: uploadedImageInfo?.url || "",
          thumbnailUrl: uploadedImageInfo?.thumbnail_url || "",
          tags: tags,
        });

        setHasUploadedImage(true);
      }
    },
  );

  /**
   * Event Handlers.
   */
  const uploadImage = () => {
    uploadImageMutation.mutateAsync(image);
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
    <div>
      <p>{image.caption}</p>
      <img src={image.thumbnailUrl} alt="thumbnail" />
      <Button onClick={showWidget}>Select a Image</Button>
      <Button onClick={uploadImage} disabled={!hasUploadedImage}>
        Upload
      </Button>
      <TextField
        name="caption"
        label="Caption"
        value={image.caption}
        onChange={onChangeHandler}
      />
      <MultiSelect updateTags={updateTags} tags={image.tags} />
      <p>{uploadImageMutation.isSuccess ? "uploaded" : ""}</p>
    </div>
  );
}

export default Upload;