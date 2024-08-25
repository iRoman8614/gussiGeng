import styles from './IconButton.module.scss'

// eslint-disable-next-line react/prop-types
export const IconButton = ({image, title, alt}) => {
    const handleClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
    };
    return(
        <div className={styles.root} onClick={handleClick}>
            <div >
                <img className={styles.image} src={image} alt={alt} />
            </div>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    )
}