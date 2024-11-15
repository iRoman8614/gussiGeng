import { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../utils/i18n.js';

const InitContext = createContext();

// eslint-disable-next-line react/prop-types
export const InitProvider = ({ children }) => {
    const [groupId, setGroupId] = useState(() => {
        const savedInit = JSON.parse(localStorage.getItem('init')) || {};
        return savedInit.groupId || 0;
    });

    const [liga, setLiga] = useState(() => {
        const savedInit = JSON.parse(localStorage.getItem('init')) || {};
        return savedInit.liga || 0;
    });

    const [lang, setLang] = useState(() => {
        const savedInit = JSON.parse(localStorage.getItem('init')) || {};
        return savedInit.lang || 'en';
    });

    useEffect(() => {
        if (i18n.isInitialized && lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    const [limit, setLimit] = useState(() => {
        const savedFarm = JSON.parse(localStorage.getItem('farm')) || {};
        return savedFarm.farmLimit || 0;
    });

    const [rate, setRate] = useState(() => {
        const savedFarm = JSON.parse(localStorage.getItem('farm')) || {};
        return savedFarm.farmRate || 1;
    });

    const [coins, setCoins] = useState(() => {
        const savedFarm = JSON.parse(localStorage.getItem('farm')) || {};
        return savedFarm.coins || 0;
    });

    const [totalCoins, setTotalCoins] = useState(() => {
        const savedFarm = JSON.parse(localStorage.getItem('farm')) || {};
        return savedFarm.totalCoins || 0;
    });

    const [dailyEntries, setDailyEntries] = useState(() => {
        const savedInit = JSON.parse(localStorage.getItem('init')) || {};
        return savedInit.dailyEntries || 0;
    });

    const updateContext = () => {
        const savedInit = JSON.parse(localStorage.getItem('init')) || {};
        setGroupId(savedInit.groupId || 0);
        setLiga(savedInit.liga || 0);
        setLang(savedInit.lang || 'en');
        setDailyEntries(savedInit.dailyEntries || 0);

        const savedFarm = JSON.parse(localStorage.getItem('farm')) || {};
        setLimit(savedFarm.farmLimit || 0);
        setRate(savedFarm.farmRate || 1);
        setCoins(savedFarm.coins || 0);
        setTotalCoins(savedFarm.totalCoins || 0);
    };

    useEffect(() => {
        const initData = {
            groupId: groupId,
            liga: liga,
            lang: lang,
            dailyEntries: dailyEntries,
        };
        localStorage.setItem('init', JSON.stringify(initData));
    }, [groupId, liga, lang, dailyEntries]);

    useEffect(() => {
        const farmData = {
            farmLimit: limit,
            farmRate: rate,
            coins: coins,
            totalCoins: totalCoins,
        };
        localStorage.setItem('farm', JSON.stringify(farmData));
    }, [limit, rate]);

    const initState = {
        groupId,
        setGroupId,
        liga,
        setLiga,
        lang,
        setLang,
        limit,
        setLimit,
        rate,
        setRate,
        coins,
        setCoins,
        totalCoins,
        setTotalCoins,
        dailyEntries,
        setDailyEntries,
        updateContext
    };

    return (
        <InitContext.Provider value={initState}>
            {children}
        </InitContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInit = () => {
    return useContext(InitContext);
};
