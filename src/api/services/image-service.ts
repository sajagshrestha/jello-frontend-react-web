import {jelloWithAuth} from '..';
import ImageDTO from '../dto/image';
import endpoints from '../endpoints';

const uploadImage = async (image: ImageDTO) => {
    jelloWithAuth.post(endpoints.UPLOAD_IMAGE, image);
};

const ImageService = {
    uploadImage
};

export default ImageService;
