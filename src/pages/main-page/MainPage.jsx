import {IconButton} from "../../components/buttons/icon-btn/IconButton.jsx";
import {NavBar} from "../../components/nav-bar/NavBar.jsx";
import {CollectBar} from "../../components/bars/collect-bar/CollectBar.jsx";

import account from "../../../public/main-buttons/account.png";
import settings from "../../../public/main-buttons/settings.png";
import boards from "../../../public/main-buttons/boards.png";
import wallet from "../../../public/main-buttons/wallet.png";
import claim from '../../../public/claimBTN.png'
import purpleChar from '../../../public/characters/purpleChar.png'
import border from '../../../public/totalbar.png'

import teamData from "../../mock/teamsData.js";

import styles from './MainPage.module.scss'

export const MainPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.item1}>
                <IconButton image={account} alt={'account'} title={'account'}/>
            </div>
            <div className={styles.item2}>
                <IconButton image={teamData[4].logo} alt={'gang'}/>
            </div>
            <div className={styles.item3}>
                <IconButton image={settings} alt={'settings'} title={'settings'}/>
            </div>
            <div className={styles.item4}>
                <IconButton image={boards} alt={'boards'} title={'board'}/>
            </div>
            <div className={styles.item5}>
                <img src={border} alt={'border'} className={styles.totalBarRoot}/>
                <div className={styles.totalText}>{100000}</div>
            </div>
            <div className={styles.item6}>
                <IconButton image={wallet} alt={'wallet'} title={'wallet'}/>
            </div>
            <div className={styles.item7}>
                <img className={styles.char} alt={'character'} src={purpleChar}/>
            </div>
            <div className={styles.item8}>
                <CollectBar/>
            </div>
            <div className={styles.item9}>
                <img className={styles.claimRoot} src={claim} alt={'claim'} onClick={() => {
                    console.log('clicked')
                }}/>
            </div>
            <div className={styles.item10}>
                <NavBar/>
            </div>
        </div>
    )
}