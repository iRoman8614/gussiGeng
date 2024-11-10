
import {useEffect, useRef, useState} from "react";

import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
import {LoaderGif} from "../../components/loader/LoaderGif.jsx";
import {PvpBtn} from "../../components/buttons/PvpBtn/PvpBtn";
import { toast } from "react-toastify";
import axiosInstance from '../../utils/axios';

import teamData from '../../mock/teamsData.js';
import { gameOptions } from '../../mock/optionData';

import styles from './Pvp.module.scss';
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const wins = '/wins.png';
const background = '/backgrounds/backalley.png'
const timerBG = '/timer.png'
const heart = '/game-icons/heart.png'
const cross = '/game-icons/lose.png'
const gifPaths = {
    rockAnim: '/game-icons/animation_hand_rock.gif',
    scisAnim: '/game-icons/animation_hand_sci.gif',
    papAnim: '/game-icons/animation_hand_pap.gif',
};
const rock = '/game-icons/rock.png'
const paper = '/game-icons/paper.png'
const scis = '/game-icons/scissors.png'
const changerF = '/game-icons/roundAnimFront.png'
const changerB = '/game-icons/roundAnimBack.png'

export const PvpPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [visibleImage, setVisibleImage] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1);
    const [timer, setTimer] = useState(3);
    const [playerChoice, setPlayerChoice] = useState(4);
    const [opponentChoice, setOpponentChoice] = useState(4);
    const [gameEnded, setGameEnded] = useState(false);
    const [userName, setUserName] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [isLoadingPvp, setIsLoadingPvp] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userClan, setUserClan] = useState(1);
    const [oppClan, setOppClan] = useState(4);
    const [roundResult, setRoundResult] = useState(null);
    const [opponentName, setOpponentName] = useState("biggie smalls")
    const [showChanger, setShowChanger] = useState(false)

    const playerGifCache = useRef({});
    const opponentGifCache = useRef({});

    const preloadPlayerGifs = () => {
        const cache = {};
        if (typeof window !== 'undefined') {
            ['rockAnim', 'scisAnim', 'papAnim'].forEach(key => {
                const img = new window.Image();
                img.src = gifPaths[key];
                cache[key] = img;
                console.log(`Игрок - Загружен ${key}: ${img.src}`);
            });
        }
        return cache;
    };

    const preloadOpponentGifs = () => {
        const cache = {};
        if (typeof window !== 'undefined') {
            ['rockAnim', 'scisAnim', 'papAnim'].forEach(key => {
                const img = new window.Image();
                img.src = gifPaths[key];
                cache[key] = img;
                console.log(`Оппонент - Загружен ${key}: ${img.src}`);
            });
        }
        return cache;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            playerGifCache.current = preloadPlayerGifs();
            opponentGifCache.current = preloadOpponentGifs();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const search = window.Telegram.WebApp.initData;
            const urlParams = new URLSearchParams(search);
            const userParam = urlParams.get('user');
            if (userParam) {
                const decodedUserParam = decodeURIComponent(userParam);
                const userObject = JSON.parse(decodedUserParam);
                setUserId(userObject.id);
                setUserName(userObject.username);
            } else {
                setUserId(111)
                setUserName('you');
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            clearTimeout(timeoutId);
            navigate('/pvpbot');
        }, 10000);
        const startGame = async () => {
            try {
                const response = await axiosInstance.get(`/game/start`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.status === 400 || response.status === 504 || response.status === 502) {
                    toast.error("Pair not found");
                    setTimeout(() => {
                        navigate('/main');
                    }, 5000);
                    return;
                }
                const data = response.data;
                console.log('response', response)
                console.log('response.data', response.data)
                if(data.code === 502 || data.code === 504 || data.code === 400) {
                    toast.error("Pair not found");
                    setTimeout(() => {
                        navigate('/main');
                    }, 5000);
                    return;
                }
                if(response.data) {
                    clearTimeout(timeoutId);
                }
                const isPlayer1 = data.player1.id === userId;
                const userClan = isPlayer1 ? data.player1.group : data.player2.group;
                const opponentClan = isPlayer1 ? data.player2.group : data.player1.group;
                const opponentName = isPlayer1 ? (data.player2.name === "" ? "biggie smalls" : data.player2.name)
                    : (data.player1.name === "" ? "biggie smalls" : data.player1.name);

                setOppClan(opponentClan);
                setUserClan(userClan);
                setOpponentName(opponentName);
                setSessionId(data.sessionId);
                setIsLoadingPvp(false);

                if (data.currentRound > 1) {
                    const lastAnswerResponse = await axiosInstance.get(`/game/last-answer?sessionId=${data.sessionId}`);
                    const lastAnswerData = lastAnswerResponse.data;
                    const playerVictory = isPlayer1 ? lastAnswerData.player1.victory : lastAnswerData.player2.victory;
                    const opponentVictory = isPlayer1 ? lastAnswerData.player2.victory : lastAnswerData.player1.victory;
                    setPlayerScore(playerVictory);
                    setOpponentScore(opponentVictory);
                    const totalVictory = playerVictory + opponentVictory;
                    setRound(totalVictory + 1);
                }
                clearTimeout(timeoutId);
            } catch (error) {
                console.error('Ошибка при запросе /game/start:', error);
                if (error.response) {
                    const { status } = error.response;
                    if(status === 408) {
                        navigate('/pvpbot');
                    }
                    if (status === 400 || status === 504 || status === 502) {
                        toast.error("Pair not found");
                        setTimeout(() => {
                            navigate('/');
                        }, 5000);
                    }
                }
            }
            finally {
                clearTimeout(timeoutId);
            }
        };
        if (typeof window !== 'undefined' && userId !== null) {
            startGame();
        }
        return () => clearTimeout(timeoutId);
    }, [userId]);


    useEffect(() => {
        let timerId;
        if (!isLoadingPvp && timer > 0 && !gameOver) {
            timerId = setTimeout(() => {
                if (window.Telegram?.WebApp?.HapticFeedback) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                }
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            if (playerChoice === 4) {
                handlePlayerChoiceTimeout();
            } else if (playerChoice !== 4 && opponentChoice !== 4) {
                showGifSequence();
            }
        }
        return () => clearTimeout(timerId);
    }, [timer, round, isLoadingPvp, playerChoice, opponentChoice]);

    const handlePlayerChoiceTimeout = () => {
        sendAnswerToServer(10);
    };

    const sendAnswerToServer = async (choice) => {
        if (!sessionId) {
            return;
        }
        try {
            const response = await axiosInstance.get(`/game/answer?sessionId=${sessionId}&answer=${choice}`);
            const data = response.data;
            handleRoundResult(data);
        } catch (error) {
            console.error('Ошибка при запросе /game/answer:', error);
        }
    };

    const handlePlayerChoice = (choice) => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
        if (gameOver || playerChoice !== 4) return;
        setPlayerChoice(choice);
        const sendAnswer = async () => {
            if (!sessionId) {
                return;
            }
            try {
                const response = await axiosInstance.get(`/game/answer?sessionId=${sessionId}&answer=${choice}`);
                const data = response.data;
                handleRoundResult(data);
            } catch (error) {
                console.error('Ошибка при запросе /game/answer:', error);
            }
        };
        sendAnswer();
    };

    const handleRoundResult = (data) => {
        const { player1, player2, finished } = data;
        const isPlayer1 = player1.id === userId;
        const userAnswer = isPlayer1 ? (player1.answer) : (player2.answer);
        const opponentAnswer = isPlayer1 ? (player2.answer) : (player1.answer);
        const userVictory = isPlayer1 ? player1.victory : player2.victory;
        const opponentVictory = isPlayer1 ? player2.victory : player1.victory;
        setPlayerChoice(userAnswer);
        setOpponentChoice(opponentAnswer);
        setRoundResult({ userVictory, opponentVictory, finished })
        if (player1.answer !== 4 && player2.answer !== 4 && timer === 0) {
            showGifSequence();
        }
    };

    const showGifSequence = () => {
        const timeouts = [];
        const durations = [0, 2000];
        const totalGifDuration = 2000 + 1000;
        durations.forEach((duration, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleImage(index + 1);
                }, duration)
            );
        });
        setTimeout(() => {
            if (roundResult) {
                const newPlayerScore = roundResult.userVictory;
                const newOpponentScore = roundResult.opponentVictory;
                setPlayerScore(newPlayerScore);
                setOpponentScore(newOpponentScore);
                if (playerChoice !== opponentChoice) {
                    setShowChanger(true)
                }

                if (roundResult.finished === true) {
                    handleGameEnd();
                } else {
                    setTimeout(() => {
                        resetRoundAfterDelay();
                    }, 1000);
                }
            }
        }, totalGifDuration);
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    };

    const resetRoundAfterDelay = () => {
        if (playerChoice !== opponentChoice) {
            setRound(prev => prev + 1);
            console.log("Обновляем раунд");
        }
        setRoundResult(null);
        setPlayerChoice(4);
        setOpponentChoice(4);
        setTimer(3);
        setVisibleImage(0);
        setShowChanger(false)
    };

    const handleGameEnd = () => {
        setGameEnded(true);
        setTimeout(() => {
            setGameOver(true);
        }, 3000);
        setTimeout(() => {
            navigate('/main');
        }, 2000);
    };

    return (
        <>
            {isLoadingPvp ? (
                <LoaderGif />
            ) : (
                <>
                    {gameEnded && <WinningScreen userName={userName} playerScore={playerScore} opponentName={opponentName} />}
                    <div className={styles.root}>
                        <img className={styles.background} src={background} width={300} height={1000} alt={'bg'} />
                        <div className={styles.container}>
                            <div className={styles.oppNickname}>
                                {opponentName}
                            </div>
                            <div className={styles.optionBg}>
                                <img
                                    className={`${styles.choose} ${visibleImage === 1 ? styles.visible : styles.hidden}`}
                                    src={
                                        opponentChoice === 1
                                            ? opponentGifCache.current.rockAnim?.src || gifPaths.rockAnim
                                            : opponentChoice === 2
                                                ? opponentGifCache.current.papAnim?.src || gifPaths.papAnim
                                                : opponentChoice === 3
                                                    ? opponentGifCache.current.scisAnim?.src || gifPaths.scisAnim
                                                    : gameOptions[4]?.logo
                                    }
                                    alt="game choice animation"
                                />
                                <img
                                    width={90}
                                    height={190}
                                    className={`${styles.choose} ${visibleImage !== 1 ? styles.visible : styles.hidden}`}
                                    src={
                                        visibleImage === 0
                                            ? gameOptions[4]?.logo
                                            : (opponentChoice === 0 || opponentChoice === 10)
                                                ? gameOptions[4]?.logo
                                                : opponentChoice === 1
                                                    ? gameOptions[1]?.logo
                                                    : opponentChoice === 2
                                                        ? gameOptions[2]?.logo
                                                        : gameOptions[3]?.logo
                                    }
                                    alt="game choice"
                                />
                            </div>
                            <VictoryCounter score={playerScore} />
                            <IconButton image={teamData[userClan].logo} alt={'gang'} />
                            <div className={styles.roundTimer}>
                                <img src={timerBG} alt={'timer'} height={144} width={144} className={styles.roundTimerBG} />
                                <div className={styles.time}>{timer}</div>
                            </div>
                            <IconButton image={teamData[oppClan].logo} alt={'gang'} />
                            <VictoryCounter score={opponentScore} />
                            <div className={styles.optionBg}>
                                <img
                                    className={`${styles.mychoose} ${visibleImage === 1 ? styles.visible : styles.hidden}`}
                                    src={
                                        playerChoice === 1
                                            ? playerGifCache.current.rockAnim?.src || gifPaths.rockAnim
                                            : playerChoice === 2
                                                ? playerGifCache.current.papAnim?.src || gifPaths.papAnim
                                                : playerChoice === 3
                                                    ? playerGifCache.current.scisAnim?.src || gifPaths.scisAnim
                                                    : gameOptions[4]?.logo
                                    }
                                    alt="game choice animation"
                                />
                                <img
                                    width={90}
                                    height={190}
                                    className={`${styles.mychoose} ${visibleImage !== 1 ? styles.visible : styles.hidden}`}
                                    src={
                                        visibleImage === 0
                                            ? gameOptions[4]?.logo
                                            : (playerChoice === 0 || playerChoice === 10)
                                                ? gameOptions[4]?.logo
                                                : playerChoice === 1
                                                    ? gameOptions[1]?.logo
                                                    : playerChoice === 2
                                                        ? gameOptions[2]?.logo
                                                        : gameOptions[3]?.logo
                                    }
                                    alt="game choice"
                                />
                            </div>
                            <div className={styles.round}>
                                {t('PVP.rounds')} {round}
                            </div>
                            <div className={styles.buttonSet}>
                                <PvpBtn title={t('PVP.rock')} img={rock} value={1} onClick={() => handlePlayerChoice(1)} choose={playerChoice} />
                                <PvpBtn title={t('PVP.paper')} img={paper} value={2} onClick={() => handlePlayerChoice(2)} choose={playerChoice} />
                                <PvpBtn title={t('PVP.scissors')} img={scis} value={3} onClick={() => handlePlayerChoice(3)} choose={playerChoice} />
                            </div>
                        </div>
                    </div>
                    {showChanger && <RoundChanger round={round}/>}
                </>
            )}
        </>
    )
}

// eslint-disable-next-line react/prop-types
const VictoryCounter = ({ score }) => (
    <div className={styles.counter}>
        {(score >= 1) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
        {(score >= 2) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
        {(score >= 3) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
    </div>
);

// eslint-disable-next-line react/prop-types
const WinningScreen = ({ userName, playerScore, opponentName  }) => (
    <div className={styles.winbg}>
        <div className={styles.winBorder}>
            <div className={styles.winContainer}>
                <div className={styles.winnerName}>
                    {playerScore === 3 ? userName : opponentName}
                </div>
                <img width={204} height={151} className={styles.winsImage} src={wins} alt={'wins'}  />
                <p className={styles.winnerName}>+5% farm</p>
            </div>
        </div>
    </div>
);

// eslint-disable-next-line react/prop-types
const RoundChanger = ({round}) => {
    const {t} = useTranslation();
    return (
        <div className={styles.changerRoot}>
            <div className={styles.changerContainer}>
                <img className={styles.animF} src={changerF} alt={''} width={700} height={150}/>
                <img className={styles.animB} src={changerB} alt={''} width={700} height={150}/>
                <div className={styles.changerText}>{t('PVP.rounds')} {round}</div>
            </div>
        </div>)
}
