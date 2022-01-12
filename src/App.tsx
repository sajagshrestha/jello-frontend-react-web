import JelloRouter from './Router';
import {ThemeProvider} from '@mui/material';
import darkTheme from './theme/theme';
import GlobalStyle from './theme/global-styles';
import {store} from './redux';
import {Provider} from 'react-redux';
import {QueryClientProvider} from 'react-query';
import queryClient from './react-query/query-client';

import Snackbar from './pages/Snackbar';

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={darkTheme}>
                    <GlobalStyle />
                    <JelloRouter />
                    <Snackbar />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
