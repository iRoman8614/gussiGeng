import {useEffect, useRef, useState} from "react";
import { Navigation, Controller } from 'swiper/modules';
import {ListItem} from "../../components/ListItem/ListItem";
import {useInit} from "../../context/InitContext.jsx";
import {useProfileStats, useProfileLeaders} from "../../utils/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import skinData from '../../mock/skinsData'
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Boards.module.scss'

const bg = '/gussiGeng/public/backgrounds/leaderboardBG.png'

export const BoardPage = () => {
    const navigate = useNavigate();
    const { groupId, updateContext } = useInit();
    const [activeIndex, setActiveIndex] = useState(0);

    const { fetchProfileStats, data: stats } = useProfileStats();
    const { data: leaderData } = useProfileLeaders(activeIndex + 1);

    useEffect(() => {
        fetchProfileStats()
        updateContext()
    }, []);

    const ligsLimits = ['10', '25', '50', '100', '250', '500', '1000']
    const length = stats?.victory / ligsLimits[activeIndex] * 100

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const ligsNames = [
        'associate',
        'street soldier',
        'hood hustler',
        'block boss',
        'capo',
        'syndicate kingpin',
        'seven',
    ]

    const swiperRef = useRef(null);
    const handleSlidePrev = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const handleSlideNext = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    return(
        <div className={styles.root}>
            <div className={styles.containerSwiper}>
                <Swiper
                    modules={[Navigation, Controller]}
                    spaceBetween={-3}
                    slidesPerView={3}
                    centeredSlides={true}
                    loop={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={handleSlideChange}
                    className={styles.swiper}
                >
                    {skinData[groupId]?.map((character, index) => (
                        <SwiperSlide
                            key={index}
                            className={index === activeIndex ? styles.activeSlide : styles.inactiveSlide}
                        >
                            <div className={index === activeIndex ? styles.activeSlideImageWrapper : styles.inactiveSlideImageWrapper}>
                                <img
                                    width={index === activeIndex ? 100 : 80}
                                    height={index === activeIndex ? 194 : 155}
                                    src={character.icon}
                                    alt={''}
                                    className={styles.icon}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.navigation}>
                <button className={styles.navLeft} onClick={handleSlidePrev}>
                    <img src={'/ArrowWhite.png'} alt={''} width={15} height={15} />
                </button>
                <div className={styles.caption}>
                    <span>{ligsNames[activeIndex]}</span>
                </div>
                <button className={styles.navRight} onClick={handleSlideNext}>
                    <img src={'/ArrowWhite.png'} alt={''} width={15} height={15} />
                </button>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{width: `${length}%`}}></div>
            </div>
            <div className={styles.winsCounter}>{`wins ${stats?.victory}/${ligsLimits[activeIndex]}+`}</div>
            <img src={bg} alt={''} className={styles.bg} width={450} height={1000} />
            <div className={styles.container}>
                {leaderData && leaderData.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Nobody has reached this league yet.</p>
                        <p>Be the first!</p>
                    </div>
                ) : leaderData ? (
                    leaderData.map((user, index) => (
                        <ListItem key={index} teamId={user.teamId} item={user} index={index + 1} />
                    ))
                ) : (
                    <div className={styles.emptyState}>Loading...</div>
                )}
            </div>
        </div>
    )
}
