import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gameOptions } from '../../mock/optionData';
import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
import { Loader } from "../../components/loader/Loader.jsx";

import border from '/farm_border.png';
import pgborder from "/winPBborder.png";
import wins from '/wins.png';

import start from '/public/game-icons/animation_hand_start.gif';
import rockAnim from '/public/game-icons/animation_hand_rock.gif';
import scisAnim from '/public/game-icons/animation_hand_sci.gif';
import papAnim from '/public/game-icons/animation_hand_pap.gif';
import pap from '/public/game-icons/hand_pap.png';
import rock from '/public/game-icons/hand_rock.png';
import scis from '/public/game-icons/hand_sci.png';

import teamData from '../../mock/teamsData.js';

import styles from './PvpPage.module.scss';
import { useGifSequence } from "../../utils/useGifSequence.js";

export const PvpPage = () => {
    const navigate = useNavigate();

    const teamId = localStorage.getItem('teamId');

    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1);
    const [timer, setTimer] = useState(10);
    const [playerChoice, setPlayerChoice] = useState(0);  // Изменил с 2 на null
    const [opponentChoice, setOpponentChoice] = useState(0);  // Изменил с 2 на null
    const [gameEnded, setGameEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [opponentTeamId, setOpponentTeamId] = useState(() => {
        return Math.floor(Math.random() * 3) + 1;
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        let timerId;
        if (!isLoading && timer > 0 && !gameOver) {
            timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && !gameOver) {
            handleRoundEnd();
        }

        return () => clearTimeout(timerId);
    }, [isLoading, timer, gameOver]);

    useEffect(() => {
        if (teamId !== null) {
            const randomOpponentTeamId = getRandomTeamIdExceptCurrent(teamId, Object.keys(teamData).length);
            setOpponentTeamId(randomOpponentTeamId);
        }
    }, [teamId]);

    const handlePlayerChoice = (choice) => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        }
        if (gameOver) return;

        setPlayerChoice(choice);
        const randomOpponentChoice = getRandomOption();
        setOpponentChoice(randomOpponentChoice);
        setRound(prev => prev + 1);
        const playerMove = gameOptions[choice].name;
        const opponentMove = gameOptions[randomOpponentChoice].name;

        if (playerMove === opponentMove) {
            // Ничья
        } else if (
            (playerMove === 'paper' && opponentMove === 'rock') ||
            (playerMove === 'rock' && opponentMove === 'scis') ||
            (playerMove === 'scis' && opponentMove === 'paper')
        ) {
            setPlayerScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setGameEnded(true);
                    setTimeout(() => {
                        setGameOver(true);
                        navigate('/');
                    }, 3000);
                } else {
                    resetRoundAfterDelay();
                }
                return newScore;
            });
        } else {
            setOpponentScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setGameEnded(true);
                    setTimeout(() => {
                        setGameOver(true);
                        navigate('/');
                    }, 3000);
                } else {
                    resetRoundAfterDelay();
                }
                return newScore;
            });
        }
    };

    const handleRoundEnd = () => {
        if (playerChoice === null) {
            const randomOpponentChoice = getRandomOption();
            setOpponentChoice(randomOpponentChoice);
            setOpponentScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setGameOver(true);
                } else {
                    resetRoundAfterDelay();
                }
                return newScore;
            });
        } else {
            resetRoundAfterDelay();
        }
    };

    const resetRoundAfterDelay = () => {
        setTimeout(() => {
            setPlayerChoice(null);
            setOpponentChoice(null);
            resetTimer();
        }, 1500);
    };

    const resetTimer = () => {
        setTimer(10);
    };

    // Последовательности для каждого типа анимации/изображения
    const papers = [pap, start, papAnim, pap];
    const rocks = [rock, start, rockAnim, rock];
    const sciss = [scis, start, scisAnim, scis];
    const interval = 2000;

    // Последовательности анимаций с помощью useGifSequence
    const activePaper = useGifSequence(papers, interval);
    const activeRock = useGifSequence(rocks, interval);
    const activeScis = useGifSequence(sciss, interval);

    // Динамический массив для выбора в игре
    const choses = [rock, activePaper, activeRock, activeScis];

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.root}>
                {gameEnded && <WinningScreen userName={'user'} />}
                <div className={styles.oppNickname}>
                    <img className={styles.oppNicknameBorder} src={border} alt={''} />
                    biggie smalls
                </div>
                <div className={styles.container}>
                    <div className={styles.optionBg}>
                        {opponentChoice !== null && (
                            <img
                                className={styles.choose}
                                src={choses[opponentChoice]}
                            />
                        )}
                    </div>
                    <VictoryCounter score={opponentScore} />
                    <IconButton image={teamData[teamId].logo} alt={'gang'} />
                    <div className={styles.roundTimer}>
                        <div className={styles.time}>{timer}</div>
                    </div>
                    <IconButton image={teamData[opponentTeamId].logo} alt={'gang'} />
                    <VictoryCounter score={playerScore} />
                    <div className={styles.optionBg}>
                        {playerChoice !== null && (
                            <img
                                className={styles.mychoose}
                                src={choses[playerChoice]}
                            />
                        )}
                    </div>
                </div>
                <div className={styles.round}>
                    <img className={styles.roundBorder} src={border} alt={''} />
                    round {round}
                </div>
                <div className={styles.buttonSet}>
                    <button className={styles.btn} onClick={() => handlePlayerChoice(1)}>
                        <img className={styles.icon} src={'/gussiGeng/game-icons/paperIcon.png'} alt={'paper'} />
                        <p>Paper</p>
                    </button>
                    <button className={styles.btn} onClick={() => handlePlayerChoice(2)}>
                        <img className={styles.icon} src={'/gussiGeng/game-icons/rockIcon.png'} alt={'rock'} />
                        <p>Rock</p>
                    </button>
                    <button className={styles.btn} onClick={() => handlePlayerChoice(3)}>
                        <img className={styles.icon} src={'/gussiGeng/game-icons/scissorsIcon.png'} alt={'scissors'} />
                        <p>Scissors</p>
                    </button>
                </div>
            </div>
        </>
    );
};

// Функция для выбора случайного номера от 1 до 3
function getRandomOption() {
    return Math.floor(Math.random() * 3) + 1;
}

// Функция для выбора случайного ID команды, отличный от текущего
function getRandomTeamIdExceptCurrent(currentTeamId, totalTeams = 3) {
    const teamIds = Array.from({ length: totalTeams }, (_, i) => i + 1);
    const filteredTeamIds = teamIds.filter(id => id !== currentTeamId);
    const randomIndex = Math.floor(Math.random() * filteredTeamIds.length);
    return filteredTeamIds[randomIndex];
}


// eslint-disable-next-line react/prop-types
const VictoryCounter = ({ score }) => {
    return (
        <div className={styles.counter}>
            <img className={styles.containerBorder} src={pgborder} alt={''} />
            <div className={score >= 3 ? styles.lampOn : styles.lampOff}>
            </div>
            <div className={score >= 2 ? styles.lampOn : styles.lampOff}>
            </div>
            <div className={score >= 1 ? styles.lampOn : styles.lampOff}>
            </div>
        </div>
    );
};


// eslint-disable-next-line no-unused-vars,react/prop-types
const WinningScreen = ({userName}) => {
    return(
        <div className={styles.winbg}>
            <div className={styles.winContainer}>
                <div className={styles.winnerName}>{userName}</div>
                <img className={styles.winsImage} src={wins} />
                <p className={styles.winnerName}>+5% FaRM RaTE </p>
            </div>
        </div>
    )
}