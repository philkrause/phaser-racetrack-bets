import Player from './player';


export default class Pick extends Phaser.Scene {
  
  // Vars
    width = null
    height = null
    handlerScene = null
    sceneStopped = false

    constructor() {
        super({ key: 'pick' })
        this.player = new Player();
        this.horseSelected = false;
        this.cashArrowUp;
        this.betCash = 0;
        this.cash = 0;
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.cash = 0;
        this.handlerScene = this.scene.get('handler')
        this.load.image('ui', '../assets/images/bet_ui.png');
        this.load.image('checkmark', '../assets/images/checkmark.png');
        this.load.image('cash_arrow', '../assets/images/cash_arrow.png');
        this.load.image('horse0_profile', '../assets/images/horse0_profile.png');
        this.load.image('horse1_profile', '../assets/images/horse1_profile.png');
        this.load.image('horse2_profile', '../assets/images/horse3_profile.png');
        this.load.image('horse3_profile', '../assets/images/horse4_profile.png');
        this.load.image('horse4_profile', '../assets/images/horse5_profile.png');
    }

    create() {
        this.player.setUpPlayer();
        this.cash = 1000;
        console.log(`Starting Cash ${this.cash}`)
        const { width, height } = this
        
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode){
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        }

        this.background = this.add.image(width / 2, height / 2,'ui').setOrigin().setDepth(1)

        //cash text
        this.cashText = this.add.text(width *.2, height *.85, 'Cash: $' + this.cash, { fontFamily: 'font1', fill: '#00FF00' })
          .setFontSize(50)
          .setColor('#FFFFFF')
          .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
          .setDepth(2)
          .setOrigin(.5)
          .setAlign('center');

        //betamount text
        this.betText = this.add.text(width * .7, height *.85, 'Bet : $' + this.betCash, { fontFamily: 'font1', fill: '#00FF00' })
        .setFontSize(50)
        .setColor('#FFFFFF')
        .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
        .setDepth(2)
        .setOrigin(.5)
        .setAlign('center');


          //cash arrow
        this.cashArrowUp = this.add.image(this.betText.x + 100, this.betText.y-30, 'cash_arrow')
          .setScale(.6)
          .setDepth(2)
          .setOrigin(.5)
          .setRotation(Phaser.Math.DegToRad(90))
          .setInteractive();
          
          //cash arrow
        this.cashArrowDown = this.add.image(this.betText.x + 100, this.betText.y+30, 'cash_arrow')
          .setScale(.6)
          .setDepth(2)
          .setOrigin(.5)
          .setRotation(Phaser.Math.DegToRad(270))
          .setInteractive();
    
          const placebetText = this.add.text((this.width/2),(this.height * .17),"Place your Bets!",{ fontFamily: 'font1', fill: '#00ff00' })
          .setFontSize(60)
          .setColor('#FFFFFF')
          .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
          .setDepth(2)
          .setOrigin(.5);

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
            rafromnk: 0,
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
        
          if(this.cash >=  0){
            //cash arrow
            this.cashArrowUp.on('pointerdown', () => {
              this.cash -= 100;
              this.betCash += 100;
              this.cashText.setText('Cash: $' + this.cash);
              this.betText.setText('Bet: $' + this.betCash);
            })
          }
            //cash arrow
            this.cashArrowDown.on('pointerdown', () => {
              this.cash += 100;
              this.betCash -= 100;
              this.cashText.setText('Cash: $' + this.cash);
              this.betText.setText('Bet: $' + this.betCash);
              console.log(this.player.betCash())
            })
           


        this.horses.forEach((horse, index) => {

            const profilePic = this.add.image((this.width/2) - 55, (this.height * .299) + (index*85), horse.profilepic)
                .setScale(.18)
                .setDepth(2)
                .setInteractive();
            const profileText = this.add.text((this.width/2) + 50,(this.height * .299) + (index*85),`${horse.name}`,{ fontFamily: 'font1', fill: '#00ff00' })
                .setFontSize(32)
                .setColor('#FFFFFF')
                .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
                .setDepth(2);

              if(this.horseSelected === false){
                  profilePic.on('pointerdown', () => {
                    this.horseSelected = true;

                    this.player.setHorseBetOn(horse.name);

                    this.tweens.add({
                      targets: [profilePic],
                      scale: {
                          from: .15,
                          to: .2,
                          },
                      duration: 1000,
                      yoyo: true,
                      repeat: -1,
                      ease: 'Linear'
                      })

                    this.tweens.add({
                      targets: [profileText],
                      scale: {
                          from: 1,
                          to: 1.2,
                          },
                      duration: 1000,
                      yoyo: true,
                      repeat: -1,
                      ease: 'Linear'
                      })
                    

                    if(this.horseSelected === true) {
                      console.log("horse selected")
                        this.add.image(profilePic.x, profilePic.y, 'checkmark').setScale(.5).setDepth(2);
                        // this.sceneStopped = true
                        // this.scene.stop('pick')
                        // this.handlerScene.launchScene('race')
                    }
                    
                  }); 
              }         
         });

    }




}
