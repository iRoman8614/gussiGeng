import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext.jsx";
import { gameOptions } from '../../mock/optionData';
import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";

import border from '/farm_border.png'

import styles from './PvpPage.module.scss';

export const PvpPage = () => {
    const { teamId, teamData } = useContext(CoinContext);

    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1)
    const [timer, setTimer] = useState(10);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [opponentChoice, setOpponentChoice] = useState(null);
    const [opponentTeamId, setOpponentTeamId] = useState(() => {
        return Math.floor(Math.random() * 3) + 1;
    });


    useEffect(() => {
        let timerId;

        if (timer > 0 && !gameOver) {
            timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && !gameOver) {
            handleRoundEnd();
        }

        return () => clearTimeout(timerId);
    }, [timer, gameOver]);

    useEffect(() => {
        if (teamId !== null) {
            const randomOpponentTeamId = getRandomTeamIdExceptCurrent(teamId, Object.keys(teamData).length);
            setOpponentTeamId(randomOpponentTeamId);
        }
    }, [teamId, teamData]);

    const handlePlayerChoice = (choice) => {
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
                    setTimeout(() => {
                        setGameOver(true);
                        alert('Вы выиграли!');
                    }, 1000);
                } else {
                    resetRoundAfterDelay();
                }
                return newScore;
            });
        } else {
            setOpponentScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setTimeout(() => {
                        setGameOver(true);
                        alert('Оппонент выиграл!');
                    }, 1000);
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

    return (
        <div className={styles.root}>
            <div className={styles.oppNickname}>
                <img className={styles.oppNicknameBorder} src={border} alt={''} />
                biggie smalls
            </div>
            <div className={styles.playerContainer}>
                <div className={styles.optionBg}>
                    {opponentChoice !== null && <img
                        className={styles.choose}
                        src={gameOptions[opponentChoice].logo}
                        alt={gameOptions[opponentChoice].name}
                    />}
                </div>
                <VictoryCounter score={opponentScore} />
            </div>
            <div className={styles.middleBar}>
                <IconButton image={teamData[teamId].logo} alt={'gang'} />
                <div className={styles.roundTimer}>
                    <img className={styles.timer} src={border}/>
                    <div className={styles.time}>{timer}</div>
                </div>
                <IconButton image={teamData[opponentTeamId].logo} alt={'gang'} />
            </div>
            <div className={styles.playerContainer}>
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
                    <img src={border} alt={''} />
                    <img className={styles.icon} src={'/gussiGeng/game-icons/paperIcon.png'} alt={'paper'} />
                    <p>Paper</p>
                </button>
                <button className={styles.btn} onClick={() => handlePlayerChoice(2)}>
                    <img src={border} alt={''} />
                    <img className={styles.icon} src={'/gussiGeng/game-icons/rockIcon.png'} alt={'paper'} />
                    <p>Rock</p>
                </button>
                <button className={styles.btn} onClick={() => handlePlayerChoice(3)}>
                    <img src={border} alt={''} />
                    <img className={styles.icon} src={'/gussiGeng/game-icons/scissorsIcon.png'} alt={'paper'} />
                    <p>Scissors</p>
                </button>
            </div>
        </div>
    );
}

// Функция для выбора случайного номера от 1 до 3
function getRandomOption() {
    const min = 1;
    const max = 3;
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
            <img className={styles.containerBorder} src={border} alt={''} />
            <div className={score >= 3 ? styles.lampOn : styles.lampOff}></div>
            <div className={score >= 2 ? styles.lampOn : styles.lampOff}></div>
            <div className={score >= 1 ? styles.lampOn : styles.lampOff}></div>
        </div>
    );
};
