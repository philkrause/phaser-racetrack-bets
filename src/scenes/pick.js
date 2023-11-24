import Player from './player';
import Horses from './horses';

export default class Pick extends Phaser.Scene {
  

    constructor() {
        super({ key: 'pick' })
        this.player = new Player();
        this.horsesClass = new Horses();
        this.horseSelected = false;
        this.cashArrowUp;
        this.betCash = 0;
    }

    preload() {
        this.sceneStopped = false
        this.horseSelected = false
        this.betCash = 0;
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.load.image('ui', '../assets/images/bet_ui.png');
        this.load.image('start', '../assets/images/start.png');
        this.load.image('cash_arrow', '../assets/images/cash_arrow.png');
        this.load.image('max_bet', '../assets/images/max_bet.png');
 
        this.load.image('horse0_profile', '../assets/images/horse0_profile.png');
        this.load.image('horse1_profile', '../assets/images/horse1_profile.png');
        this.load.image('horse2_profile', '../assets/images/horse3_profile.png');
        this.load.image('horse3_profile', '../assets/images/horse4_profile.png');
        this.load.image('horse4_profile', '../assets/images/horse5_profile.png');
      }
      
      create() {

        //set up player variables
        if(!this.player.isFirstGame() || this.player.getCash() == 0){
          this.player.setCash(1000)
          this.cash = this.player.getCash();
        } else {
          this.cash = this.player.getCash();
        }
        //config scene
        const { width, height } = this
        
        this.handlerScene.updateResize(this)
        if (this.game.debugMode){
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        }

        this.background = this.add.image(width / 2, height / 2,'ui').setOrigin().setDepth(1)

        //cash text
        this.cashText = this.add.text(width *.25, height *.83, 'Cash: $' + this.cash, { fontFamily: 'font1', fill: '#00FF00' })
          .setFontSize(50)
          .setColor('#FFFFFF')
          .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
          .setDepth(2)
          .setOrigin(.5)
          .setAlign('center');

        //betamount text
        this.betText = this.add.text(width * .68, height *.83, 'Bet : $' + this.betCash, { fontFamily: 'font1', fill: '#00FF00' })
          .setFontSize(50)
          .setColor('#FFFFFF')
          .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
          .setDepth(2)
          .setOrigin(.5)
          .setAlign('center');

          //cash arrow
        this.cashArrowUp = this.add.image(this.betText.x + 120, this.betText.y-30, 'cash_arrow')
          .setScale(.6)
          .setDepth(2)
          .setOrigin(.5)
          .setRotation(Phaser.Math.DegToRad(90))
          .setInteractive();
          
          //cash arrow
        this.cashArrowDown = this.add.image(this.betText.x + 120, this.betText.y+30, 'cash_arrow')
          .setScale(.6)
          .setDepth(2)
          .setOrigin(.5)
          .setRotation(Phaser.Math.DegToRad(270))
          .setInteractive();

        //max bet
        this.maxBet = this.add.image(this.width *.9, this.height * .93, 'max_bet')
        .setScale(.8)
        .setDepth(2)
        .setOrigin(.5)
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

        this.horses = this.horsesClass.getHorses();
        
      
        //cash arrow
        this.cashArrowUp.on('pointerdown', () => {
          if(this.cash > 0){
            this.cash -= 100;
            this.betCash += 100;
            this.cashText.setText('Cash: $' + this.cash);
            this.betText.setText('Bet: $' + this.betCash);
            this.player.betCash(this.betCash);
            this.player.setCash(this.cash);
          }
        })
      

        //cash arrow
        this.cashArrowDown.on('pointerdown', () => {
          if(this.betCash > 0){
            this.cash += 100;
            this.betCash -= 100;
            this.cashText.setText('Cash: $' + this.cash);
            this.betText.setText('Bet: $' + this.betCash);
            this.player.betCash(this.betCash);
            this.player.setCash(this.cash);
          }
        })

        //max bet button
        this.maxBet.on('pointerdown', () => {
          if(this.cash > 0){
            this.cash = 0
            this.betCash += parseFloat(this.player.getCash())
            this.cashText.setText('Cash: $' + this.cash);
            this.betText.setText('Bet: $' + this.betCash);
            this.player.betCash(this.betCash);
            this.player.setCash(this.cash);
          }
        })


        this.horses.forEach((horse, index) => {


          this.time.addEvent({
            delay: 5000,
            callback : () => {},
            loop: true
          })
            const profilePic = this.add.image(this.width + 100, (this.height * .299) + (index*85), horse.profilepic)
                .setScale(.18)
                .setDepth(2)
                .setInteractive();
            const profileText = this.add.text(this.width+100,(this.height * .299) + (index*85),`${horse.name}`,{ fontFamily: 'font1', fill: '#00ff00' })
                .setFontSize(32)
                .setColor('#FFFFFF')
                .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
                .setDepth(2);
            
            this.tweens.add({
              targets: [profilePic,profileText],
              x: (this.width/2) - 55,
              duration: 600,
              delay: 300 * index,
              yoyo: false,
              ease: 'bounce'
            })

            this.tweens.add({
              targets: [profileText],
              x: (this.width/2) + 50,
              delay: 300 * index,
              duration: 600,
              yoyo: false,
              ease: 'bounce'
            })
            profilePic.on('pointerdown', () => {
                if(this.horseSelected === false){
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
                }
            }); 
                  
        });

        //start button
        const startButton = this.add.image((this.width/2), (this.height * .91), 'start').setScale(1).setDepth(2).setInteractive();

        this.tweens.add({
          targets: [startButton],
          scale: {
              from: .3,
              to: .4,
              },
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: 'Linear'
        })


        startButton.on('pointerdown', () => {
  
            if(this.horseSelected === true && this.betCash > 0) {
                this.sceneStopped = true
                this.scene.stop('pick')
                this.handlerScene.launchScene('race')
            }
          })
                
    }



   

}
