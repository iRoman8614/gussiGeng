
import {useEffect, useState} from 'react';
import axiosInstance from "../../utils/axios";
import {toast} from "react-toastify";

import styles from './Lobby.module.scss'
import {IconButton} from "../../components/buttons/icon-btn/IconButton";
import {useLastGames, useProfileStats} from "../../utils/api";
import {useNavigate} from "react-router-dom";

const bg = '/gussiGeng/public/backgrounds/Lobby.png'
const hands = '/gussiGeng/public/main-buttons/hand2.png';
const rich = '/gussiGeng/public/main-buttons/rich.png';
const FAQ = '/gussiGeng/public/main-buttons/FAQ.png'

const gameIconsAssets = [
    '/gussiGeng/public/game-icons/animation_hand_pap.gif',
    '/gussiGeng/public/game-icons/animation_hand_rock.gif',
    '/gussiGeng/public/game-icons/animation_hand_sci.gif',
    '/gussiGeng/public/game-icons/hand_pap.png',
    '/gussiGeng/public/game-icons/hand_rock.png',
    '/gussiGeng/public/game-icons/hand_sci.png',
    '/gussiGeng/public/game-icons/heart.png',
    '/gussiGeng/public/game-icons/lose.png',
    '/gussiGeng/public/game-icons/paper.png',
    '/gussiGeng/public/game-icons/rock.png',
    '/gussiGeng/public/game-icons/scissors.png'
];

export const LobbyPage = () => {
    const [hintOne, setHintOne] = useState(false)
    const [hintTwo, setHintTwo] = useState(false)
    const [remainingTime, setRemainingTime] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [sessionsCount, setSessionsCount] = useState(0)

    const navigate = useNavigate();

    const { fetchProfileStats, data: stats } = useProfileStats();
    const { data: lastGamesData } = useLastGames()

    useEffect(() => {
        fetchProfileStats()
    }, [])

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);


    useEffect(() => {
        if (lastGamesData) {
            const { session } = lastGamesData;
            setSessionsCount(session.count);

            if (session.count >= 5) {
                const firstGame = localStorage.getItem('firstGame') || session.first;
                if (!localStorage.getItem('firstGame')) {
                    localStorage.setItem('firstGame', firstGame);
                }
                const firstGameTime = new Date(firstGame);
                const now = new Date();
                const timeDiffInMs = now - firstGameTime;
                const remainingTimeInMs = (6 * 60 * 60 * 1000) - timeDiffInMs;
                if (remainingTimeInMs > 0) {
                    setRemainingTime(remainingTimeInMs);
                    setTimerActive(true);
                } else {
                    localStorage.removeItem('firstGame');
                }
            }
        }
    }, [lastGamesData]);

    const handlePvpClick = async () => {
        if (typeof window === "undefined") return;

        try {
            const response = await axiosInstance.get(`/farm/last-games`);
            const data = response.data;
            setSessionsCount(data.session.count);

            if (data.session.count < 5) {
                navigate('/pvp');
            } else if (data.session.count >= 5 && stats.pass > 0) {
                navigate('/pvp');
            } else {
                toast.warn("You have reached the maximum number of games");
            }
        } catch (error) {
            console.error("Error during /last-games request:", error);
            toast.error('Game unavailable');
        }
    };

    useEffect(() => {
        let timerId;
        if (remainingTime > 0 && timerActive) {
            timerId = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1000);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [remainingTime, timerActive]);

    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <>
            <head>
                {gameIconsAssets.map((src, index) => (
                    <link key={index} rel="preload" href={src} as="image" />
                ))}
            </head>
            <div className={styles.root}>
                <img className={styles.image} src={bg} alt={''} width={450} height={1000} />
                <div className={styles.container}>
                    <div>
                        <div className={styles.card}>
                            <div className={styles.icon} onClick={handlePvpClick}>
                                <div>battle</div>
                                <p className={styles.hiddenText}>free</p>
                                <img className={styles.logo} src={hands} alt={''} width={150} height={75} />
                            </div>
                            <div className={styles.lable}>
                                {remainingTime > 0 &&
                                    <div className={styles.timer}>
                                        {formatTime(remainingTime)}
                                    </div>}
                                <div className={styles.title}>
                                    {sessionsCount < 5 ? (
                                        <>
                                            <div>{5 - sessionsCount}</div>
                                            <p>games left</p>
                                        </>
                                    ) : (
                                        <>
                                            <div>{stats.pass}</div>
                                            <p>extra games</p>
                                        </>)
                                    }
                                </div>
                            </div>
                            <div className={styles.btn} onClick={() => {
                                if (window.Telegram?.WebApp?.HapticFeedback) {
                                    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                                }
                                setHintOne(!hintOne)
                            }}>?</div>
                        </div>
                        {hintOne && <div className={styles.hint}>
                            Battle against others, earn rewards, and climb the ranks.
                            <p>no luck, just skill!</p>
                        </div>}
                    </div>
                    <div>
                        <div className={styles.hidderRoot}>
                            <div className={styles.card}>
                                <a href={'/lobby'} className={styles.icon}>
                                    <div>ton</div>
                                    <p>battle</p>
                                    <img className={styles.logo} src={rich} alt={''} width={150} height={75} />
                                </a>
                                <div className={styles.lable}>
                                    <div className={styles.timer}><p>{' '}</p></div>
                                    <div className={styles.title}>
                                        <div>Soon</div>
                                        {/*<p>ton</p>*/}
                                    </div>
                                </div>
                                <div className={styles.btn} onClick={() => {
                                    if (window.Telegram?.WebApp?.HapticFeedback) {
                                        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                                    }
                                    setHintTwo(!hintTwo)}}>?</div>
                            </div>
                        </div>
                        {hintTwo && <div className={styles.hint}>
                            <p>feeling bold?</p>
                            Put your Ton on the line in this high-stakes mode!
                        </div>}
                    </div>
                </div>
                <div className={styles.faq}>
                    <IconButton image={FAQ} alt={'home'} title={'faq'} onClick={() => {navigate('/faq/pvp')}} />
                </div>
            </div>
        </>

    );
}
