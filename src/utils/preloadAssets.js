export const preloadAssets = () => {
    const images = [
        '/gussiGeng/loading.gif',
        '/gussiGeng/loadingImg.png',
        '/gussiGeng/backgrounds/backalley.png',
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
        '/gussiGeng/lampOnBG.png',
        '/gussiGeng/paperActiveBG.png',
        '/gussiGeng/progress.png',
        '/gussiGeng/rockActiveBG.png',
        '/gussiGeng/scisActiveBG.png',
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
