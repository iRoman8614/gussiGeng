import purpleChar from '../../../public/characters/purpleChar.png'

import styles from './CharacterImage.module.scss'

export const CharacterImage = () => {
    return(
        <div className={styles.root}>
            <img className={styles.char} src={purpleChar}/>
        </div>
    )
}