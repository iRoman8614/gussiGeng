import {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import {useInit} from "../../context/InitContext.jsx";
import {useUpdateGroup} from "../../utils/api";
import teamData from '../../mock/teamsData'
import { useNavigate } from 'react-router-dom';

import styles from './Change.module.scss'
import {useTranslation} from "react-i18next";

const bg = '/backgrounds/randomBG.png'
const dialog = '/random/dialog.png'
const person = '/random/person.png'
const hand = '/random/hand.png'
const money = '/money.png'

export const ChangePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { groupId, coins, updateContext } = useInit();
    const[showPopUp, setShowPopUp] = useState(false)
    const[choose, setChoose] = useState(null)

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const { updateGroupData, data: updatedGroup, loading, error } = useUpdateGroup();

    const userTeam = groupId
    const cards = [
        {
            id: 1,
            logo: '/gussiGeng/public/random/greenCard.png'
        },
        {
            id: 2,
            logo: '/gussiGeng/public/random/blueCard.png'
        },
        {
            id: 3,
            logo: '/gussiGeng/public/random/yellowCard.png'
        },
        {
            id: 4,
            logo: '/gussiGeng/public/random/redCard.png'
        }
    ]

    const availableTeams = cards.filter(card => card.id !== userTeam);
    const handleClick = (num) => {
        setChoose(num)
        setShowPopUp(true)
    }

    const closePopUp = () => {
        setShowPopUp(false)
    }
    const changeClan = async () => {
        if (coins < 1000000) {
            toast.error(t('change.noMoney'));
            return;
        }
        try {
            await updateGroupData(choose);
            if (loading) return;
            if (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("You can change your clan only once every 5 days");
                    return;
                }
                toast.error("Error during clan change");
                return;
            }
            if (updatedGroup) {
                toast.success("Clan changed successfully");
                updateContext();
                navigate('/main');
            }
        } catch (error) {
            toast.error("Error while changing clan");
        }
    };

    return(
        <div className={styles.root}>
            <img className={styles.bg} src={bg} alt={''} width={450} height={968} />
            <div className={styles.container}>
                <div className={styles.dialog}>
                    <img className={styles.dialogImage} src={dialog} alt={''} width={240} height={120} />
                    <div className={styles.dialogText}>{t('change.destiny')}</div>
                </div>
                <img className={styles.person} src={person} alt={''} width={450} height={968} />
                <div className={styles.cardSet}>
                    {availableTeams.map((team, index) => {
                        const cardClass = styles[`oneCard${index + 1}`];
                        return(
                            <img
                                key={index}
                                src={team?.logo}
                                alt={''}
                                width={100}
                                height={155}
                                className={
                                    cardClass
                                }
                                onClick={() => handleClick(team.id)}
                            />
                        )
                    })}
                </div>
                <img className={styles.hand} src={hand} alt={''} width={450} height={404} />
                <img className={styles.myClan} src={cards[userTeam-1]?.logo} alt={''} width={200} height={340} />
            </div>
            {showPopUp && <div className={styles.popUp}>
                <div className={styles.popUpTitle}>{t('change.sure')}</div>
                <div className={styles.popUpClose} onClick={closePopUp}>x</div>
                <div className={styles.popUpContainer}>
                    <div className={styles.popUpLabel}>{t('change.join')} <p>&quot;{teamData[choose].Name}&quot;?</p></div>
                    <img className={styles.popUpIcon} src={teamData[choose]?.logo} alt={''} width={100} height={100}/>
                    <div className={styles.popUpSum}>
                        - 1 000 000
                        {' '}<img src={money} alt={''} width={21} height={21}/>
                    </div>
                </div>
                <button className={styles.popUpConfirm} onClick={changeClan}>{t('change.confirm')}</button>
            </div>}
        </div>
    )
}
