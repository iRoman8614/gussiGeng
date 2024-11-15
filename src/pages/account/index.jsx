import {useEffect, useState} from "react";
import { useInit } from '../../context/InitContext.jsx';
import { useProfileStats, useMyInvitees } from '../../utils/api';
import skinData from '../../mock/skinsData'
import teamData from "../../mock/teamsData";
import { useNavigate } from 'react-router-dom';

import styles from './Account.module.scss'
import {useTranslation} from "react-i18next";

const money = '/money.png'

export const AccountPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { groupId, liga, dailyEntries, coins, totalCoins, updateContext } = useInit();
    const [activeTab, setActiveTab] = useState(1);
    const [userName, setUserName] = useState(null);

    const { fetchProfileStats, data: stats } = useProfileStats();
    const { data: friends } = useMyInvitees();

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/home');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    useEffect(() => {
        fetchProfileStats()
        updateContext()
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const search = window.Telegram.WebApp.initData;
            const urlParams = new URLSearchParams(search);
            const userParam = urlParams.get('user');

            if (userParam) {
                const decodedUserParam = decodeURIComponent(userParam);
                const userObject = JSON.parse(decodedUserParam);
                setUserName(userObject.username);
            }
        }

    }, []);

    function formatNumberFromEnd(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    const handleTab = (tab) => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        setActiveTab(tab)
    }

    return(
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.seasonBlock}>
                    <div className={styles.season}>
                        {t('account.season')} <br/><br />
                        {userName}
                    </div>
                    <div className={styles.avatarContainer}>
                        <img className={styles.logo} src={teamData[groupId]?.logo} alt={''} />
                        <img className={styles.character} src={skinData[groupId]?.[liga]?.icon} alt={''} />
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.buttonSet}>
                        <div className={styles.folderBtnStats}
                             style={{
                                 zIndex: activeTab === 1 ? 112 : 110,
                                 marginBottom:  activeTab === 1 ? '0px' : '-12px',
                                 borderRight:  activeTab === 1 ? '2px solid #3842a4' : 'none',
                             }}
                             onClick={() => handleTab(1)}
                        >{t('account.stats')}</div>
                        {/*<div*/}
                        {/*    className={styles.folderBtnSkins}*/}
                        {/*    style={{*/}
                        {/*        zIndex: activeTab === 2 ? 113 : 110,*/}
                        {/*        marginBottom:  activeTab === 2 ? '-0px' : '2px',*/}
                        {/*    }}*/}
                        {/*    onClick={() => handleTab(2)}*/}
                        {/*>skins</div>*/}
                    </div>
                    {activeTab === 1 &&<div className={styles.personalContainer}>
                        <div className={styles.stats}>
                            <div className={styles.nickname}>{t('account.league')} {stats?.liga}</div>
                            <div className={styles.stat}>
                                {t('account.total')} <p>{stats?.count}</p>
                            </div>
                            <div className={styles.stat}>
                                {t('account.wins')} <p>{stats?.victory}</p>
                            </div>
                            <div className={styles.stat}>
                                {t('account.defeats')} <p>{stats?.lost}</p>
                            </div>
                            <div className={styles.stat}>
                                {t('account.winRate')} <p>{stats?.count === 0 ? '0%' : `${((stats?.victory / stats?.count) * 100).toFixed(2)}%`}</p>
                            </div>
                        </div>
                        <div className={styles.barBlock}>
                            <div className={styles.barItem}>{t('account.Total')}</div>
                            <div className={styles.barItemStats}>{formatNumberFromEnd(totalCoins)}</div>
                            {/*<div className={styles.barItem}>total skins owned</div>*/}
                            {/*<div className={styles.barItemStats}>1/11</div>*/}
                            <div className={styles.barItem}>{t('account.friends')}</div>
                            <div className={styles.barItemStats}>{friends.length}</div>
                            <div className={styles.barItem}>{t('account.login')}</div>
                            <div className={styles.barItemStats}>{dailyEntries}</div>
                        </div>
                        <div>
                            <div className={styles.barItem}>{t('account.balance')}</div>
                            <div className={styles.balance}>{formatNumberFromEnd(coins)}{' '}<img src={money} alt={''} /></div>
                        </div>
                    </div>}
                    {/*{activeTab === 2 && <div className={styles.skinContainer}>*/}
                    {/*    <div className={styles.list}>*/}
                    {/*        <ItemPlaceholder />*/}
                    {/*    </div>*/}
                    {/*</div>}*/}
                </div>
            </div>
        </div>
    )
}