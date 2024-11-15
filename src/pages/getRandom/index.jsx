import {useEffect, useState} from "react";
import {useInit} from "../../context/InitContext.jsx";
import gangs from '../../mock/teamsData';

import styles from './Random.module.scss';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const bg = '/backgrounds/randomBG.png';
const person = '/random/person.png';
const hand = '/random/hand.png';
const dialog = '/random/dialog.png';
const dialog2 = '/random/dialog2.png';
const oneCard = '/random/oneCard.png';

export const RandomPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { groupId } = useInit();
    const [clickCount1, setClickCount1] = useState(0);
    const [clickCount2, setClickCount2] = useState(0);
    const [clickCount3, setClickCount3] = useState(0);
    const [clickCount4, setClickCount4] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [showFrase, setShowFrase] = useState(0);

    const getBoxShadowColor = (groupId) => {
        switch (groupId) {
            case 1:
                return 'rgba(0,167,0)';
            case 2:
                return 'rgba(22,67,235)';
            case 3:
                return 'rgba(252,192,46)';
            case 4:
                return 'rgba(199,21,22)';
            default:
                return 'rgba(0, 0, 0, 0)';
        }
    };

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    // eslint-disable-next-line react/prop-types
    const ShownCard = ({state, groupId}) => {
        const greenCard = '/random/greenCard.png';
        const blueCard = '/random/blueCard.png';
        const yellowCard = '/random/yellowCard.png';
        const redCard = '/random/redCard.png';

        const cardSrc = groupId === 1 ? greenCard : groupId === 2 ? blueCard : groupId === 3 ? yellowCard : redCard;

        return (
            <img
                className={state ? styles.cardImage : styles.hidden}
                style={{ boxShadow: `0 0 20px 10px ${getBoxShadowColor(groupId)}` }}
                src={cardSrc}
                alt=""
                width={200}
                height={340}
            />
        );
    };

    const handleClick1 = () => {
        if (clickCount1 === 0) {
            setClickCount1(1);
            setClickCount2(0);
            setClickCount3(0);
            setClickCount4(0);
            setShowFrase(1);
        } else if (clickCount1 === 1) {
            setClickCount1(2);
            setShowCard(true);
            setShowFrase(2);
        }
    };

    const handleClick2 = () => {
        if (clickCount2 === 0) {
            setClickCount2(1);
            setClickCount1(0);
            setClickCount3(0);
            setClickCount4(0);
            setShowFrase(1);
        } else if (clickCount2 === 1) {
            setClickCount2(2);
            setShowCard(true);
            setShowFrase(2);
        }
    };

    const handleClick3 = () => {
        if (clickCount3 === 0) {
            setClickCount3(1);
            setClickCount2(0);
            setClickCount1(0);
            setClickCount4(0);
            setShowFrase(1);
        } else if (clickCount3 === 1) {
            setClickCount3(2);
            setShowCard(true);
            setShowFrase(2);
        }
    };

    const handleClick4 = () => {
        if (clickCount4 === 0) {
            setClickCount4(1);
            setClickCount2(0);
            setClickCount3(0);
            setClickCount1(0);
            setShowFrase(1);
        } else if (clickCount4 === 1) {
            setClickCount4(2);
            setShowCard(true);
            setShowFrase(2);
        }
    };

    return (
        <div className={styles.root}>
            <img className={styles.bg} src={bg} alt="bg" width={450} height={1000} />
            {showFrase === 0 && (
                <div className={styles.dialog}>
                    <img src={dialog} className={styles.dialogImage} width={200} height={100} alt="" />
                    <div className={styles.text}>{t('random.pick')}</div>
                </div>
            )}
            {showFrase === 1 && (
                <div className={styles.dialog}>
                    <img src={dialog} className={styles.dialogImage} width={200} height={100} alt="" />
                    <div className={styles.text3}>{t('random.tap')}</div>
                </div>
            )}
            {showFrase === 2 && (
                <div className={styles.dialog}>
                    <img src={dialog2} className={styles.dialog2Image} width={200} height={100} alt="" />
                    <div className={styles.text2}>
                        {t('random.member')} <a className={styles.gang}>{gangs[groupId]?.Name}</a> {t('random.gang')}
                    </div>
                </div>
            )}
            <img src={person} className={styles.person} width={450} height={1000} alt="" />
            <div className={styles.cardSet}>
                <img
                    src={oneCard}
                    alt=""
                    width={100}
                    height={155}
                    style={clickCount1 > 0 ? { boxShadow: `0 0 20px 10px #FF9740` } : {}}
                    className={
                        clickCount1 === 0
                            ? styles.oneCard1
                            : clickCount1 === 1
                                ? styles.oneCard1FirstClick
                                : styles.oneCard1SecondClick
                    }
                    onClick={handleClick1}
                />
                <img
                    src={oneCard}
                    alt=""
                    width={100}
                    height={155}
                    style={clickCount2 > 0 ? { boxShadow: `0 0 20px 10px #FF9740` } : {}}
                    className={
                        clickCount2 === 0
                            ? styles.oneCard2
                            : clickCount2 === 1
                                ? styles.oneCard2FirstClick
                                : styles.oneCard2SecondClick
                    }
                    onClick={handleClick2}
                />
                <img
                    src={oneCard}
                    alt=""
                    width={100}
                    height={155}
                    style={clickCount3 > 0 ? { boxShadow: `0 0 20px 10px #FF9740` } : {}}
                    className={
                        clickCount3 === 0
                            ? styles.oneCard3
                            : clickCount3 === 1
                                ? styles.oneCard3FirstClick
                                : styles.oneCard3SecondClick
                    }
                    onClick={handleClick3}
                />
                <img
                    src={oneCard}
                    alt=""
                    width={100}
                    height={155}
                    style={clickCount4 > 0 ? { boxShadow: `0 0 20px 10px #FF9740` } : {}}
                    className={
                        clickCount4 === 0
                            ? styles.oneCard4
                            : clickCount4 === 1
                                ? styles.oneCard4FirstClick
                                : styles.oneCard4SecondClick
                    }
                    onClick={handleClick4}
                />
            </div>
            <img src={hand} className={styles.hand} width={450} height={1000} alt="" />
            <ShownCard state={showCard} groupId={groupId} />
            {showFrase === 2 && (
                <button className={styles.btn} onClick={() => navigate('/faq/home')}>
                    {t('random.continue')}
                </button>
            )}
        </div>
    );
};
