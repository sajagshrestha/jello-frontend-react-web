import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ROUTES from './routes';

export default function JelloRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}
