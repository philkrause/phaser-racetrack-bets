export default class Title extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = null
    sceneStopped = false


    constructor() {
        super({ key: 'title' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.load.image('title', '../assets/images/title_540x960.png');
        this.load.image('play', '../assets/images/button_play.png');

    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        // CONFIG SCENE 

        this.background = this.add.image(width / 2, height / 2,'title').setOrigin().setDepth(1)
        this.add.image(width / 2, height / 2,'title').setOrigin().setDepth(1)

        this.playBtn = this.add.image(width / 2, height * .9, 'play').setOrigin(.5).setDepth(3).setScale(.7).setInteractive();
        
        this.playBtn.on('pointerdown', () => {
            this.sceneStopped = true
            this.scene.stop('title')
            this.handlerScene.launchScene('pick')
        });
        
        this.tweens.add({
            targets: [this.playBtn],
            scale: {
                from: .7,
                to: .8,
                },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear'
            })
    }
}
