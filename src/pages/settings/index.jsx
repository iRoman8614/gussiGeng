
import {useEffect} from 'react';
import {CustomSelect} from '../../components/selector/Select';
import { useInit } from '../../context/InitContext.jsx';
import { useTranslation } from 'react-i18next';

import styles from './Settings.module.scss'
import {useNavigate} from "react-router-dom";

export const SettingsPage = () => {
    const { setLang } = useInit();
    const { i18n } = useTranslation();

    const languageOptions = [
        { value: 'en', label: 'English' },
        // { value: 'ru', label: 'Русский' },
    ];

    const navigate = useNavigate();
    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const handleLanguageChange = (selectedOption) => {
        const newLang = selectedOption.value;
        setLang(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem('appLanguage', newLang);
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={styles.title}>settings</h1>
                <CustomSelect title={'select language'} optionsArray={languageOptions} onChange={handleLanguageChange} />
            </div>
        </div>
    );
}
