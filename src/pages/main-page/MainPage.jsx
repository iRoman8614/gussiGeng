import {useEffect, useState} from "react";
import {IconButton} from "../../components/buttons/icon-btn/IconButton.jsx";
import {NavBar} from "../../components/nav-bar/NavBar.jsx";
import {CollectBar} from "../../components/bars/collect-bar/CollectBar.jsx";

import account from "/main-buttons/account.png";
import settings from "/main-buttons/settings.png";
import boards from "/main-buttons/boards.png";
import wallet from "/main-buttons/wallet.png";
import claim from '/claimBTN.png'
import purpleChar from '/characters/purpleChar.png'
import border from '/totalbar.png'
import claimClicked from '/claimBTNclicked.png'

import teamData from "../../mock/teamsData.js";

import styles from './MainPage.module.scss'


export const MainPage = () => {
    const [totalCoins, setTotalCoins] = useState(0);
    const [currentFarmCoins, setCurrentFarmCoins] = useState(0);
    const [rate, setRate] = useState(3);
    const [startFarmTime, setStartFarmTime] = useState(Date.now());
    const [teamId, setTeamId] = useState(1)
    const [isClaimClicked, setIsClaimClicked] = useState(false);

    useEffect(() => {
        const savedTeamId = localStorage.getItem('teamId') || Math.floor(Math.random() * 4) + 1;
        const savedTotalCoins = localStorage.getItem('totalCoins') || 0;
        const savedRate = localStorage.getItem('rate') || 3;
        const savedStartFarmTime = localStorage.getItem('startFarmTime') || Date.now();

        setTeamId(savedTeamId)

        setTotalCoins(parseInt(savedTotalCoins));
        setRate(parseInt(savedRate));
        setStartFarmTime(parseInt(savedStartFarmTime));

        localStorage.setItem('teamId', savedTeamId);
        localStorage.setItem('totalCoins', savedTotalCoins);
        localStorage.setItem('rate', savedRate);
        localStorage.setItem('startFarmTime', savedStartFarmTime);
    }, []);

    // Логика накопления монет
    useEffect(() => {
        const now = Date.now();
        const secondsPassed = Math.floor((now - startFarmTime) / 1000);
        const accumulatedCoins = Math.min(rate * secondsPassed, 3500);
        setCurrentFarmCoins(accumulatedCoins);
    }, [rate, startFarmTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const secondsPassed = Math.floor((now - startFarmTime) / 1000);
            const accumulatedCoins = Math.min(rate * secondsPassed, 3500);

            setCurrentFarmCoins(accumulatedCoins);
        }, 1000);

        return () => clearInterval(interval);
    }, [rate, startFarmTime]);

    const handleClaimClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        }
        const newTotalCoins = totalCoins + currentFarmCoins;
        const newStartTime = Date.now();
        setTotalCoins(newTotalCoins);
        setCurrentFarmCoins(0);
        setStartFarmTime(newStartTime);
        setIsClaimClicked(true);
        localStorage.setItem('totalCoins', newTotalCoins);
        localStorage.setItem('startFarmTime', newStartTime);

        setTimeout(() => {
            setIsClaimClicked(false);
        }, 500);
    };
    const total = localStorage.getItem('totalCoins')

    return (
        <div className={styles.root}>
            <div className={styles.item1}>
                <IconButton image={account} alt={'account'} title={'account'}/>
            </div>
            <div className={styles.item2}>
                <IconButton image={teamData[teamId].logo} alt={'gang'}/>
            </div>
            <div className={styles.item3}>
                <IconButton image={settings} alt={'settings'} title={'settings'}/>
            </div>
            <div className={styles.item4}>
                <IconButton image={boards} alt={'boards'} title={'board'}/>
            </div>
            <div className={styles.item5}>
                <img src={border} alt={'border'} className={styles.totalBarRoot}/>
                <div className={styles.totalText}>{total}</div>
            </div>
            <div className={styles.item6}>
                <IconButton image={wallet} alt={'wallet'} title={'wallet'}/>
            </div>
            <div className={styles.item7}>
                <img className={styles.char} alt={'character'} src={purpleChar}/>
            </div>
            <div className={styles.item8}>
                <CollectBar currentCoins={currentFarmCoins} maxCoins={3500} />
            </div>
            <div className={styles.item9}>
                <img className={styles.claimRoot} src={isClaimClicked ? claimClicked : claim} alt={'claim'} onClick={handleClaimClick}/>
            </div>
            <div className={styles.item10}>
                <NavBar/>
            </div>
        </div>
    )
}