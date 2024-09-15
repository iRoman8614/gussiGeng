import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gameOptions } from '../../mock/optionData';
import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
import {Loader} from "../../components/loader/Loader.jsx";

import border from '/farm_border.png'
import pgborder from "/winPBborder.png"
import wins from '/wins.png'

import teamData from '../../mock/teamsData.js'

import styles from './PvpPage.module.scss';

export const PvpPage = () => {
    const navigate = useNavigate();

    const teamId = localStorage.getItem('teamId')

    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1)
    const [timer, setTimer] = useState(10);
    const [playerChoice, setPlayerChoice] = useState(0);
    const [opponentChoice, setOpponentChoice] = useState(0);
    const [gameEnded, setgameEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [opponentTeamId, setOpponentTeamId] = useState(() => {
        return Math.floor(Math.random() * 3) + 1;
    });
    const[userName, setUserName] = useState('you')

    if (window.Telegram?.WebApp) {
        const search = window.Telegram.WebApp.initData;
        const urlParams = new URLSearchParams(search);
        const userParam = urlParams.get('user');
        if (userParam) {
            const decodedUserParam = decodeURIComponent(userParam);
            const userObject = JSON.parse(decodedUserParam);
            console.log("User ID from Telegram:", userObject.id);
            setUserName(userObject.username);
        }
    }



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
    }, [teamId, teamData]);

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
                    setgameEnded(true);
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
                    setgameEnded(true);
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
            setPlayerChoice(0);
            setOpponentChoice(0);
            resetTimer();
        }, 1500);
    };

    const resetTimer = () => {
        setTimer(10);
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.root}>
                {gameEnded && <WinningScreen userName={userName} playerScore={playerScore} />}
                <div className={styles.oppNickname}>
                    <img className={styles.oppNicknameBorder} src={border} alt={''} />
                    biggie smalls
                </div>
                <div className={styles.container}>
                    <div className={styles.optionBg}>
                        {opponentChoice !== null && <img
                            className={styles.choose}
                            src={gameOptions[opponentChoice].logo}
                            alt={gameOptions[opponentChoice].name}
                        />}
                    </div>
                    <VictoryCounter score={opponentScore} />
                    <IconButton image={teamData[teamId].logo} alt={'gang'} />
                    <div className={styles.roundTimer}>
                        <div className={styles.time}>{timer}</div>
                    </div>
                    <IconButton image={teamData[opponentTeamId].logo} alt={'gang'} />
                    <VictoryCounter score={playerScore} />
                    <div className={styles.optionBg}>
                        {playerChoice !== null && <img
                            className={styles.mychoose}
                            src={gameOptions[playerChoice].logo}
                            alt={gameOptions[playerChoice].name}
                        />}
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
                    <button className={styles.btn} onClick={() => handlePlayerChoice(0)}>
                        <img className={styles.icon} src={'/gussiGeng/game-icons/rockIcon.png'} alt={'Rock'} />
                        <p>Rock</p>
                    </button>
                    <button className={styles.btn} onClick={() => handlePlayerChoice(2)}>
                        <img className={styles.icon} src={'/gussiGeng/game-icons/scissorsIcon.png'} alt={'Scissors'} />
                        <p>Scissors</p>
                    </button>
                </div>
            </div>
        </>

    );
}

// Функция для выбора случайного номера от 1 до 3
function getRandomOption() {
    const min = 0;
    const max = 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
const WinningScreen = ({userName, playerScore}) => {
    return(
        <div className={styles.winbg}>
            <div className={styles.winContainer}>
                <div className={styles.winnerName}>{playerScore === 3 ? {userName} : 'Opponent'}</div>
                <img className={styles.winsImage} src={wins} />
                <p className={styles.winnerName}>+5% FaRM RaTE </p>
            </div>
        </div>
    )
}