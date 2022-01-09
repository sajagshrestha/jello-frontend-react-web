import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ROUTES from './routes';

export default function JelloRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
