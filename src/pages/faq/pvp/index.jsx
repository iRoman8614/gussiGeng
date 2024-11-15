import {useEffect, useState} from "react";
import { IconButton } from "../../../components/buttons/icon-btn/IconButton.jsx";
import {PvpBtn} from "../../../components/buttons/PvpBtn/PvpBtn";

import teamData from '../../../mock/teamsData.js';

import styles from './faqPvp.module.scss';
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const background = '/backgrounds/backalley.png'
const timerBG = '/timer.png'
const heart = '/game-icons/heart.png'
const cross = '/game-icons/lose.png'
const rock = '/game-icons/rock.png'
const paper = '/game-icons/paper.png'
const scis = '/game-icons/scissors.png'
const hand1 = '/faq/faqHand1.png'
const hand2 = '/faq/faqHand2.png'
const trio = '/faq/trio.png'

export const FaqPvpPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/lobby');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const nextSlide = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
        }
        if(slide === 6) {
            navigate('/lobby')
        } else {
            setSlide((prev) => prev + 1);
        }
    }

    const prevSlide = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
        }
        if(slide === 0) {
            return;
        } else {
            setSlide((prev) => prev - 1);
        }
    }

    const slideContent = [
        <div className={styles.slideContent1} key={'slideContent1'}>
            <div>{t('PVP.skill')}</div>
            <div><a className={styles.yellow}>{t('PVP.luck')}</a></div>
        </div>,
        <div className={styles.slideContent2} key={'slideContent2'}>
            <div>{t('PVP.this')} <a className={styles.yellow}>{t('PVP.opponent')}</a></div>
            <div>{t('PVP.this')} <a className={styles.green}>{t('PVP.you')}</a></div>
        </div>,
        <div className={styles.slideContent3} key={'slideContent3'}>
            <div>{t('PVP.hp')}</div>
            <div>{t('PVP.opphp')}</div>
        </div>,
        <div className={styles.slideContent4} key={'slideContent4'}>
            <div>{t('PVP.move')}</div>
        </div>,
        <div className={styles.slideContent5} key={'slideContent5'}>
            <div><a className={styles.green}>{t('PVP.time')}</a></div>
            <div><a className={styles.yellow}>{t('PVP.round')}</a></div>
        </div>,
        <div className={styles.slideContent6} key={'slideContent6'}>
            <div>{t('PVP.3wins.first')} <a className={styles.yellow}>{t('PVP.3wins.3')}</a> {t('PVP.3wins.wins')} <br/>
                {t('PVP.gl')}</div>
        </div>,
        <div className={styles.slideContent6} key={'slideContent7'}>
            <img src={trio} alt={''} width={200} height={180} />
        </div>
    ];

    // className={slide === 2 ? `${styles.item1} ${styles.visible}` : styles.item1}
    return (
        <>
            <div className={styles.root}>
                <img className={styles.background} src={background} width={300} height={1000} alt={'bg'} />
                <div className={styles.container}>
                    <div className={slide === 1 ? `${styles.oppNickname} ${styles.visible}` : styles.oppNickname}>{t('PVP.opp')}</div>
                    <div className={slide === 1 ? `${styles.optionBg} ${styles.visible}` : styles.optionBg}>
                        <img
                            width={90}
                            height={190}
                            className={styles.choose}
                            src={hand1}
                            alt="3"
                        />
                    </div>
                    <VictoryCounter score={3} slide={slide} />
                    <IconButton image={teamData[1].logo} alt={'gang'} />
                    <div className={slide === 4 ? `${styles.roundTimer} ${styles.visible}` : styles.roundTimer}>
                        <img src={timerBG} alt={'timer'} height={144} width={144} className={styles.roundTimerBG} />
                        <div className={styles.time}>5</div>
                    </div>
                    <IconButton image={teamData[2].logo} alt={'gang'} />
                    <VictoryCounter score={0} slide={slide} />
                    <div className={slide === 1 ? `${styles.optionBg} ${styles.visible}` : styles.optionBg}>
                        <img
                            width={90}
                            height={190}
                            className={styles.mychoose}
                            src={hand2}
                            alt="3"
                        />
                    </div>
                    <div className={slide === 1 ? `${styles.round2} ${styles.visible}` : (slide === 4 ? `${styles.round4} ${styles.visible}` : styles.round)}>
                        {slide === 1 ? `${t('PVP.your')}` : `${t('PVP.rounds')} 3`}
                    </div>
                    <div className={slide === 3 ? `${styles.buttonSet2} ${styles.visible}` : styles.buttonSet}>
                        <PvpBtn title={t('PVP.rock')} img={rock} value={1} />
                        <PvpBtn title={t('PVP.paper')} img={paper} value={2} />
                        <PvpBtn title={t('PVP.scissors')} img={scis} value={3} />
                    </div>
                </div>
            </div>
            <div className={slide === 0 ? styles.filter0 : styles.filter}>
                <div className={slide === 4 ? styles.tutorial4 : styles.tutorial}>
                    <div className={styles.col}>
                        <div className={styles.dot}>1</div>
                        <div className={styles.navLeft} onClick={prevSlide}>
                            <img src={'/gussiGeng/public/ArrowWhite.png'} alt={''} width={24} height={24} />
                        </div>
                        <div className={styles.dot}>1</div>
                    </div>
                    <div className={styles.caption}>
                        {slideContent[slide]}
                    </div>
                    <div className={styles.col}>
                        <div className={styles.dot}>1</div>
                        <div className={styles.navRight} onClick={nextSlide}>
                            <img src={'/gussiGeng/public/ArrowWhite.png'} alt={''} width={24} height={24} />
                        </div>
                        <div className={styles.pagination}>{slide+1}/7</div>
                    </div>
                </div>
            </div>
        </>
    )
}


// eslint-disable-next-line react/prop-types
const VictoryCounter = ({ score, slide }) => (
    <div className={slide === 2 ? `${styles.counter} ${styles.visible}` : styles.counter}>
        {(score >= 1) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
        {(score >= 2) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
        {(score >= 3) ? <img className={styles.heart} src={cross} alt={''} width={55} height={55}  /> : <img className={styles.heart} src={heart} alt={''} width={55} height={55}  />}
    </div>
);