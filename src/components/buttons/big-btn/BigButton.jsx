import styles from './BigButton.module.scss'

// eslint-disable-next-line react/prop-types
export const BigButton = ({image, title, alt}) => {
    // const handleClick = () => {
    //     if (window.Telegram?.WebApp?.HapticFeedback) {
    //         window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    //     }
    // };

    const handleClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            console.log("HapticFeedback доступен");
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
            alert('Вибрация вызвана');
        } else {
            console.log("HapticFeedback недоступен");
            alert('API HapticFeedback недоступен');
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