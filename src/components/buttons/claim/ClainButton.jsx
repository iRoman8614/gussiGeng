import {useContext} from "react";
import {CoinContext} from "../../../context/CoinContext.jsx";

import styles from './ClaimButton.module.scss'

export const ClainButton = () => {
    const { handleCollect } = useContext(CoinContext);

    const handleClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }

        handleCollect();
    };

    return(
        <div className={styles.root}
             onClick={handleClick}>
            CLaim
        </div>
    )
}