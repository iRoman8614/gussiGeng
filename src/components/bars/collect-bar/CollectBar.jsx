import {useContext, useEffect, useState} from "react";
import { CoinContext } from '../../../context/CoinContext.jsx';

import border from '../../../../public/border.png'

import styles from './CollectBar.module.scss';
export const CollectBar = () => {
    const { progress, maxProgress } = useContext(CoinContext);
    const [maxWidth, setMaxWidth] = useState(198);

    useEffect(() => {
        const updateMaxWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 400) {
                setMaxWidth(175);
            } else {
                setMaxWidth(198);
            }
        };

        updateMaxWidth(); // Вызываем сразу для установки начального значения

        window.addEventListener('resize', updateMaxWidth);

        return () => {
            window.removeEventListener('resize', updateMaxWidth);
        };
    }, []);

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
