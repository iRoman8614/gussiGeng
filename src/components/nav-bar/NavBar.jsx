import {IconButton} from "../buttons/icon-btn/IconButton.jsx";
import {BigButton} from "../buttons/big-btn/BigButton.jsx";

import home from '../../../public/home.png'
import upgrades from '../../../public/upgrades.png'
import hands from '../../../public/hands.png'
import friends from '../../../public/friends.png'
import bag from '../../../public/bag.png'

import styles from './NavBar.module.scss'


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