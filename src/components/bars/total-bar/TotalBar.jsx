import {useContext} from "react";
import { CoinContext } from '../../../context/CoinContext.jsx';

import styles from './TotalBar.module.scss'

export const TotalBar = () => {
    const { totalCoins } = useContext(CoinContext);
    return(
        <div className={styles.root}>
            <div className={styles.border}>
                {totalCoins}
            </div>
        </div>
    )
}