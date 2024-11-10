import styles from './QrPage.module.scss';
import {useTranslation} from "react-i18next";

const qr = '/qr.png'

export const QrPage = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.placeholder}>
            <h2>{t('qr')}</h2>
            <img className={styles.qr} src={qr} alt="QR Code" width={200} height={200} />
            <h2>@Gang_wars_bot</h2>
        </div>
    );
}