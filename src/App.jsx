import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useGetProfileQuery } from "./store/apiSlice.js";
import {preloadAssets } from './utils/preloadAssets';
import { MainPage } from "./pages/main-page/MainPage.jsx";
import {PvpPage} from "./pages/pvp-page/PvpPage.jsx";
import {Loader} from "./components/loader/Loader.jsx";

import './App.css';

function App() {
    const [userId, setUserId] = useState(1);
    const [isLoadingAssets, setIsLoadingAssets] = useState(true);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    useEffect(() => {
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
                console.log("User ID from Telegram:", userObject.id);
                setUserId(userObject.id);
            }
        }
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
    }, []);

    return (
        <Provider store={store}>
            {isLoadingAssets || isLoadingProfile ? (
                <Loader />
            ) : (
                <HashRouter>
                    <Routes>
                        <Route path='/' element={<MainPageWrapper userId={userId} setIsLoadingProfile={setIsLoadingProfile} />} />
                        <Route path='/pvp' element={<PvpPage />} />
                    </Routes>
                </HashRouter>
            )}
        </Provider>
    );
}

// eslint-disable-next-line react/prop-types
function MainPageWrapper({ userId }) {
    const [rate, setRate] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const { data: profile, error: profileError } = useGetProfileQuery(userId, {
        skip: !userId,
    });

    useEffect(() => {
        if (!profileError) {
            console.log(`Sending request to https://supavpn.lol/farm/start?profileId=${profile.Id}`);
            fetch(`https://supavpn.lol/farm/start?profileId=${profile.Id}`)
                .then(response => response.json())
                .then(farmData => {
                    setRate(farmData.rate);
                    setTotalCoins(profile.Balance);
                    console.log("Farm start response:", farmData);
                })
                .catch((error) => {
                    setRate(3);
                    setTotalCoins(profile.Balance);
                    console.error("Error during farm start request:", error);
                });
        }
    }, [profile, profileError]);

    return <MainPage profile={profile} rate={rate} totalCoins={totalCoins} />;
}

export default App;
