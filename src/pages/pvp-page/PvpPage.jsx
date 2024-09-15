import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gameOptions } from '../../mock/optionData';
import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
import {LoaderGif} from "../../components/loader/LoaderGif.jsx";

import border from '/farm_border.png';
import pgborder from "/winPBborder.png";
import wins from '/wins.png';
import start from '/public/game-icons/animation_hand_start.gif';
import rockAnim from '/public/game-icons/animation_hand_rock.gif';
import scisAnim from '/public/game-icons/animation_hand_sci.gif';
import papAnim from '/public/game-icons/animation_hand_pap.gif';

import teamData from '../../mock/teamsData.js';

import styles from './PvpPage.module.scss';

export const PvpPage = () => {
    const navigate = useNavigate();

    const teamId = localStorage.getItem('teamId');
    const [visibleImage, setVisibleImage] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [opponentScore, setOpponentScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(1);
    const [timer, setTimer] = useState(10);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [opponentChoice, setOpponentChoice] = useState(3);
    const [gameEnded, setGameEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [opponentTeamId, setOpponentTeamId] = useState(() => Math.floor(Math.random() * 3) + 1);
    const [userName, setUserName] = useState('you');
    const [isRoundUpdating, setIsRoundUpdating] = useState(false);

    // useEffect(() => {
    //     const search = window.Telegram.WebApp.initData
    //     const urlParams = new URLSearchParams(search);
    //     const userParam = urlParams.get('user');
    //     const decodedUserParam = decodeURIComponent(userParam);
    //     const userObject = JSON.parse(decodedUserParam);
    //     const userTG = userObject.username
    //     setUserName(userTG)
    // }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (teamId !== null) {
            const randomOpponentTeamId = getRandomTeamIdExceptCurrent(teamId, Object.keys(teamData).length);
            setOpponentTeamId(randomOpponentTeamId);
        }
    }, [teamId]);

    useEffect(() => {
        let timerId;
        if (!isLoading && timer > 0 && !gameOver) {
            timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && playerChoice !== null) {
            const randomOpponentChoice = getRandomOption();
            setOpponentChoice(randomOpponentChoice);
            showGifSequence();
            setTimeout(() => {
                updateScores(playerChoice, randomOpponentChoice);
            }, 1000);
        }
        return () => clearTimeout(timerId);
    }, [timer, gameOver, playerChoice, isLoading]);

    const handlePlayerChoice = (choice) => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        }
        if (gameOver || playerChoice !== null || isLoading) return;
        setPlayerChoice(choice);
    };

    const showGifSequence = () => {
        const timeouts = [];
        const durations = [0, 1000, 1500];
        durations.forEach((duration, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleImage(index + 1);
                }, duration)
            );
        });
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    };

    const updateScores = (playerMoveIndex, opponentMoveIndex) => {
        const playerMove = gameOptions[playerMoveIndex].name;
        const opponentMove = gameOptions[opponentMoveIndex].name;

        if (playerMove === opponentMove) {
           //ничья
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
                }
                return newScore;
            });
        }
        resetRoundAfterDelay();
    };

    const resetRoundAfterDelay = () => {
        if (!isRoundUpdating) {
            setIsRoundUpdating(true);

            setTimeout(() => {
                setPlayerChoice(null);
                setOpponentChoice(null);
                setTimer(10);
                setVisibleImage(0);

                setRound(prev => prev + 1);
                setIsRoundUpdating(false);
            }, 1500);
        }
    };

    return (
        <>
            {isLoading && <LoaderGif />}
            <div className={styles.root}>
                {gameEnded && <WinningScreen userName={userName} playerScore={playerScore} />}
                <div className={styles.oppNickname}>
                    <img className={styles.oppNicknameBorder} src={border} alt={''} />
                    biggie smalls
                </div>
                <div className={styles.container}>
                    <div className={styles.optionBg}>
                        {visibleImage === 0 && (
                            <img
                                className={styles.choose}
                                src={gameOptions[3].logo}
                                alt="First"
                            />
                        )}
                        {visibleImage === 1 && (
                            <img
                                className={styles.choose}
                                src={start}
                                alt="Second"
                            />
                        )}
                        {visibleImage === 2 && (
                            <>
                                {opponentChoice === 0 && (
                                    <img
                                        className={styles.choose}
                                        src={rockAnim}
                                        alt="Third"
                                    />
                                )}
                                {opponentChoice === 1 && (
                                    <img
                                        className={styles.choose}
                                        src={papAnim}
                                        alt="Third"
                                    />
                                )}
                                {opponentChoice === 2 && (
                                    <img
                                        className={styles.choose}
                                        src={scisAnim}
                                        alt="Third"
                                    />
                                )}
                            </>
                        )}
                        {visibleImage === 3 && (
                            <>
                                {opponentChoice === 0 && (
                                    <img
                                        className={styles.choose}
                                        src={gameOptions[0].logo}
                                        alt="Third"
                                    />
                                )}
                                {opponentChoice === 1 && (
                                    <img
                                        className={styles.choose}
                                        src={gameOptions[1].logo}
                                        alt="Third"
                                    />
                                )}
                                {opponentChoice === 2 && (
                                    <img
                                        className={styles.choose}
                                        src={gameOptions[2].logo}
                                        alt="Third"
                                    />
                                )}
                            </>
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
                        {visibleImage === 0 && (
                            <img
                                className={styles.mychoose}
                                src={gameOptions[3].logo}
                                alt="First"
                            />
                        )}
                        {visibleImage === 1 && (
                            <img
                                className={styles.mychoose}
                                src={start}
                                alt="Second"
                            />
                        )}
                        {visibleImage === 2 && (
                            <>
                                {playerChoice === 0 && (
                                    <img
                                        className={styles.mychoose}
                                        src={rockAnim}
                                        alt="Third"
                                    />
                                )}
                                {playerChoice === 1 && (
                                    <img
                                        className={styles.mychoose}
                                        src={papAnim}
                                        alt="Third"
                                    />
                                )}
                                {playerChoice === 2 && (
                                    <img
                                        className={styles.mychoose}
                                        src={scisAnim}
                                        alt="Third"
                                    />
                                )}
                            </>
                        )}
                        {visibleImage === 3 && (
                            <>
                                {playerChoice === 0 && (
                                    <img
                                        className={styles.mychoose}
                                        src={gameOptions[0].logo}
                                        alt="Third"
                                    />
                                )}
                                {playerChoice === 1 && (
                                    <img
                                        className={styles.mychoose}
                                        src={gameOptions[1].logo}
                                        alt="Third"
                                    />
                                )}
                                {playerChoice === 2 && (
                                    <img
                                        className={styles.mychoose}
                                        src={gameOptions[2].logo}
                                        alt="Third"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.round}>
                    <img className={styles.roundBorder} src={border} alt={''} />
                    round {round}
                </div>
                <div className={styles.buttonSet}>
                    <button className={playerChoice === 1 ? styles.paperBtnActive : styles.btn} onClick={() => handlePlayerChoice(1)}>
                        {playerChoice !== 1 && <>
                            <img className={styles.icon} src={'/gussiGeng/game-icons/paperIcon.png'} alt={'paper'} />
                            <p>Paper</p>
                        </>}
                    </button>
                    <button className={playerChoice === 0 ? styles.rockBtnActive : styles.btn} onClick={() => handlePlayerChoice(0)}>
                        {playerChoice !== 0 && <>
                            <img className={styles.icon} src={'/gussiGeng/game-icons/rockIcon.png'} alt={'Rock'} />
                            <p>Rock</p>
                        </>}
                    </button>
                    <button className={playerChoice === 2 ? styles.scicBtnActive : styles.btn} onClick={() => handlePlayerChoice(2)}>
                        {playerChoice !== 2 &&
                            <>
                                <img className={styles.icon} src={'/gussiGeng/game-icons/scissorsIcon.png'} alt={'Scissors'}/>
                                <p>Scissors</p>
                            </>
                        }
                    </button>
                </div>
            </div>
        </>
    );
}
function getRandomOption() {
    return Math.floor(Math.random() * 3);
}
function getRandomTeamIdExceptCurrent(currentTeamId, totalTeams = 3) {
    const teamIds = Array.from({ length: totalTeams }, (_, i) => i + 1);
    const filteredTeamIds = teamIds.filter(id => id !== currentTeamId);
    const randomIndex = Math.floor(Math.random() * filteredTeamIds.length);
    return filteredTeamIds[randomIndex];
}
// eslint-disable-next-line react/prop-types
const VictoryCounter = ({ score }) => (
    <div className={styles.counter}>
        <img className={styles.containerBorder} src={pgborder} alt={''} />
        <div className={score >= 3 ? styles.lampOn : styles.lampOff}></div>
        <div className={score >= 2 ? styles.lampOn : styles.lampOff}></div>
        <div className={score >= 1 ? styles.lampOn : styles.lampOff}></div>
    </div>
);
// eslint-disable-next-line react/prop-types
const WinningScreen = ({ userName, playerScore }) => (
    <div className={styles.winbg}>
        <div className={styles.winContainer}>
            <div className={styles.winnerName}>{playerScore === 3 ? userName : 'Opponent'}</div>
            <img className={styles.winsImage} src={wins} alt={'wins'} />
            <p className={styles.winnerName}>+5% FaRM RaTE </p>
        </div>
    </div>
);

