import styles from './Listitem.module.scss'
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
export const ListItem = ({item, index, teamId}) => {
    const[userId, setUserId] = useState(null)

    const teamData = {
        1: { avatar: '/gussiGeng/public/listItemsBG/avaG.png', image: '/gussiGeng/public/listItemsBG/1grbg.png' },
        2: { avatar: '/gussiGeng/public/listItemsBG/avaB.png', image: '/gussiGeng/public/listItemsBG/2bvbg.png' },
        3: { avatar: '/gussiGeng/public/listItemsBG/avaY.png', image: '/gussiGeng/public/listItemsBG/3yfbg.png' },
        4: { avatar: '/gussiGeng/public/listItemsBG/avaR.png', image: '/gussiGeng/public/listItemsBG/4rrbg.png' }
    };

    const { avatar, image } = teamData[teamId] || {};

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.Telegram?.WebApp) {
                const search = window.Telegram.WebApp.initData;
                const urlParams = new URLSearchParams(search);
                const userParam = urlParams.get("user");
                if (userParam) {
                    const decodedUserParam = decodeURIComponent(userParam);
                    const userObject = JSON.parse(decodedUserParam);
                    console.log("User ID from Telegram:", userObject.id);
                    setUserId(userObject.id);
                }
            }
        }
    }, []);

    const formatBalance = (balance) => {
        if (balance >= 1e12) {
            return (balance / 1e12).toFixed(1) + 't';
        } else if (balance >= 1e9) {
            return (balance / 1e9).toFixed(1) + 'b';
        } else if (balance >= 1e6) {
            return (balance / 1e6).toFixed(1) + 'm';
        } else if (balance >= 1e3) {
            return (balance / 1e3).toFixed(1) + 'k';
        }
        return balance;
    };

    return (
        <div className={item?.profileId === userId ? styles.rootMe : styles.root}>
            <div className={styles.avatar}>
                <img className={styles.avatar} src={avatar} alt={'avatar'} width={40} height={44} />
            </div>
            <div className={styles.container}>
                <img className={styles.bg} src={image} alt={''} width={450} height={65} />
                <div className={styles.content}>
                    <div className={styles.nickname}>{item?.userName || 'Anonymous'}</div>
                    <div className={styles.sum}>{formatBalance(item?.balance)}</div>
                    {index && <div className={styles.index}>{index}</div>}
                </div>
            </div>
        </div>
    );
}