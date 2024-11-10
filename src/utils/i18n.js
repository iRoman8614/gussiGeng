import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

const getAndSetInitialLanguage = () => {
    const telegramLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
    const savedLanguage = localStorage.getItem('appLanguage');

    let initialLanguage;
    if (telegramLang === 'ru' || telegramLang === 'en') {
        initialLanguage = telegramLang;
    } else if (savedLanguage) {
        initialLanguage = savedLanguage;
    } else {
        initialLanguage = 'en';
    }

    if (!savedLanguage || savedLanguage !== initialLanguage) {
        localStorage.setItem('appLanguage', initialLanguage);
    }

    return initialLanguage;
};

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: 'en',
        lng: getAndSetInitialLanguage(),
        debug: true,
        backend: {
            loadPath: '/gussiGeng/locales/{{lng}}/translation.json',
        },
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
