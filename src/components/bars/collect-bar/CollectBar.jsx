import collectBar from '../../../assets/collectBar.svg';
import styles from './CollectBar.module.scss';
import { CoinContext } from '../../../context/CoinContext.jsx';
import { useContext } from "react";
import border from '../../../assets/border.svg'

export const CollectBar = () => {
    const { progress, maxProgress } = useContext(CoinContext);
    const maxWidth = 198;
    const currentWidth = (progress / maxProgress) * maxWidth;

    return(
        <div className={styles.root} style={{'background': `url(${collectBar})`}}>
            <div className={styles.progressBar} style={{'width': `${currentWidth}px`}}></div>
            <div className={styles.title}>
                {progress} / {maxProgress}
            </div>
            <div className={styles.border} >
                <img src={border} />
            </div>
        </div>
    );
}
