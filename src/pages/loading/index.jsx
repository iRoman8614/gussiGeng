
import { useCallback, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useInit } from '../../context/InitContext.jsx';
import {useProfileInit, useFarmStart, useProfileStats} from '../../utils/api';
import CryptoJS from 'crypto-js';

import styles from './Loader.module.scss';
import {useNavigate} from "react-router-dom";

const loaderImage = '/gussiGeng/public/loadingImg.jpg';

const newPlayerAssets = [
    '/backgrounds/backalley.png', '/backgrounds/leaderboardBG.png',
    '/backgrounds/Lobby.png', '/backgrounds/nightcity.png',
    '/backgrounds/randomBG.png', '/random/blueCard.png',
    '/random/card.png', '/random/dialog.png', '/random/dialog2.png',
    '/random/greenCard.png', '/random/hand.png', '/random/oneCard.png',
    '/random/person.png', '/random/redCard.png', '/random/yellowCard.png',
];

export const LoaderPage = () => {
    const navigate = useNavigate();
    const { updateContext } = useInit();
    const [isNewPlayer, setIsNewPlayer] = useState(() => {
        if(typeof window !== "undefined") {
            const init = localStorage.getItem('init');
            const start = localStorage.getItem('farm');
            const GWToken = localStorage.getItem('GWToken');
            return !init || !start || !GWToken;
        } else {
            return true;
        }
    });

    // eslint-disable-next-line no-undef
    // const CURRENT_VERSION = process.env.NEXT_PUBLIC_CURRENT_VERSION
    const CURRENT_VERSION = '0.0.1'

    const token = createEncryptedToken();
    const { error: profileError, fetchProfileInit } = useProfileInit(token);
    const { error: farmError, fetchFarmStart } = useFarmStart();
    const { fetchProfileStats } = useProfileStats()

    const updateBodyHeight = useCallback(() => {
        document.body.style.height = `${window.innerHeight}px`;
    }, []);

    const initializeTelegramWebApp = useCallback(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.setHeaderColor('#183256');
            window.Telegram.WebApp.expand();
            updateBodyHeight();
            window.addEventListener('resize', updateBodyHeight);
        } else {
            toast.error("Telegram WebApp unavailable");
        }
        checkVersion();
    }, [updateBodyHeight]);

    const checkVersion = useCallback(() => {
        if (typeof window !== 'undefined') {
            const savedVersion = localStorage.getItem('version');
            if (savedVersion !== CURRENT_VERSION) {
                localStorage.clear();
                setIsNewPlayer(true);
                localStorage.setItem('version', CURRENT_VERSION);
            }
        }
    }, [CURRENT_VERSION]);

    function createEncryptedToken() {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const search = window.Telegram.WebApp.initData;
            const urlParams = new URLSearchParams(search);
            const userParam = urlParams.get('user');
            if (userParam) {
                const decodedUserParam = decodeURIComponent(userParam);
                const userObject = JSON.parse(decodedUserParam);
                const userId = userObject.id.toString();
                // eslint-disable-next-line no-undef
                const salt = String(process.env.NEXT_PUBLIC_SALT);
                const hash = CryptoJS.SHA256(userId + salt);
                const encryptedString = hash.toString(CryptoJS.enc.Hex);
                localStorage.setItem('authToken', `${userId}-${encryptedString}`)
                return `${userId}-${encryptedString}`;
            }
        }
        return null;
    }

    const fetchData = useCallback(async () => {
        try {
            await fetchProfileInit()
            await fetchFarmStart();
            await fetchProfileStats();
            if (profileError) {
                throw new Error('Initialization failed, restart app');
            }
            if (farmError) {
                throw new Error('Farm start failed, restart app');
            }
        } catch (error) {
            if(error.status === 401) {
                toast.error('error during init request, restart app');
                return;
            }
            return;
        }
    }, []);

    const updateAndRedirect = useCallback(() => {
        const init = localStorage.getItem('init');
        const start = localStorage.getItem('farm');
        const GWToken = localStorage.getItem('GWToken');
        const savedInit = JSON.parse(localStorage.getItem('init'));
        const savedFarm = JSON.parse(localStorage.getItem('farm'));
        let isExperiencedPlayer = false
        if (!init || !start || !GWToken) {
            setIsNewPlayer(true);
        } else {
            isExperiencedPlayer = savedInit && savedFarm
        }
        updateContext();

        if (savedInit.groupId === 0 || savedFarm.farmLimit === 0) {
            return;
        }
        if (isNewPlayer) {
            navigate('/getRandom');
        } else if (!isNewPlayer && isExperiencedPlayer) {
            navigate('/main');
        }
    }, []);

    useEffect(() => {
        const executeAfterToken = async () => {
            initializeTelegramWebApp()
            await fetchData();
            updateAndRedirect();
        };
        if (token) {
            executeAfterToken();
        } else {
            return
        }
    }, []);

    return (
        <>
            <head>
                <link rel="preload" href={loaderImage} as="image" />
                {newPlayerAssets.map((src, index) => (
                    <link key={index} rel="preload" href={src} as="image" />
                ))}
            </head>
            <div className={styles.root}>
                <img className={styles.video} src={loaderImage} alt="Loading..." width={500} height={500} />
                <LoadingText />
            </div>
        </>
    );
}

const LoadingText = () => {
    const [dots, setDots] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setDots(prevDots => (prevDots + 1) % 4); }, 500);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.loading}>
            Loading{'.'.repeat(dots)}
        </div>
    );
};
