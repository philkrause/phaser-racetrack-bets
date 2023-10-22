export default class Pick extends Phaser.Scene {

    // Vars
    width = null
    height = null
    handlerScene = null
    sceneStopped = false


    constructor() {
        super({ key: 'pick' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.load.image('ui', '../assets/images/bet_ui.png');
        this.load.image('horse0_profile', '../assets/images/horse0_profile.png');
        this.load.image('horse1_profile', '../assets/images/horse1_profile.png');
        this.load.image('horse2_profile', '../assets/images/horse3_profile.png');
        this.load.image('horse3_profile', '../assets/images/horse4_profile.png');
        this.load.image('horse4_profile', '../assets/images/horse5_profile.png');
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)

        this.background = this.add.image(width / 2, height / 2,'ui').setOrigin().setDepth(1)
   
   
        this.horses = [{
            name: 'Viscount',
            dashing: false,
            speed: 3,
            stamina: 1,
            rank: 0,
            profilepic: 'horse0_profile'
          },
          {
            name: 'Grace',
            dashing: false,
            speed: 1,
            stamina: 1,
            rank: 0,
            profilepic: 'horse1_profile'
          },
          {
            name: 'Rufus',
            dashing: false,
            speed: 1,
            stamina: 1,
            rank: 0,
            profilepic: 'horse2_profile'
          },
          {
            name: 'Izzy',
            dashing: false,
            speed: 1,
            stamina: 1,
            rank: 0,
            profilepic: 'horse3_profile'
          },
          {
            name: 'Dorian',
            dashing: false,
            speed: 1,
            stamina: 1,
            rank: 0,
            profilepic: 'horse4_profile'
          }
        ]  


        this.horses.forEach((horse, index) => {
           const profilePic = this.add.image((this.width/2) - 55, (this.height * .299) + (index*85), horse.profilepic).setScale(.18).setDepth(2).setInteractive();
             this.add.text(
                (this.width/2) + 50,
                (this.height * .299) + (index*85), 
                `${horse.name}`,{ fontFamily: 'font1', fill: '#00ff00' })
                .setFontSize(32).setColor('#FFFFFF').setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setDepth(2);

        
                profilePic.on('pointerdown', () => {
                  this.sceneStopped = true
                  this.scene.stop('pick')
                  this.handlerScene.launchScene('race')
              });            
            })



        const placebetText = this.add.text(
          (this.width/2),
          (this.height * .17), 
          "Place your Bets!",{ fontFamily: 'font1', fill: '#00ff00' })
          .setFontSize(48).setColor('#FFFFFF').setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setDepth(2).setOrigin(.5);

          this.tweens.add({
            targets: [placebetText],
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
