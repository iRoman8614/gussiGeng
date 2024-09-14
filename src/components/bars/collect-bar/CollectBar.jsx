import border from '../../../../public/farm_border.png'

import styles from './CollectBar.module.scss';
export const CollectBar = () => {
    const maxWidth = 224;
    const currentWidth = (1000 / 3500) * maxWidth;

    return(
        <div className={styles.root}>
            <div className={styles.progressBar} style={{'width': `${currentWidth}px`}}></div>
            <div className={styles.title}>
                {1000} / {3500}
            </div>
            <div className={styles.border} >
                <img className={styles.image} src={border} />
            </div>
        </div>
    );
}
