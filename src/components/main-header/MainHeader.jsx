import styles from './MainHeader.module.scss'
import {IconButton} from "../buttons/icon-btn/IconButton.jsx";
import account from '../../assets/account.svg'
import gang from '../../assets/gang.svg'
import settings from '../../assets/settings.svg'
import boards from '../../assets/boards.svg'
import wallet from '../../assets/wallet.svg'
import {TotalBar} from "../bars/total-bar/TotalBar.jsx";

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