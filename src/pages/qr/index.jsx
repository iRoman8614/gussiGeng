import styles from '@/styles/QrPage.module.scss';

const qr = '/gussiGeng/public/qr.png'

export const QrPage = () => {
    return (
        <div className={styles.placeholder}>
            <h2>Play on your mobile</h2>
            <img className={styles.qr} src={qr} alt="QR Code" width={200} height={200} />
            <h2>@gwprod_bot</h2>
        </div>
    );
}