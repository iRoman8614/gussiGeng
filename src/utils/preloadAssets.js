export const preloadAssets = () => {
    const images = [
        //загрузочные
        '/gussiGeng/loading.gif',
        //папка backgrounds2
        '/gussiGeng/backgrounds/backalley.png',
        '/gussiGeng/backgrounds/nightcity.png',
        //папка characters 1
        '/gussiGeng/characters/purpleChar.png',
        //папка logos 4
        '/gussiGeng/gangs-logos/green-logo.png',
        '/gussiGeng/gangs-logos/purple-logo.png',
        '/gussiGeng/gangs-logos/red-logo.png',
        '/gussiGeng/gangs-logos/yellow-logo.png',
        //папка main-buttons 9
        '/gussiGeng/main-buttons/account.png',
        '/gussiGeng/main-buttons/bag.png',
        '/gussiGeng/main-buttons/boards.png',
        '/gussiGeng/main-buttons/friends.png',
        '/gussiGeng/main-buttons/hands.png',
        '/gussiGeng/main-buttons/home.png',
        '/gussiGeng/main-buttons/settings.png',
        '/gussiGeng/main-buttons/upgrades.png',
        '/gussiGeng/main-buttons/wallet.png',
        //папка game-icons 7
        // '/gussiGeng/animation_hand_pap.gif',
        // '/gussiGeng/animation_hand_rock.gif',
        // '/gussiGeng/animation_hand_sci.gif',
        // '/gussiGeng/animation_hand_start.gif',
        // '/gussiGeng/hand_pap.png',
        // '/gussiGeng/hand_rock.png',
        // '/gussiGeng/hand_sci.png',
        // public 19
        '/gussiGeng/claimBTN.png',
        '/gussiGeng/claimBTNclicked.png',
        '/gussiGeng/farm_border.png',
        // '/gussiGeng/lampOnBG.png',
        // '/gussiGeng/oppNickNameContainer.png',
        // '/gussiGeng/paperActiveBG.png',
        // '/gussiGeng/paperBtn.png',
        '/gussiGeng/progress.png',
        '/gussiGeng/progressBar.png',
        // '/gussiGeng/rockActiveBG.png',
        // '/gussiGeng/rockBtn.png',
        '/gussiGeng/roundContainer.png',
        // '/gussiGeng/scicBtn.png',
        // '/gussiGeng/scisActiveBG.png',
        "/gussiGeng/timer.png",
        "/gussiGeng/totalbar.png",
        "/gussiGeng/winPBborder.png",
        "/gussiGeng/wins.png",
        "/gussiGeng/winsBG.png",
        //'/gussiGeng/',
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
