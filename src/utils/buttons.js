function pointerOver(gameObjet, hex = 0xEFF0F1) {
    gameObjet.on('pointerdown', function () {
        this.setTint(hex);
    });
    pointerOut(gameObjet);
}

function pointerOut(gameObjet) {
    gameObjet.on('pointerout', function () {
        this.clearTint();
    });
}

function pointerUp(res = () => { }, gameObjet) {
    gameObjet.on('pointerup', () => {
        res();
    });
}

export {
    pointerOver,
    pointerOut,
    pointerUp
}