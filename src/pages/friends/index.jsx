import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {ListItem} from "../../components/ListItem/ListItem";

import styles from './Friends.module.scss'
import {useMyInvitees} from "../../utils/api";
import {useNavigate} from "react-router-dom";

const copy = '/gussiGeng/public/copy.png'
const star = '/gussiGeng/public/Star.png'
const money = '/gussiGeng/public/money.png'

// eslint-disable-next-line no-undef
// const link = process.env.NEXT_PUBLIC_BOT_LINK
const link = 'https://t.me/gwtestbot_bot'
export const FriendsPage = () => {
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const { data: friends } = useMyInvitees();

    const navigate = useNavigate();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const search = window.Telegram.WebApp.initData;
            const urlParams = new URLSearchParams(search);
            const userParam = urlParams.get('user');
            if (userParam) {
                const decodedUserParam = decodeURIComponent(userParam);
                const userObject = JSON.parse(decodedUserParam);
                setUserId(userObject.id);
            }
        }
    }, []);

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.BackButton.onClick(() => {
            navigate('/main');
        });
        return () => {
            window.Telegram.WebApp.BackButton.hide();
        };
    }, [navigate]);

    const handleClick = () => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
        const referralLink = `${link}?start=kid${userId}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(referralLink)
                .then(() => {
                    toast.success('Copied!', {
                        position: "bottom-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                    if (window.Telegram?.WebApp?.HapticFeedback) {
                        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
                    }
                })
                .catch((error) => {
                    console.error('Failed to copy the link:', error);
                });
        } else {
            console.error('Clipboard API is not available');
        }
    };

    const inviteClick = () => {
        const tg = window.Telegram.WebApp;
        const referralLink = `${link}?start=kid${userId}`;
        const inviteMessage = `Tap the link to join me`;
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
        const shareLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(`${inviteMessage}`)}`;
        window.open(shareLink, '_blank');
    };

    const handleTab = (tab) => {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        setActiveTab(tab)
    }

    const thresholds = [1, 3, 5, 10, 25, 50, 100];

    const getCurrentThreshold = (friendsCount) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (friendsCount <= thresholds[i]) {
                return thresholds[i];
            }
        }
        return thresholds[thresholds.length - 1];
    };

    const currentThreshold = getCurrentThreshold(friends.length);
    const progressPercent = Math.min((friends.length / currentThreshold) * 100, 100);

    return(
        <div className={styles.root}>
            <div className={styles.container}>
                {activeTab === 1 && <div className={styles.bannerSet}>
                    <div className={styles.banner}>
                        <div className={styles.bannerMid}>
                            invite a friend
                            <p>+1 PVP pass</p>
                        </div>
                        <div className={styles.hintLabel}><a>+5 extra games</a></div>
                    </div>
                    <div className={styles.banner}>
                        <div className={styles.bannerMid}>
                            invite a
                            tg <img src={star} alt={''} width={15} height={15}/> friend
                            <p>+2 PVP pass</p>
                        </div>
                        <div className={styles.hintLabel}><a>+10 extra games</a></div>
                    </div>
                </div>}
                {activeTab === 1 && <div className={styles.hintBg}>
                    <div className={styles.hintLabel2}>earn <a>10%</a> of your friends <a>tasks</a> completion!</div>
                </div>}
                <div className={activeTab === 1 ? styles.block : styles.block2}>
                    <div className={styles.buttonSet}>
                        <div className={styles.folderBtnStats}
                             style={{
                                 zIndex: activeTab === 1 ? 112 : 110,
                                 marginBottom:  activeTab === 1 ? '0px' : '-12px',
                                 borderRight:  activeTab === 1 ? '2px solid #3842a4' : 'none',
                             }}
                             onClick={() => handleTab(1)}>friends</div>
                        <div
                            className={styles.folderBtnSkins}
                            style={{
                                zIndex: activeTab === 2 ? 113 : 110,
                                marginBottom:  activeTab === 2 ? '-0px' : '2px',
                            }}
                            onClick={() => handleTab(2)}
                        >info</div>
                    </div>
                    {activeTab === 1 && <div className={styles.friendsContainer}>
                        <div>
                            {progressPercent < 100 ? (
                                <div className={styles.bar}>
                                    <div
                                        className={styles.progress}
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            ) : (
                                <a href="/index.jsx?tab=2" className={styles.barFull}>
                                    <div className={styles.progressFull} style={{ width: `${progressPercent}%` }}>
                                    </div>
                                </a>
                            )}
                            <p className={styles.sign}>{friends.length}/{currentThreshold}</p>
                        </div>
                        <div className={styles.list}>
                            {friends.length === 0 ? (
                                <p className={styles.hintLabel}>Invite your friends</p>
                            ) : (
                                friends.map((item, index) => <ListItem teamId={item.group} key={index} item={item} />)
                            )}
                        </div>
                        <div className={styles.buttonset}>
                            <button className={styles.btnInvite} onClick={inviteClick}>INVITE</button>
                            <button className={styles.btnCopy} onClick={handleClick}>
                                <img src={copy} alt={'copy'} height={50} width={50} />
                            </button>
                        </div>
                    </div>}
                    {activeTab === 2 && <div className={styles.infoContainer}>
                        <div className={styles.listInfo}>
                            <div className={styles.hintLabel}>-Each <a>referral</a> gives you <a>+1 PvP pass.</a></div>
                            <div className={styles.hintLabel}>-<a>PvP Pass</a> – allows <a>5 extra PvP games</a>, bypassing the 6-hour cooldown.</div>
                            <div className={styles.hintLabel}>-If the referral has <a>Telegram Premium</a>, you get <a>+2 PvP passes</a>.</div>
                            <div className={styles.hintLabel}>Referrals <a>score 10,000 </a> <img src={money} alt={''} width={15} height={15} />    just for <a>signing up</a> (joining the bot) through your referral link!</div>
                            <div className={styles.rewards}>
                                <div className={styles.title}>Rewards</div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>1</a> referral</div>
                                    <div className={styles.hintLabel}><a>10000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>3</a> referrals</div>
                                    <div className={styles.hintLabel}><a>50000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>5</a> referrals</div>
                                    <div className={styles.hintLabel}><a>100000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>10</a> referrals</div>
                                    <div className={styles.hintLabel}><a>250000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>25</a> referrals</div>
                                    <div className={styles.hintLabel}><a>750000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>50</a> referrals</div>
                                    <div className={styles.hintLabel}><a>1500000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.hintLabel}><a>100</a> referrals</div>
                                    <div className={styles.hintLabel}><a>5000000 </a><img src={money} alt={''} width={15} height={15} /></div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}