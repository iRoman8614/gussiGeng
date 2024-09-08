import {useEffect} from "react";
import {HashRouter, Route, Routes} from 'react-router-dom';
import {MainPage} from "./pages/main-page/MainPage.jsx";
import {PvpPage} from "./pages/pvp-page/PvpPage.jsx";
import { CoinProvider } from './context/CoinContext.jsx';

import './App.css';

function App() {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
        }

        function setTelegramHeight() {
            const windowHeight = window.innerHeight;
            const availableHeight = document.documentElement.clientHeight;
            const telegramTopBarHeight = windowHeight - availableHeight;
            document.documentElement.style.setProperty('--telegram-top-bar-height', `${telegramTopBarHeight}px`);
            document.documentElement.style.setProperty('--available-height', `${availableHeight}px`);
        }
        setTelegramHeight();
        window.addEventListener('resize', setTelegramHeight);
        return () => {
            window.removeEventListener('resize', setTelegramHeight);
        };
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

export default App;
