import styles from './ClaimButton.module.scss'
import ClaimBtn from '../../../assets/claimBTN.svg'
import {useContext} from "react";
import {CoinContext} from "../../../context/CoinContext.jsx";
import { triggerVibration } from '../../../utils/vibrationUtil.js';

export const ClainButton = () => {
    const { handleCollect } = useContext(CoinContext);

    const handleClick = () => {
        triggerVibration(50);
        handleCollect();
    };
    return(
        <div className={styles.root} style={{'background': `url(${ClaimBtn})`}} onClick={handleClick}>
            CLaim
        </div>
    )
}