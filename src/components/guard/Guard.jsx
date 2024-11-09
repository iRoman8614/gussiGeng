import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const MobileGuard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobileTelegram = () => {
            const platform = window.Telegram.WebApp.platform;
            if (platform === 'android' || platform === 'ios') {
                console.log("Пользователь находится в Telegram Web App на мобильном устройстве.");
            } else {
                navigate('/qr');
            }
        };
        checkMobileTelegram();
    }, [navigate]);

    return null;
};

export default MobileGuard;
