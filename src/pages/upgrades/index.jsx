
import {useEffect, useRef, useState} from 'react';
import {ItemPlaceholder} from "../../components/itemPlaceholder/ItemPlaceholder";
import {TaskBtn} from "../../components/taskBtn/TaskBtn";
import axiosInstance from '../../utils/axios';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/controller';
import styles from './Upgrades.module.scss'
import {Controller, Navigation} from "swiper/modules";
import {toast} from "react-toastify";
import {useInit} from "../../context/InitContext.jsx";
import {useFarmCollect} from "../../utils/api";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const money = '/money.png'

export const UpgradesPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { coins, updateContext, limit, rate, setRate, setLimit, setCoins } = useInit();
    const { tab } = navigate;
    const [activeTab, setActiveTab] = useState(tab || '1');
    const { collectAndStart } = useFarmCollect();

    const swiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [limitLevels, setLimitLevels] = useState([]);
    const [rateLevels, setRateLevels] = useState([]);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tasks, setTasks] = useState([]);

    const sliderImages = [
        '/upgradesCards/slider/rateSlide.png',
        '/upgradesCards/slider/limitSlide.png',
    ]

    const rateImages = [
        '/upgradesCards/rate/rate1.png',
        '/upgradesCards/rate/rate2.png',
        '/upgradesCards/rate/rate3.png',
        '/upgradesCards/rate/rate4.png',
        '/upgradesCards/rate/rate5.png'
    ]

    const limitImages = [
        '/upgradesCards/limit/limit1.png',
        '/upgradesCards/limit/limit2.png',
        '/upgradesCards/limit/limit3.png',
        '/upgradesCards/limit/limit4.png',
        '/upgradesCards/limit/limit5.png'
    ]

    const upgradesList = [
        t('EXP.speeds'),
        t('EXP.limits')
    ]

    useEffect(() => {
        const start = JSON.parse(localStorage.getItem("start"));
        if (start) {
            setRate(start.rate);
            setLimit(start.limit);
        }
    }, []);

    useEffect(() => {
        updateContext()
    }, [rate, limit])

    useEffect(() => {
        const fetchTasksAndFriends = async () => {
            try {
                const statsResponse = await axiosInstance.get('/profile/stats');
                const stats = statsResponse.data;
                const friendsResponse = await axiosInstance.get('/profile/my-invitees');
                const numFriends = friendsResponse.data.length;
                const tasksResponse = await axiosInstance.get('/task/all');
                let tasks = tasksResponse.data;
                const completedTasksResponse = await axiosInstance.get('/task/completed-tasks');
                const completedTasks = completedTasksResponse.data.map(task => task.task.id);
                const lastCompletedTaskIdType1 = Math.max(0, ...tasks.filter(task => task.type === 1 && completedTasks.includes(task.id)).map(task => task.id));
                tasks = tasks.map(task => {
                    const isCompleted = completedTasks.includes(task.id);
                    let readyToComplete = false;
                    let icon = '';
                    if (task.type === 1 && numFriends >= task.amount && !isCompleted) {
                        readyToComplete = true;
                    }
                    if (task.type === 3 && stats.victory >= task.amount && !isCompleted) {
                        readyToComplete = true;
                    }
                    if (task.type === 2) {
                        icon = task.name.includes("TG") ? "tg" : task.name.includes("X") ? "x" : '';
                    }
                    const isVisible = task.type === 1 ? task.id <= lastCompletedTaskIdType1 + 1 : true;
                    return {
                        ...task,
                        name: mapTaskName(task.name),
                        current: task.type === 1 ? numFriends : stats.victory,
                        completed: isCompleted,
                        path: task.type === 1 ? '/friends' : '/lobby',
                        visible: isVisible,
                        readyToComplete: readyToComplete,
                        icon: icon,
                    };
                });

                setTasks(tasks.filter(task => task.visible));
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchTasksAndFriends();
    }, []);

    const mapTaskName = (originalName) => {
        if (originalName.includes("TG")) {
            return 'sub to GW telegram';
        } else if (originalName.includes("twitter")) {
            return 'sub to Gw x';
        }
        return originalName;
    };

    const fetchLevels = async () => {
        try {
            const limitResponse = await axiosInstance.get(`/farm/limit-levels`);
            const limitLevelsWithType = limitResponse.data.map(level => ({ ...level, type: 'limit' }));
            setLimitLevels(limitLevelsWithType);
            const rateResponse = await axiosInstance.get(`/farm/rate-levels`);
            const rateLevelsWithType = rateResponse.data.map(level => ({ ...level, type: 'rate' }));
            setRateLevels(rateLevelsWithType);
        } catch (error) {
            console.error('Ошибка при загрузке уровней:', error);
        }
    };

    useEffect(() => {
        fetchLevels();
    }, []);

    const openUpgradeModal = (item) => {
        setSelectedItem(item);
        updateContext()
        setIsUpgradeModalOpen(true);
    };

    const closeUpgradeModal = () => {
        setIsUpgradeModalOpen(false);
        setSelectedItem(null);
    };

    const handleLimitUpgrade = async (levelId) => {
        try {
            const response = await axiosInstance.get(`/farm/limit-level-up?levelId=${levelId}`);
            console.log('Улучшение лимита:', response.data);
            setLimitLevels(prevLevels => prevLevels.map(item =>
                item.Id === levelId ? response.data : item
            ));
            const collectData = await collectAndStart();
            const updatedBalance = collectData.totalCoins;
            setCoins(updatedBalance);
            closeUpgradeModal();
            fetchLevels();
            updateContext()
        } catch (error) {
            console.error('Ошибка при улучшении лимита:', error);
        }
    };

    const handleRateUpgrade = async (levelId) => {
        try {
            const response = await axiosInstance.get(`/farm/rate-level-up?levelId=${levelId}`);
            console.log('Улучшение прокачки:', response.data);
            setRateLevels(prevLevels => prevLevels.map(item =>
                item.Id === levelId ? response.data : item
            ));
            const collectData = await collectAndStart();
            const updatedBalance = collectData.totalCoins;
            setCoins(updatedBalance);
            closeUpgradeModal();
            fetchLevels();
            updateContext()
        } catch (error) {
            console.error('Ошибка при улучшении прокачки:', error);
        }
    };

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };
    const navigateToPage = (path) => {
        navigate(path);
    };

    const timerRef = useRef(null);
    const handleTaskClick = (task) => {
        if (task.readyToComplete) {
            executeTask(task.id);
            task.readyToComplete = false
        } else {
            switch (task.type) {
                case 1:
                    navigateToPage(task.path);
                    break;
                case 2:
                    // eslint-disable-next-line no-case-declarations
                    let url = '';
                    if (task.id === 8) {
                        url = "https://t.me/gang_wars_game";
                    } else if (task.id === 9 || task.name && (task.name.toLowerCase().includes("x") || task.name.toLowerCase().includes("twitter"))) {
                        url = "https://x.com/gangwars_game";
                    } else {
                        console.error('URL could not be determined. Task name:', task.name);
                    }
                    if (url) {
                        window.open(url, '_blank');
                        timerRef.current = setTimeout(() => executeTask(task.id), 500);
                    }
                    break;
                case 3:
                    navigateToPage(task.path);
                    break;
                default:
                    console.log('No action for this task.');
            }
        }
    };
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    const executeTask = async (taskId) => {
        try {
            await axiosInstance.get(`/task/execute?taskId=${taskId}`);
            fetchCompletedTasks();
        } catch (error) {
            console.error(`Error executing task ${taskId}:`, error);
        }
    }

    const fetchCompletedTasks = async () => {
        try {
            const response = await axiosInstance.get('/task/completed-tasks');
            const completedTaskIds = response.data.map(task => task.task.id);
            setTasks(tasks.map(task => ({
                ...task,
                completed: completedTaskIds.includes(task.id)
            })));
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
        }
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            const start = JSON.parse(localStorage.getItem("start"));
            if (start) {
                setCoins(start.coins);
            }
        }
    }, []);

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const handleTab = (newTab) => {
        setActiveTab(newTab);
        navigate({
            pathname: navigate.pathname,
            query: { ...navigate.query, tab: newTab },
        });
    };

    useEffect(() => {
        if (tab) {
            setActiveTab(tab);
        }
    }, [tab]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

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

    function formatNumberFromEnd(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    }

    console.log('coins', coins)
    console.log('rate', rate)
    console.log('limit', limit)

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.balance}>{formatNumberFromEnd(coins)}{' '}<img src={money} alt={''} width={21} height={21} /></div>
                <div className={styles.block}>
                    <div className={styles.buttonSet}>
                        <div className={styles.folderBtnStats}
                             style={{
                                 zIndex: activeTab === '1' ? 112 : 110,
                                 marginBottom:  activeTab === '1' ? '0px' : '-12px',
                                 borderRight:  activeTab === '1' ? '2px solid #3842a4' : 'none',
                             }}
                             onClick={() => {
                                 handleTab('1')
                                 setIsModalOpen(false)
                             }}>{t('EXP.upgrades')}</div>
                        <div
                            className={styles.folderBtnSkins}
                            style={{
                                zIndex: activeTab === '2' ? 113 : 110,
                                marginBottom:  activeTab === '2' ? '-0px' : '2px',
                            }}
                            onClick={() => {
                                handleTab('2')
                                setIsModalOpen(false)
                            }}
                        >{t('EXP.tasks')}</div>
                    </div>
                    {activeTab === '1' && <div className={styles.personalContainer}>
                        <div className={styles.list}>
                            <div className={styles.containerSwiper}>
                                <button className={styles.navLeft} onClick={handleSlidePrev}>
                                    <img src={'/ArrowWhite.png'} alt={''} width={15} height={15} />
                                </button>
                                <Swiper
                                    modules={[Navigation, Controller]}
                                    slidesPerView={1}
                                    centeredSlides={false}
                                    spaceBetween={10}
                                    loop={true}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                    onSlideChange={handleSlideChange}
                                    className={styles.swiper}
                                >
                                    {sliderImages.map((image, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className={styles.slide}
                                        >
                                            <img
                                                width={120}
                                                height={194}
                                                src={image}
                                                alt={''}
                                                className={styles.icon}
                                            />
                                            <div className={styles.caption}>
                                                {upgradesList[activeIndex]}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button className={styles.navRight} onClick={handleSlideNext}>
                                    <img src={'/ArrowWhite.png'} alt={''} width={15} height={15} />
                                </button>
                            </div>
                            {activeIndex === 0 && <>
                                {rateLevels.length !== 0 ? <div className={styles.itemsList}>{rateLevels.map((item, index) => (
                                    <ItemPlaceholder img={rateImages[index]} item={item} key={index} onClick={() => openUpgradeModal(item)} />
                                ))}</div> : <div className={styles.warning}>{t('EXP.noups')}</div>}
                            </>}
                            {activeIndex === 1 && <>
                                {limitLevels.length !== 0 ? <div className={styles.itemsList}>{limitLevels.map((item, index) => (
                                    <ItemPlaceholder img={limitImages[index]} item={item} key={index} onClick={() => openUpgradeModal(item)} />
                                ))}</div> : <div className={styles.warning}>{t('EXP.noups')}</div>}
                            </>}
                        </div>
                    </div>}
                    {activeTab === '2' && <div className={styles.skinContainer}>
                        <div className={styles.col}>
                            {/*<div className={styles.label}>Daily</div>*/}
                            {/*{Tasks.daily.map((task, index) => {*/}
                            {/*    return(*/}
                            {/*        <TaskBtn title={task.name} desc={task.desc} complite={task.complite} key={index} onClick={() => handleTaskClick(task)} />*/}
                            {/*    )*/}
                            {/*})}*/}
                            <div className={styles.label}>{t('EXP.main')}</div>
                            {tasks.map((task, index) => {
                                return(
                                    <>
                                        {task.type !== 4 && <TaskBtn
                                            subtitle={task.name}
                                            desc={task.type !== 2 ? `${task.current} / ${task.amount}` : ''}
                                            completed={task.completed}
                                            key={index}
                                            icon={task.icon}
                                            type={task.type}
                                            readyToComplete={task.readyToComplete}
                                            reward={formatNumberFromEnd(task.reward)}
                                            onClick={() => handleTaskClick(task)}
                                        />}
                                    </>
                                )
                            })}
                        </div>
                    </div>}
                </div>
                {isUpgradeModalOpen && selectedItem && (
                    <div className={styles.modalOverlay}>
                        {selectedItem && coins < selectedItem.Cost && (
                            toast.error('Not enough coins available.')
                        )}
                        <div className={styles.modalBorder}>
                            <div className={styles.modalUpgrades}>
                                <h3>
                                    {selectedItem.type === 'limit' ? `${t('EXP.limit')} +${selectedItem.Name}%` : `${t('EXP.rate')} +${selectedItem.Name}%`}
                                </h3>
                                <p>{t('EXP.lvl')}: {selectedItem.Level}</p>
                                <p>{t('EXP.cost')}: {selectedItem.Cost}</p>
                                <p>
                                    <a>
                                        {selectedItem.type === 'limit' ?
                                            Number(limit)
                                            :
                                            Number(rate).toFixed(3)
                                        }
                                    </a>
                                    {' '}
                                    <img src={'/ArrowWhite.png'} alt={''} width={15} height={15} className={styles.navRight} />
                                    {' '}
                                    <a className={styles.green}>
                                        {
                                            (selectedItem.type === 'limit' ?
                                                (Number(limit) * (1 + (Number(selectedItem.IncreasePer)/100)))
                                                :
                                                (Number(rate) * (1 + (Number(selectedItem.IncreasePer)/100)))).toFixed(3)
                                        }
                                    </a>
                                </p>
                            </div>
                        </div>
                        <button
                            className={styles.modalBorder}
                            onClick={() => {
                                if (window.Telegram?.WebApp?.HapticFeedback) {
                                    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
                                }
                                if (selectedItem) {
                                    selectedItem.type === 'limit'
                                        ? handleLimitUpgrade(selectedItem.Id, selectedItem.Cost)
                                        : handleRateUpgrade(selectedItem.Id, selectedItem.Cost);
                                }
                            }}
                            disabled={selectedItem && coins < selectedItem.Cost}
                        >
                            <div className={styles.modalBtn}>{t('EXP.upgrade')}</div>
                        </button>
                        <div className={styles.modalBorder} onClick={closeUpgradeModal}>
                            <div className={styles.modalBtn}>{t('EXP.close')}</div>
                        </div>
                    </div>
                )}
                {isModalOpen && <div className={styles.modal}>
                    <div className={styles.label}>Daily rewards</div>
                </div>}
            </div>
        </div>
    );
}
