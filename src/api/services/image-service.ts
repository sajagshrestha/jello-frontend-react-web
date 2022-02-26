import { interpolate } from "src/utils/string";
import { jelloWithAuth } from "..";
import ImageDTO from "../dto/image";
import { TagDTO } from "../dto/tag";
import endpoints from "../endpoints";

const uploadImage = async (image: ImageDTO) => {
  return await jelloWithAuth.post(endpoints.UPLOAD_IMAGE, {
    ...image,
    tags: image?.tags.map((tag: TagDTO) => tag.value),
  });
};

const editImage = async (image: ImageDTO, id: number) => {
  return await jelloWithAuth.patch(interpolate(endpoints.EDIT_IMAGE, { id }), {
    ...image,
    tags: image?.tags.map((tag: TagDTO) => tag.value),
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

const deleteImage = async (imageId: number) => {
  return jelloWithAuth.delete(
    interpolate(endpoints.UPDATE_IMAGE, { id: imageId })
  );
};

const ImageService = {
  uploadImage,
  saveImage,
  removeSavedImage,
  deleteImage,
  editImage,
};

export default ImageService;
