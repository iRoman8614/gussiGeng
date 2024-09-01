import { useContext } from "react";
import { CoinContext } from '../../../context/CoinContext.jsx';

import border from '../../../../public/farm_border.png'

import styles from './CollectBar.module.scss';
export const CollectBar = () => {
    const { progress, maxProgress } = useContext(CoinContext);
    const maxWidth = 224;
    const currentWidth = (progress / maxProgress) * maxWidth;

    return(
        <div className={styles.root}
        >
            <div className={styles.progressBar} style={{'width': `${currentWidth}px`}}></div>
            <div className={styles.title}>
                {progress} / {maxProgress}
            </div>
            <div className={styles.border} >
                <img className={styles.image} src={border} />
            </div>
        </div>
    );
}
