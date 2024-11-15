import styles from './TaskBtn.module.scss'

const Arrow = '/Tasks/TaskArrow.png'
const Complite = '/Tasks/TaskComplited.png'
const money = '/Tasks/money2.png'
const Icon1 = '/Tasks/referal.png'
const Icon3 = '/Tasks/pvp.png'
const IconTG = '/Tasks/telegram.png'
const IconX = '/Tasks/twitter.png'


// eslint-disable-next-line react/prop-types
export const TaskBtn = ({title, subtitle, desc, completed, onClick, readyToComplete, reward, icon, type}) => {
    const getIconSrc = () => {
        switch(icon) {
            case 'ref': return Icon1;
            case 'pvp': return Icon3;
            case 'tg': return IconTG;
            case 'x': return IconX;
            default:
                if (type === 1) return Icon1;
                if (type === 3) return Icon3;
                return '';
        }
    }

    const handleClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        onClick();
    };

    return(
        <div className={readyToComplete ? styles.rootReady : styles.root} onClick={handleClick}>
            <img className={styles.icon} src={getIconSrc()} alt={''} width={60} height={60} />
            <div className={styles.container}>
                <div>
                    {title && <div className={styles.title}>{title}</div>}
                    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                </div>
                <div className={styles.reward}><img className={styles.money} src={money} width={20} height={16} alt={''} />+{reward}</div>
            </div>
            <div className={styles.desc}>{desc}</div>
            <div>
                {completed === false ? <img src={Arrow} width={20} height={20} alt={''} /> : <img src={Complite} width={30} height={30} alt={''} />}
            </div>
        </div>
    )
}