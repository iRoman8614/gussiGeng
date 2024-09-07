import { createContext, useState, useEffect } from 'react';
import teamData from '../mock/teamsData';

export const CoinContext = createContext();

// eslint-disable-next-line react/prop-types
export const CoinProvider = ({ children }) => {
    const maxProgress = 3500;
    const farmRate = 100;
    const farmInterval = 2000;

    const [totalCoins, setTotalCoins] = useState(1);
    const [progress, setProgress] = useState(0);
    const [teamId, setTeamId] = useState(null)

    useEffect(() => {
        const storedTotal = parseInt(localStorage.getItem('totalCoins')) || 0;
        const lastCollectedTime = parseInt(localStorage.getItem('lastCollectedTime')) || Date.now();
        const currentTime = Date.now();

        const offlineTime = currentTime - lastCollectedTime;
        const offlineCoins = Math.min(Math.floor((offlineTime / farmInterval) * farmRate), maxProgress);

        setTotalCoins(storedTotal);
        setProgress(offlineCoins);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= maxProgress) return prev;
                return Math.min(prev + farmRate, maxProgress);
            });
        }, farmInterval);

        return () => clearInterval(interval);
    }, []);

    const handleCollect = () => {
        setTotalCoins(prev => {
            const newTotal = prev + progress;
            localStorage.setItem('totalCoins', newTotal);
            localStorage.setItem('lastCollectedTime', Date.now());
            return newTotal;
        });
        setProgress(0);
    };

    const updateTeamData = (id) => {
        setTeamId(id);
    };

    return (
        <CoinContext.Provider value={{ totalCoins, progress, maxProgress, handleCollect, teamId, updateTeamData,
            teamData }}>
            {children}
        </CoinContext.Provider>
    );
};
