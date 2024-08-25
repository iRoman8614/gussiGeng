import styles from './NavBar.module.scss'

import home from '../../assets/home.svg'
import upgrades from '../../assets/upgrades.svg'
import hands from '../../assets/hands.svg'
import friends from '../../assets/friends.svg'
import bag from '../../assets/bag.svg'
import {IconButton} from "../buttons/icon-btn/IconButton.jsx";
import {BigButton} from "../buttons/big-btn/BigButton.jsx";

export const NavBar = () => {
    return(
        <div className={styles.root}>
            <IconButton image={home} alt={'home'} title={'home'} />
            <IconButton image={upgrades} alt={'upgrades'} title={'exp'} />
            <BigButton image={hands} alt={'pvp'} title={'pvp'} />
            <IconButton image={friends} alt={'friends'} title={'friends'} />
            <IconButton image={bag} alt={'items'} title={'items'} />
        </div>
    )
}