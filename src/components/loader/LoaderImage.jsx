import styles from './Loader.module.scss'
import loader from '/loadingImg.png'

export const LoaderImage = () => {
    return(
        <div className={styles.root}>
            <img className={styles.video} src={loader} alt="Loading..."/>
        </div>
    )
}