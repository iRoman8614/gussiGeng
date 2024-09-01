import {useEffect} from "react";
import {HashRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/main-page/MainPage.jsx";
import { CoinProvider } from './context/CoinContext.jsx';

import './App.css'
import {PvpPage} from "./pages/pvp-page/PvpPage.jsx";

function App() {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
        <CoinProvider>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/pvp' element={<PvpPage />} />
                </Routes>
            </HashRouter>
        </CoinProvider>
    )
}

export default App
