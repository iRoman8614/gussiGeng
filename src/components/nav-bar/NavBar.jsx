
import { IconButton } from "../buttons/icon-btn/IconButton.jsx";
import { BigButton } from "../buttons/big-btn/BigButton.jsx";

const upgrades = '/main-buttons/upgrades.png';
const hands = '/main-buttons/hands.png';
const friends = '/main-buttons/friends.png';
const bag = '/main-buttons/bag.png';
const FAQ = '/main-buttons/FAQ.png'

import styles from './NavBar.module.scss';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const NavBar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.root}>
            <IconButton image={bag} alt={'items'} title={t('main.items')} hidden={true} onClick={() => {navigate('/main')}} />
            <IconButton image={upgrades} alt={'upgrades'} title={t('main.exp')} onClick={() => {navigate('/upgrades')}} />
            <BigButton image={hands} alt={'pvp'} title={t('main.pvp')} onClick={() => {navigate('/lobby')}} />
            <IconButton image={friends} alt={'friends'} title={t('main.friends')} onClick={() => {navigate('/friends')}} />
            <IconButton image={FAQ} alt={'home'} title={t('main.faq')} onClick={() => {navigate('/faq/home')}} />
        </div>
    );
};