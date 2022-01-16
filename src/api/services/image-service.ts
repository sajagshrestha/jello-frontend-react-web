import { jelloWithAuth } from "..";
import ImageDTO from "../dto/image";
import { TagDTO } from "../dto/tag";
import endpoints from "../endpoints";

const uploadImage = async (image: ImageDTO) => {
  jelloWithAuth.post(endpoints.UPLOAD_IMAGE, {
    ...image,
    tags: image?.tags.map((tag: TagDTO) => tag.value),
  });
};

const ImageService = {
  uploadImage,
};

export default ImageService;
