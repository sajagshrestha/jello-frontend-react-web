import {createTheme} from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        Pallete: any;
        Components: any;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        pallete?: any;
        component?: any;
    }
}

const darkTheme = createTheme({
    palette: {
        mode: 'light'
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            }
        }
    }
});

export default darkTheme;
