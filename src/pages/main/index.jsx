
import {useEffect, useState} from "react";
import {IconButton} from "../../components/buttons/icon-btn/IconButton";
import {NavBar} from "../../components/nav-bar/NavBar";
import {CollectBar} from "../../components/bars/CollectBar";
import {useInit} from '../../context/InitContext.jsx';
import {useFarmCollect} from "../../utils/api";

import teamData from "../../mock/teamsData.js";
import skinData from '../../mock/skinsData'

import styles from "./Home.module.scss";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const account = "/main-buttons/account.png";
const settings = "/main-buttons/settings.png";
const boards = "/main-buttons/boards.png";
const wallet = "/main-buttons/wallet.png";
const claim = '/claimBTN.png'
const border = '/totalbar.png'
const claimClicked = '/claimBTNclicked.png'
const background = '/backgrounds/nightcity.png'

export const HomePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { groupId, liga, rate, limit, updateContext, coins } = useInit();
    const [balance, setBalance] = useState(0)
    const [currentFarmCoins, setCurrentFarmCoins] = useState(0);
    const [startFarmTime, setStartFarmTime] = useState(Date.now());
    const [isClaimClicked, setIsClaimClicked] = useState(false);

    const { collectAndStart } = useFarmCollect();

    useEffect(() => {
        updateContext();
        if (typeof window !== "undefined") {
            const start = JSON.parse(localStorage.getItem("farm"));
            if (start) {
                setBalance(start.coins)
            } else {
                setBalance(coins)
            }
            const startTime = localStorage.getItem("startTime")
            if(startTime) {
                setStartFarmTime(new Date(startTime).getTime());
            }
        }
    }, [balance, startFarmTime, isClaimClicked, coins]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const interval = setInterval(() => {
                const secondsPassed = Math.floor((Date.now() - startFarmTime) / 1000);
                const accumulatedCoins = Math.min(rate * secondsPassed, limit);
                setCurrentFarmCoins(accumulatedCoins);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [rate, startFarmTime, limit]);

    const handleClaimClick = async () => {
        try {
            if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
            }
            const collectData = await collectAndStart();
            const updatedBalance = collectData.totalCoins;
            setBalance(updatedBalance);
            setCurrentFarmCoins(0)
            const farm = JSON.parse(localStorage.getItem('farm')) || {}
            const updatedFarmData = {
                ...farm,
                coins: updatedBalance,
                farmRate: collectData.rate,
                farmLimit: limit,
            };
            localStorage.setItem('farm', JSON.stringify(updatedFarmData));
            triggerClaimAnimation()
            updateContext();
        } catch (error) {
            console.error("Ошибка при сборе монет:", error);
        }
    };

    let claimTimeout;
    const triggerClaimAnimation = () => {
        setIsClaimClicked(true);
        claimTimeout = setTimeout(() => {
            setIsClaimClicked(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (claimTimeout) {
                clearTimeout(claimTimeout);
            }
        };
    }, [])

    function formatNumberFromEnd(num) {
        if (isNaN(num) || typeof num !== 'number') {
            return '10800';
        }
        return Math.round(num).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    function formatNumberFromEndDot(num) {
        if (typeof num !== 'number') {
            return '0';
        }
        if (num < 100) {
            return num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
        } else {
            return Math.floor(num).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
        }
    }

    const maxWidth = 224;
    const currentWidth = (currentFarmCoins / limit) * maxWidth;

    return (
        <div className={styles.root}>
            <img className={styles.background} src={background} width={300} height={1000}  alt={'bg'}/>
            <div className={styles.item1}>
                <IconButton image={account} alt={'account'} title={t('main.account')}  onClick={() => {navigate('/account')}}/>
            </div>
            <div className={styles.item2}>
                <IconButton image={teamData[groupId]?.logo} alt={'gang'} onClick={() => {navigate('/change')}}/>
            </div>
            <div className={styles.item3}>
                <IconButton image={settings} alt={'settings'} title={t('main.settings')} onClick={() => {navigate('/settings');}}/>
            </div>
            <div className={styles.item4}>
                <IconButton image={boards} alt={'boards'} title={t('main.boards')} onClick={() => {navigate('/boards');}}/>
            </div>
            <div className={styles.item5}>
                <img src={border} width={600} height={200} alt={'border'} className={styles.totalBarRoot}/>
                <div className={styles.totalText}>{formatNumberFromEnd(balance)}</div>
            </div>
            <div className={styles.item6}>
                <IconButton image={wallet} alt={'wallet'} title={t('main.wallet')} hidden={true} onClick={() => {navigate('/getRandom')}}/>
            </div>
            <div className={styles.item7}>
                <img width={1000} height={1000} className={styles.char} alt={'character'} src={skinData[groupId]?.[liga]?.icon}/>
            </div>
            <div className={styles.item8}>
                <CollectBar
                    currentCoins={formatNumberFromEndDot(currentFarmCoins < 0 ? 0 : currentFarmCoins)}
                    maxCoins={formatNumberFromEnd(Number(limit))}
                    width={currentWidth}
                />
            </div>
            <div className={styles.item9}>
                <img className={styles.claimRoot} width={600} height={200} src={isClaimClicked ? claimClicked : claim} onClick={handleClaimClick} alt={'claim'} />
            </div>
            <div className={styles.item10}>
                <NavBar/>
            </div>
        </div>
    );
}
