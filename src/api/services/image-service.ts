import {jelloWithAuth} from '..';
import ImageDTO, { TagDTO } from "../dto/image";
import endpoints from '../endpoints';

const uploadImage = async (image: ImageDTO) => {
    jelloWithAuth.post(endpoints.UPLOAD_IMAGE, {
      ...image,
      tags: image.tags.map((tag: TagDTO) => tag.value),
    });
};

const ImageService = {
    uploadImage
};

export default ImageService;