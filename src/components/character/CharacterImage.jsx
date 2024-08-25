import styles from './CharacterImage.module.scss'
import purpleChar from '../../assets/purpleChar.svg'
export const CharacterImage = () => {
    return(
        <div className={styles.root}>
            <img className={styles.char} src={purpleChar}/>
        </div>
    )
}