import {IconButton} from "../buttons/icon-btn/IconButton.jsx";
import {TotalBar} from "../bars/total-bar/TotalBar.jsx";

import account from '../../../public/main-buttons/account.png'
import settings from '../../../public/main-buttons/settings.png'
import boards from '../../../public/main-buttons/boards.png'
import wallet from '../../../public/main-buttons/wallet.png'
import { CoinContext } from '../../context/CoinContext.jsx';

import styles from './MainHeader.module.scss'
import {useContext} from "react";

export const MainHeader = () => {
    const { teamId, teamData } = useContext(CoinContext);

    return(
        <div className={styles.root}>
            <IconButton image={account} alt={'account'} title={'account'} />
            <IconButton image={teamData[teamId].logo} alt={'gang'} />
            <IconButton image={settings} alt={'settings'} title={'settings'} />
            <IconButton image={boards} alt={'boards'} title={'board'} />
            <TotalBar />
            <IconButton image={wallet} alt={'wallet'} title={'wallet'} />
        </div>
    )
}