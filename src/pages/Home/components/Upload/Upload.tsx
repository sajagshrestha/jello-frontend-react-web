import {useState} from 'react';
import {Button} from '@mui/material';
import ImageDTO, { TagDTO } from 'src/api/dto/image';
import widgetConfig from './widget-config';
import {useMutation} from 'react-query';
import ImageService from 'src/api/services/image-service';
import MultiSelect from 'src/pages/common/MultiSelect';

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
        title: '',
        url: '',
        thumbnailUrl: '',
        tags: []
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
    const widget = window.cloudinary.createUploadWidget(widgetConfig, (error: any, result: any) => {
        if (error) {
            //Show Snackbar Component
        }

        if (!error && result && result.event === 'success') {
            const uploadedImageInfo: any = result.info;

            setImage({
                ...image,
                title: uploadedImageInfo?.original_filename || '',
                url: uploadedImageInfo?.url || '',
                thumbnailUrl: uploadedImageInfo?.thumbnail_url || '',
                tags: uploadedImageInfo?.tags || []
            });

            setHasUploadedImage(true);
        }
    });

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
    /**
     * Main actions
     */

    return (
      <div>
        <p>{image.title}</p>
        <img src={image.thumbnailUrl} alt="thumbnail" />
        <Button onClick={showWidget}>Select a Image</Button>
        <Button onClick={uploadImage} disabled={!hasUploadedImage}>
          Upload
        </Button>
        <MultiSelect updateTags={updateTags} tags={image.tags} />
        <p>{uploadImageMutation.isSuccess ? "uploaded" : ""}</p>
      </div>
    );
}

export default Upload;
