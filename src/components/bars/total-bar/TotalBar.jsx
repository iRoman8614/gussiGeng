import styles from './TotalBar.module.scss'
import totalbar from '../../../assets/totalbar.svg'
import { CoinContext } from '../../../context/CoinContext.jsx';
import {useContext} from "react";
export const TotalBar = () => {
    const { totalCoins } = useContext(CoinContext);
    return(
        <div className={styles.root} style={{'background': `url(${totalbar})`}}>
            {totalCoins}
        </div>
    )
}