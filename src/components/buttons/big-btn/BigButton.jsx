import styles from './BigButton.module.scss'

// eslint-disable-next-line react/prop-types
export const BigButton = ({image, title, alt}) => {
    return(
        <div className={styles.root}>
            <div >
                <img className={styles.image} src={image} alt={alt} />
            </div>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    )
}