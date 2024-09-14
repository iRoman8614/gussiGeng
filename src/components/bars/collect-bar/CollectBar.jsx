import border from '../../../../public/farm_border.png';
import styles from './CollectBar.module.scss';

// eslint-disable-next-line react/prop-types
export const CollectBar = ({ currentCoins, maxCoins }) => {
    const maxWidth = 224;
    const currentWidth = (currentCoins / maxCoins) * maxWidth;

    return (
        <div className={styles.root}>
            <div className={styles.progressBar} style={{ 'width': `${currentWidth}px` }}></div>
            <div className={styles.title}>
                {currentCoins} / {maxCoins}
            </div>
            <div className={styles.border}>
                <img className={styles.image} src={border} alt="Progress Border"/>
            </div>
        </div>
    );
}
