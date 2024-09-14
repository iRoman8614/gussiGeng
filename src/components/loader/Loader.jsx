import styles from './Loader.module.scss'
import loader from '/loading.gif'

export const Loader = () => {
    return(
        <div className={styles.root}>
            <img className={styles.video}
                 src={loader} alt="Loading..."/>
        </div>
    )
}