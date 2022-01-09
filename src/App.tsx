import JelloRouter from './Router';
import {ThemeProvider} from '@mui/material';
import darkTheme from './theme/theme';
import GlobalStyle from './theme/global-styles';
import {store} from './redux';
import {Provider} from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyle />
                <JelloRouter />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
