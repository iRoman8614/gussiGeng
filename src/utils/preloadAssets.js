export const preloadAssets = () => {
    const images = [
        '/gussiGeng/loading.gif',
        '/gussiGeng/backgrounds/nightcity.png',
        '/gussiGeng/characters/purpleChar.png',
        '/gussiGeng/gangs-logos/green-logo.png',
        '/gussiGeng/gangs-logos/purple-logo.png',
        '/gussiGeng/gangs-logos/red-logo.png',
        '/gussiGeng/gangs-logos/yellow-logo.png',
        '/gussiGeng/main-buttons/account.png',
        '/gussiGeng/main-buttons/bag.png',
        '/gussiGeng/main-buttons/boards.png',
        '/gussiGeng/main-buttons/friends.png',
        '/gussiGeng/main-buttons/hands.png',
        '/gussiGeng/main-buttons/home.png',
        '/gussiGeng/main-buttons/settings.png',
        '/gussiGeng/main-buttons/upgrades.png',
        '/gussiGeng/main-buttons/wallet.png',
        '/gussiGeng/claimBTN.png',
        '/gussiGeng/claimBTNclicked.png',
        '/gussiGeng/farm_border.png',
        '/gussiGeng/progress.png',
        '/gussiGeng/progressBar.png',
        '/gussiGeng/roundContainer.png',
        "/gussiGeng/timer.png",
        "/gussiGeng/totalbar.png",
        "/gussiGeng/winPBborder.png",
        "/gussiGeng/wins.png",
        "/gussiGeng/winsBG.png",
    ];
    return Promise.all(
        images.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        })
    );
};

export const preloadLoaders = () => {
    const images = [
        '/gussiGeng/loadingImg.png',
    ];
    return Promise.all(
        images.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        })
    );
};


export const preloadPvp = () => {
    const images = [
        '/gussiGeng/backgrounds/backalley.png',
        '/gussiGeng/game-icons/animation_hand_pap.gif',
        '/gussiGeng/game-icons/animation_hand_rock.gif',
        '/gussiGeng/game-icons/animation_hand_sci.gif',
        '/gussiGeng/game-icons/animation_hand_start.gif',
        '/gussiGeng/game-icons/hand_pap.png',
        '/gussiGeng/game-icons/hand_rock.png',
        '/gussiGeng/game-icons/hand_sci.png',
        '/gussiGeng/lampOnBG.png',
        '/gussiGeng/oppNickNameContainer.png',
        '/gussiGeng/paperActiveBG.png',
        '/gussiGeng/paperBtn.png',
        '/gussiGeng/rockActiveBG.png',
        '/gussiGeng/rockBtn.png',
        '/gussiGeng/scicBtn.png',
        '/gussiGeng/scisActiveBG.png',
    ];
    return Promise.all(
        images.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    console.log(`Successfully loaded: ${src}`);
                    resolve();
                };

                img.onerror = (error) => {
                    console.error(`Failed to load: ${src}`, error);
                    reject(error);
                };
            });
        })
    )
}