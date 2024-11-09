import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import {preloadAssets, preloadLoaders} from './utils/preloadAssets';
import {PvpPage} from "./pages/pvp/index.jsx";

import './App.scss';
import {InitProvider} from "./context/InitContext.jsx";
import {ToastContainer} from "react-toastify";
import {LobbyPage} from "./pages/lobby/index.jsx";
import {HomePage} from "./pages/main/index.jsx";
import {LoaderPage} from "./pages/loading/index.jsx";
import {AccountPage} from "./pages/account/index.jsx";
import {SettingsPage} from "./pages/settings/index.jsx";
import {PvpBotPage} from "./pages/pvpbot/index.jsx";
import {FaqHomePage} from "./pages/faq/home/index.jsx";
import {FaqPvpPage} from "./pages/faq/pvp/index.jsx";
import {FriendsPage} from "./pages/friends/index.jsx";
import {UpgradesPage} from "./pages/upgrades/index.jsx";
import {BoardPage} from "./pages/boards/index.jsx";
import {RandomPage} from "./pages/getRandom/index.jsx";
import {ChangePage} from "./pages/change/index.jsx";

function App() {
    const [ ,setIsLoadingAssets] = useState(true);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
        }
        function setTelegramHeight() {
            const availableHeight = window.innerHeight;
            document.body.style.height = `${availableHeight}px`;
        }
        setTelegramHeight();
        window.addEventListener('resize', setTelegramHeight);

        if (window.Telegram?.WebApp) {
            const search = window.Telegram.WebApp.initData;
            const urlParams = new URLSearchParams(search);
            const userParam = urlParams.get('user');
            if (userParam) {
                const decodedUserParam = decodeURIComponent(userParam);
                const userObject = JSON.parse(decodedUserParam);
                console.log("Telegram userObject:", userObject);
                console.log("User ID from Telegram:", userObject.id);
            }
        }
        preloadLoaders().then(() => {
            preloadAssets()
                .then(() => {
                    setIsLoadingAssets(false);
                })
                .catch((error) => {
                    console.error('Error loading assets', error);
                });

            return () => {
                window.removeEventListener('resize', setTelegramHeight);
            };
        })

    }, []);

    return (
        <InitProvider>
            <HashRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path='/' element={<LoaderPage />} />
                    <Route path='/main' element={<HomePage />} />
                    <Route path='/lobby' element={<LobbyPage />} />
                    <Route path='/pvp' element={<PvpPage />} />
                    <Route path='/account' element={<AccountPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/pvpbot' element={<PvpBotPage />} />
                    <Route path='/faq/home' element={<FaqHomePage />} />
                    <Route path='/faq/pvp' element={<FaqPvpPage />} />
                    <Route path='/friends' element={<FriendsPage />} />
                    <Route path='/upgrades' element={<UpgradesPage />} />
                    <Route path='/boards' element={<BoardPage />} />
                    <Route path='/getRandom' element={<RandomPage />} />
                    <Route path='/change' element={<ChangePage />} />
                </Routes>change
            </HashRouter>
        </InitProvider>
    );
}


export default App;
