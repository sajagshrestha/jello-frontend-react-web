import { image } from "@cloudinary/url-gen/qualifiers/source";
import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import ImageDTO from "../dto/image";
import { TagDTO } from "../dto/tag";
import endpoints from "../endpoints";

const uploadImage = async (image: ImageDTO) => {
  jelloWithAuth.post(endpoints.UPLOAD_IMAGE, {
    ...image,
    tags: image?.tags.map((tag: TagDTO) => tag.value)
  });
};

const saveImage = async (imageId: number) => {
  return jelloWithAuth.post(interpolate(endpoints.SAVE_IMAGE, { id: imageId }));
};

const removeSavedImage = async (imageId: number) => {
  return jelloWithAuth.delete(
    interpolate(endpoints.SAVE_IMAGE, { id: imageId })
  );
};

const ImageService = {
  uploadImage,
  saveImage,
  removeSavedImage
};

export default ImageService;
