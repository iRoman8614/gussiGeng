import {IconButton} from "../buttons/icon-btn/IconButton.jsx";
import {TotalBar} from "../bars/total-bar/TotalBar.jsx";

import account from '../../../public/account.png'
import gang from '../../../public/gang.png'
import settings from '../../../public/settings.png'
import boards from '../../../public/boards.png'
import wallet from '../../../public/wallet.png'

import styles from './MainHeader.module.scss'

export const MainHeader = () => {
    return(
        <div className={styles.root}>
            <IconButton image={account} alt={'account'} title={'account'} />
            <IconButton image={gang} alt={'gang'} title={'gang'} />
            <IconButton image={settings} alt={'settings'} title={'settings'} />
            <IconButton image={boards} alt={'boards'} title={'board'} />
            <TotalBar />
            <IconButton image={wallet} alt={'wallet'} title={'wallet'} />
        </div>
    )
}