import {useEffect, useState} from "react";

import styles from './Loader.module.scss'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const loader = '/loadingImg.jpg'
export const LoaderGif = () => {
    return(
        <div className={styles.root}>
            <img width={450} height={1000} className={styles.video} src={loader} alt="Loading..." />
            <LoadingText />
        </div>
    )
}

const LoadingText = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [dots, setDots] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots + 1) % 4);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(timer === 20) {
            toast.error(t('PVP.you'));
        }
        if(timer === 22) {
            navigate('/main');
        }
        return;
    }, [timer])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.hint}>{t('PVP.expected')}</div>
            <div className={styles.timer}>{formatTime(timer)}</div>
            <div className={styles.loading}>
                {t('loading')}{'.'.repeat(dots)}
            </div>
        </div>
    );
};