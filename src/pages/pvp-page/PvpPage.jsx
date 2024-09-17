import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { gameOptions } from '../../mock/optionData';
import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
import {LoaderGif} from "../../components/loader/LoaderGif.jsx";
import {preloadPvp} from '../../utils/preloadAssets';
import {PaperPVPbtn} from "../../components/buttons/paperPVPbtn/PaperPVPbtn.jsx";
import {RockPvpBtn} from "../../components/buttons/rockPvpBtn/RockPvpBtn.jsx";
import {ScicPvpBtn} from "../../components/buttons/scicPVPbtn/ScicPVPbtn.jsx";

import wins from '/wins.png';
import start from '/public/game-icons/animation_hand_start.gif';
import rockAnim from '/public/game-icons/animation_hand_rock.gif';
import scisAnim from '/public/game-icons/animation_hand_sci.gif';
import papAnim from '/public/game-icons/animation_hand_pap.gif';

//кадры лампочки
import scale000 from '/public/roundLightUp/scale00.png'
import scale001 from '/public/roundLightUp/scale01.png'
import scale002 from '/public/roundLightUp/scale02.png'
import scale003 from '/public/roundLightUp/scale03.png'
import scale004 from '/public/roundLightUp/scale04.png'
import scale005 from '/public/roundLightUp/scale05.png'
import scale006 from '/public/roundLightUp/scale06.png'
import scale007 from '/public/roundLightUp/scale07.png'
import scale008 from '/public/roundLightUp/scale08.png'
import scale009 from '/public/roundLightUp/scale09.png'
import scale010 from '/public/roundLightUp/scale10.png'
import scale011 from '/public/roundLightUp/scale11.png'
import scale012 from '/public/roundLightUp/scale12.png'
import scale013 from '/public/roundLightUp/scale13.png'
import scale014 from '/public/roundLightUp/scale14.png'
import scale015 from '/public/roundLightUp/scale15.png'

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
    const [timer, setTimer] = useState(5);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [opponentChoice, setOpponentChoice] = useState(3);
    const [gameEnded, setGameEnded] = useState(false);
    const [opponentTeamId, setOpponentTeamId] = useState(() => Math.floor(Math.random() * 3) + 1);
    const [userName, setUserName] = useState('you');

    const [isLoadingPvp, setIsLoadingPvp] = useState(true);

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
        preloadPvp()
            .then(() => {
                setIsLoadingPvp(false);
            })
            .catch((error) => {
                console.error('Error loading assets', error);
                // setIsLoadingPvp(false);
            })
    }, []);

    useEffect(() => {
        if (teamId !== null) {
            const randomOpponentTeamId = getRandomTeamIdExceptCurrent(teamId, Object.keys(teamData).length);
            setOpponentTeamId(randomOpponentTeamId);
        }
    }, [teamId]);

    useEffect(() => {
        let timerId;
        if (timer > 0 && !gameOver) {
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
    }, [timer, gameOver, playerChoice]);

    const showGifSequence = () => {
        const timeouts = [];
        const durations = [0, 1000, 1000];
        durations.forEach((duration, index) => {
            timeouts.push(
                setTimeout(() => {
                    setVisibleImage(index + 1);
                }, duration)
            );
        });
        return () => timeouts.forEach(timeout => clearTimeout(timeout));
    };

    // const handlePlayerChoice = (choice) => {
    //     if (window.Telegram?.WebApp?.HapticFeedback) {
    //         window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    //     }
    //     if (gameOver || playerChoice !== null) return;
    //     setPlayerChoice(choice);
    // };

    const updateScores = (playerMoveIndex, opponentMoveIndex) => {
        const playerMove = gameOptions[playerMoveIndex].name;
        const opponentMove = gameOptions[opponentMoveIndex].name;

        if (playerMove === opponentMove) {
            // Ничья — обновляем раунд сразу после анимации
        } else if (
            (playerMove === 'paper' && opponentMove === 'rock') ||
            (playerMove === 'rock' && opponentMove === 'scis') ||
            (playerMove === 'scis' && opponentMove === 'paper')
        ) {
            setPlayerScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setTimeout(() => handleGameEnd(), 3000);
                }
                return newScore;
            });
        } else {
            setOpponentScore(prev => {
                const newScore = prev + 1;
                if (newScore === 3) {
                    setTimeout(() => handleGameEnd(), 3000);
                }
                return newScore;
            });
        }
        if(!gameEnded) {
            setTimeout(() => {
                resetRoundAfterDelay();
            }, 2000);
        }
    };

    const handleGameEnd = () => {
        setGameEnded(true);
        setTimeout(() => {
            setGameOver(true);
        }, 3000);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const [resetSequence, setResetSequence] = useState(false);

    const resetRoundAfterDelay = () => {
        setPlayerChoice(null);
        setOpponentChoice(null);
        setTimer(5);
        setVisibleImage(0);
        setRound(prev => prev + 1);
        setResetSequence(!resetSequence);
    };

    return (
        <>
            {isLoadingPvp ? (
                <LoaderGif />
            ) : (
                <>
                    {gameEnded && <WinningScreen userName={userName} playerScore={playerScore} />}
                    <div className={styles.root}>
                    <div className={styles.container}>
                        <div className={styles.oppNickname}>
                            biggie smalls
                        </div>
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
                        <div className={styles.round}>
                            round {round}
                        </div>
                        <div className={styles.buttonSet}>
                            {/*<button className={playerChoice === 1 ? styles.paperBtnActive : styles.paperBtn} onClick={() => handlePlayerChoice(1)}></button>*/}
                            <PaperPVPbtn onClick={() => setPlayerChoice(1)} reset={resetSequence} />
                            {/*<button className={playerChoice === 0 ? styles.rockBtnActive : styles.rockBtn} onClick={() => handlePlayerChoice(0)}></button>*/}
                            <RockPvpBtn onClick={() => setPlayerChoice(0)} reset={resetSequence} />
                            {/*<button className={playerChoice === 2 ? styles.scicBtnActive : styles.scicBtn} onClick={() => handlePlayerChoice(2)}></button>*/}
                            <ScicPvpBtn onClick={() => setPlayerChoice(2)} reset={resetSequence} />
                        </div>
                    </div>
                </div>
                </>
            )}
        </>
    )
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
        {(score >= 3) ? (<LightOnSequence />) : <div className={styles.lampOff}></div>}
        {(score >= 2) ? (<LightOnSequence />) : <div className={styles.lampOff}></div>}
        {(score >= 1) ? (<LightOnSequence />) : <div className={styles.lampOff}></div>}
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

const LightOnSequence = () => {
    const initialImages = [
        scale000,
        scale001,
        scale002,
        scale003,
        scale004,
        scale005,
        scale006,
        scale007,
        scale008,
        scale009,
        scale010,
        scale011,
        scale012,
        scale013,
        scale014,
        scale015,
    ];
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        if (currentImage < (initialImages.length - 1)) {
            const interval = setInterval(() => {
                setCurrentImage((prevImage) => prevImage + 1);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [currentImage, initialImages.length]);
    return (
        <div className={styles.lampOnBg}>
            <img
                className={styles.lampOn}
                src={initialImages[currentImage]}
                alt="on"
            />
        </div>
    );
};







// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { gameOptions } from '../../mock/optionData';
// import { IconButton } from "../../components/buttons/icon-btn/IconButton.jsx";
// import {LoaderGif} from "../../components/loader/LoaderGif.jsx";
// import { useStartGameQuery, useSendAnswerMutation } from '../../store/gameSlice';
//
// import wins from '/wins.png';
// import start from '/public/game-icons/animation_hand_start.gif';
// import rockAnim from '/public/game-icons/animation_hand_rock.gif';
// import scisAnim from '/public/game-icons/animation_hand_sci.gif';
// import papAnim from '/public/game-icons/animation_hand_pap.gif';
//
// import teamData from '../../mock/teamsData.js';
//
// import styles from './PvpPage.module.scss';
//
// export const PvpPage = () => {
//     const navigate = useNavigate();
//     const profileId = localStorage.getItem('teamId');
//
//     const [sessionId, setSessionId] = useState(null);
//     const [visibleImage, setVisibleImage] = useState(0);
//     const [playerScore, setPlayerScore] = useState(0);
//     const [opponentScore, setOpponentScore] = useState(0);
//     const [gameOver, setGameOver] = useState(false);
//     const [round, setRound] = useState(1);
//     const [timer, setTimer] = useState(5);
//     const [playerChoice, setPlayerChoice] = useState(null);
//     const [opponentChoice, setOpponentChoice] = useState(3);
//     const [gameEnded, setGameEnded] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [opponentTeamId, setOpponentTeamId] = useState(() => Math.floor(Math.random() * 3) + 1);
//     const [userName, setUserName] = useState('you');
//
//     // Fetch session id by starting the game
//     const { data: startData, isFetching: isFetchingSession } = useStartGameQuery(profileId);
//     const [sendAnswer, { data: answerData }] = useSendAnswerMutation();
//
//     useEffect(() => {
//         if (startData) {
//             setSessionId(startData.sessionId);  // Получаем sessionId
//             setIsLoading(false);  // Отключаем лоадер, когда сессия готова
//         }
//     }, [startData]);
//
//     useEffect(() => {
//         let timerId;
//         if (!isLoading && timer > 0 && !gameOver) {
//             timerId = setTimeout(() => {
//                 setTimer(timer - 1);
//             }, 1000);
//         } else if (timer === 0 && playerChoice !== null) {
//             // Когда время вышло, отправляем ответ игрока на сервер
//             sendAnswer({ profileId, sessionId, answer: playerChoice });
//         }
//         return () => clearTimeout(timerId);
//     }, [timer, gameOver, playerChoice, isLoading]);
//
//     useEffect(() => {
//         if (answerData) {
//             const { player1, player2, result, victory } = answerData;
//             const opponentMove = player1.id !== profileId ? player1.answer : player2.answer;
//             const playerMove = player1.id === profileId ? player1.answer : player2.answer;
//
//             setOpponentChoice(opponentMove);
//             setPlayerChoice(playerMove);
//             showGifSequence();
//
//             setTimeout(() => {
//                 updateScores(playerMove, opponentMove, result);
//             }, 1000);
//         }
//     }, [answerData]);
//
//     const showGifSequence = () => {
//         const timeouts = [];
//         const durations = [0, 1000, 1000];
//         durations.forEach((duration, index) => {
//             timeouts.push(
//                 setTimeout(() => {
//                     setVisibleImage(index + 1);
//                 }, duration)
//             );
//         });
//         return () => timeouts.forEach(timeout => clearTimeout(timeout));
//     };
//
//     const handlePlayerChoice = (choice) => {
//         if (window.Telegram?.WebApp?.HapticFeedback) {
//             window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
//         }
//         if (gameOver || playerChoice !== null || isLoading) return;
//         setPlayerChoice(choice);
//     };
//
//     const updateScores = (playerMove, opponentMove, result) => {
//         if (result === 0) {
//             // Ничья — обновляем раунд сразу после анимации
//         } else if (result === 1) {
//             setPlayerScore(prev => {
//                 const newScore = prev + 1;
//                 if (newScore === 3) {
//                     setTimeout(() => handleGameEnd(), 3000);
//                 }
//                 return newScore;
//             });
//         } else if (result === 2) {
//             setOpponentScore(prev => {
//                 const newScore = prev + 1;
//                 if (newScore === 3) {
//                     setTimeout(() => handleGameEnd(), 3000);
//                 }
//                 return newScore;
//             });
//         }
//
//         if (!gameEnded) {
//             setTimeout(() => {
//                 resetRoundAfterDelay();
//             }, 2000);
//         }
//     };
//
//     const handleGameEnd = () => {
//         setGameEnded(true);
//         setTimeout(() => {
//             setGameOver(true);
//         }, 3000);
//         setTimeout(() => {
//             navigate('/');
//         }, 2000);
//     };
//
//     const resetRoundAfterDelay = () => {
//         setPlayerChoice(null);
//         setOpponentChoice(null);
//         setTimer(5);
//         setVisibleImage(0);
//         setRound(prev => prev + 1);
//     };
//
//     return (
//         <>
//             {isFetchingSession && <LoaderGif />}
//             {gameEnded && <WinningScreen userName={userName} playerScore={playerScore} />}
//             <div className={styles.root}>
//                 {/* Все остальное содержание */}
//             </div>
//         </>
//     );
// };
