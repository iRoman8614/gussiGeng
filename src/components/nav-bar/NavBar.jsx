
import { IconButton } from "../buttons/icon-btn/IconButton.jsx";
import { BigButton } from "../buttons/big-btn/BigButton.jsx";

const upgrades = '/gussiGeng/public/main-buttons/upgrades.png';
const hands = '/gussiGeng/public/main-buttons/hands.png';
const friends = '/gussiGeng/public/main-buttons/friends.png';
const bag = '/gussiGeng/public/main-buttons/bag.png';
const FAQ = '/gussiGeng/public/main-buttons/FAQ.png'

import styles from './NavBar.module.scss';
import {useNavigate} from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <IconButton image={bag} alt={'items'} title={'items'} hidden={true} onClick={() => {navigate('/main')}} />
            <IconButton image={upgrades} alt={'upgrades'} title={'exp'} onClick={() => {navigate('/upgrades')}} />
            <BigButton image={hands} alt={'pvp'} title={'pvp'} onClick={() => {navigate('/lobby')}} />
            <IconButton image={friends} alt={'friends'} title={'friends'} onClick={() => {navigate('/friends')}} />
            <IconButton image={FAQ} alt={'home'} title={'faq'} onClick={() => {navigate('/faq/home')}} />
        </div>
    );
};