import { useEffect, useState } from 'react';
import { CustomSelect } from '../../components/selector/Select';
import { useInit } from '../../context/InitContext.jsx';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useNavigate } from "react-router-dom";

import styles from './Settings.module.scss';

export const SettingsPage = () => {
    const { setLang } = useInit();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialLang = localStorage.getItem('appLanguage') || i18next.language;
    const [selectedLanguage, setSelectedLanguage] = useState(initialLang);

    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Русский' },
    ];

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    useEffect(() => {
        i18next.changeLanguage(selectedLanguage);
        setLang(selectedLanguage);
        localStorage.setItem('appLanguage', selectedLanguage);
    }, [selectedLanguage, setLang]);

    const handleLanguageChange = (selectedOption) => {
        const newLang = selectedOption.value;
        setSelectedLanguage(newLang);
        setLang(newLang);
        i18next.changeLanguage(newLang);
        localStorage.setItem('appLanguage', newLang);
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <h1 className={styles.title}>{t('settingsPage.title')}</h1>
                <CustomSelect
                    title={t('settingsPage.selectLanguage')}
                    optionsArray={languageOptions}
                    value={languageOptions.find(opt => opt.value === selectedLanguage)}
                    onChange={handleLanguageChange}
                />
            </div>
        </div>
    );
};
