import styles from './Loader.module.scss'
import loader from '/loader.mov'

export const Loader = () => {
    return(
        <div className={styles.root}>
            <video className={styles.video}
                src={loader}
                autoPlay
                loop
                muted
            />
        </div>
    )
}