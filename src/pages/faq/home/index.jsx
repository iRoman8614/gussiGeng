import {useEffect, useState} from "react";
import {FaqIconButton} from "../../../components/buttons/icon-btn/FaqIconButton";
import {CollectBar} from "../../../components/bars/CollectBar";
import teamData from "../../../mock/teamsData.js";
import skinData from '../../../mock/skinsData'
import styles from "./faqHome.module.scss";
import {BigButton} from "../../../components/buttons/big-btn/BigButton";
import { useInit } from '../../../context/InitContext.jsx';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const account = "/main-buttons/account.png";
const settings = "/main-buttons/settings.png";
const boards = "/main-buttons/boards.png";
const wallet = "/main-buttons/wallet.png";
const claim = '/claimBTN.png'
const border = '/totalbar.png'
const background = '/backgrounds/nightcity.png'
const upgrades = '/main-buttons/upgrades.png';
const hands = '/main-buttons/hands.png';
const friends = '/main-buttons/friends.png';
const bag = '/main-buttons/bag.png';
const FAQ = '/main-buttons/FAQ.png'

export const FaqHomePage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [slide, setSlide] = useState(0)
    const { groupId, liga } = useInit();

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);
    function formatNumberFromEnd(num) {
        if (isNaN(num) || typeof num !== 'number') {
            return '10800';
        }
        return Math.round(num).toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    const nextSlide = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
        }
        if(slide === 6) {
            navigate('/main')
        } else {
            setSlide((prev) => prev + 1);
        }
    }

    const prevSlide = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
        }
        if(slide === 0) {
            return
        } else {
            setSlide((prev) => prev - 1);
        }
    }

    const slideContent = [
        <div className={styles.slideContent1} key={'slideContent1'}>
            <div>{t('FAQ.1.current')} <br/><a className={styles.green}>{t('FAQ.1.balance')}</a></div>
            <div>{t('FAQ.1.farmPool')} <a className={styles.yellow}> {t('FAQ.1.pool')}</a> {t('FAQ.1.end')}</div>
        </div>,
        <div className={styles.slideContent2} key={'slideContent2'}>
            <div>{t('FAQ.2.btn')} <a className={styles.yellow}>{t('FAQ.2.claim')}</a>{t('FAQ.2.money')} <a className={styles.yellow}>{t('FAQ.2.farm')}</a> {t('FAQ.2.add')} <a className={styles.green}>{t('FAQ.2.balance')}</a> </div>
        </div>,
        <div className={styles.slideContent3} key={'slideContent3'}>
            <div><a className={styles.green}>{t('FAQ.3.account')}</a> - {t('FAQ.3.check')}</div>
            <div><a className={styles.green}>{t('FAQ.3.gl')}</a> - {t('FAQ.3.swap')}</div>
            <div><a className={styles.green}>{t('FAQ.3.settings')}</a> - {t('FAQ.3.change')}</div>
        </div>,
        <div className={styles.slideContent4} key={'slideContent4'}>
            <div><a className={styles.green}>{t('FAQ.4.boards')}</a> - {t('FAQ.4.check')}</div>
            <div><a className={styles.yellow}>{t('FAQ.4.wallet')}</a> - {t('FAQ.4.link')}</div>
        </div>,
        <div className={styles.slideContent5} key={'slideContent5'}>
            <div>{t('FAQ.5.pvp')} <a className={styles.yellow}>{t('FAQ.5.battle')}</a> {t('FAQ.5.way')} <a className={styles.yellow}>{t('FAQ.5.ranks')}</a> {t('FAQ.5.test')} <a className={styles.yellow}>{t('FAQ.5.ton')}</a> {t('FAQ.5.soon')}</div>
        </div>,
        <div className={styles.slideContent6} key={'slideContent6'}>
            <div>
                {t('FAQ.6.items')} <a className={styles.yellow}>{t('FAQ.6.ava')}</a> {t('FAQ.6.earned')}
            </div>
            <div>
                {t('FAQ.6.exp')} <a className={styles.yellow}>{t('FAQ.6.rate')}</a> {t('FAQ.6.and')} <a className={styles.green}>{t('FAQ.6.limit')}</a></div>
        </div>,
        <div className={styles.slideContent7} key={'slideContent7'}>
            <div>{t('FAQ.7.friends')} <a className={styles.yellow}>{t('FAQ.7.invite')}</a> {t('FAQ.7.yur')} <a className={styles.green}>{t('FAQ.7.gain')}</a> {t('FAQ.7.bonuses')}</div>
            <div>{t('FAQ.7.faq')}</div>
        </div>
    ];

    return (
        <>
            <div className={styles.root}>
                <img className={styles.background} src={background} width={300} height={1000}  alt={'bg'}/>
                <div className={slide === 2 ? `${styles.item1} ${styles.visible}` : styles.item1}>
                    <FaqIconButton image={account} alt={'account'} title={'account'} />
                </div>
                <div className={slide === 2 ? `${styles.item2} ${styles.visible}` : styles.item2}>
                    <FaqIconButton image={teamData[groupId]?.logo} alt={'gang'}/>
                </div>
                <div className={slide === 2 ? `${styles.item3} ${styles.visible}` : styles.item3}>
                    <FaqIconButton image={settings} alt={'settings'} title={'settings'} />
                </div>
                <div className={slide === 3 ? `${styles.item4} ${styles.visible}` : styles.item4}>
                    <FaqIconButton image={boards} alt={'boards'} title={'board'} />
                </div>
                <div className={slide === 0 ? `${styles.item5} ${styles.visible}` : styles.item5}>
                    <img src={border} width={600} height={200} alt={'border'} className={styles.totalBarRoot}/>
                    <div className={styles.totalText}>525 000 000</div>
                </div>
                <div className={slide === 3 ? `${styles.item6} ${styles.visible}` : styles.item6}>
                    <FaqIconButton image={wallet} alt={'wallet'} title={'wallet'} />
                </div>
                <div className={styles.item7}>
                    <img width={1000} height={1000} className={styles.char} alt={'character'} src={skinData[groupId]?.[liga]?.icon}/>
                </div>
                <div className={slide === 0 ? `${styles.item8} ${styles.visible}` : styles.item8}>
                    <CollectBar
                        currentCoins={formatNumberFromEnd(7250)}
                        maxCoins={formatNumberFromEnd(35000)}
                        width={60}
                    />
                </div>
                <div className={slide === 1 ? `${styles.item9} ${styles.visible}` : styles.item9}>
                    <img className={styles.claimRoot} width={600} height={200} src={claim} alt={'claim'} />
                </div>
                <div className={slide === 5 ? `${styles.item10} ${styles.visible}` : styles.item10}><FaqIconButton image={bag} alt={'items'} title={'items'} /></div>
                <div className={slide === 5 ? `${styles.item11} ${styles.visible}` : styles.item11}><FaqIconButton image={upgrades} alt={'upgrades'} title={'exp'} /></div>
                <div className={slide === 4 ? `${styles.item12} ${styles.visible}` : styles.item12}><BigButton image={hands} alt={'pvp'} title={'pvp'} /></div>
                <div className={slide === 6 ? `${styles.item13} ${styles.visible}` : styles.item13}><FaqIconButton image={friends} alt={'friends'} title={'friends'} /></div>
                <div className={slide === 6 ? `${styles.item14} ${styles.visible}` : styles.item14}><FaqIconButton image={FAQ} alt={'home'} title={'FAQ'} /></div>
            </div>
            <div className={styles.filter}>
                <div className={styles.tutorial}>
                    <div className={styles.col}>
                        <div className={styles.dot}>.</div>
                        <div className={styles.navLeft} onClick={prevSlide}>
                            <img src={'/gussiGeng/public/ArrowWhite.png'} alt={''} width={24} height={24} />
                        </div>
                        <div className={styles.dot}>.</div>
                    </div>
                    <div className={styles.caption}>
                        {slideContent[slide]}
                    </div>
                    <div className={styles.col}>
                        <div className={styles.dot}>.</div>
                        <div className={styles.navRight} onClick={nextSlide}>
                            <img src={'/gussiGeng/public/ArrowWhite.png'} alt={''} width={24} height={24} />
                        </div>
                        <div className={styles.pagination}>{slide+1}/7</div>
                    </div>
                </div>
            </div>
        </>
    );
}
