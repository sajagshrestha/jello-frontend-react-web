import {Button} from '@mui/material';

declare global {
    interface Window {
        cloudinary: any;
    }
}

function Upload() {
    const widgetStyles = {
        palette: {
            window: '#1d1919',
            windowBorder: '#90A0B3',
            tabIcon: '#fff',
            menuIcons: '#fff',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#1d1919'
        },
        frame: {
            background: '#010101'
        }
    };
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUDNAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
            sources: ['local', 'url'],
            styles: widgetStyles,
            multiple: false,
            folder: 'images',
            showPoweredBy: false,
            singleUploadAutoClose: false,
            cropping: false
        },
        (error: any, result: any) => {
            if(error)
            if (!error && result && result.event === 'success') {
                console.log(result);
            }
        }
    );

    const showWidget = () => {
        widget.open();
    };

    return (
        <div>
            <Button onClick={showWidget}>Select a Image</Button>
        </div>
    );
}

export default Upload;
