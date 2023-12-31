import Player from './player'


export default class Race extends Phaser.Scene {

  // Vars
  handlerScene = null


  constructor() {
      super({ key: 'race' })
      this.realTime = 0;
      this.createDashTimer = 0;
      this.finish = false;
      this.winner_finish = false;
      this.stars = null;
      this.width = null;
      this.height = null;
      this.player = new Player();
      this.profilePics = [];
      this.cups = [];
      this.finishers = [];
      this.renderWinnerText = true;
      this.renderLoseText = true;
      this.renderRankText = true;
  }

  preload() {
      this.sceneStopped = false
      this.width = this.game.screenBaseSize.width
      this.height = this.game.screenBaseSize.height
      this.handlerScene = this.scene.get('handler')
      //determines coures length
      this.courseLength = 20;
      this.winner_finish = false;
      this.renderWinnerText = true;
      this.renderLoseText = true;
      this.renderRankText = true;
      this.realTime = 0;
      this.createDashTimer = 0;
      this.finishers = [];
      this.profilePics = [];

      this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
      this.load.image('background1_seats', '../assets/images/background1_seats.png');
      this.load.image('background1_course', '../assets/images/background1_course.png');
      this.load.image('background1_wall', '../assets/images/background1_wall.png');
      this.load.image('background1_trees', '../assets/images/background1_trees.png');
      this.load.image('background1_fence', '../assets/images/background1_fence.png');
      this.load.image('background1_finish', '../assets/images/background1_finish.png');
      this.load.image('background_title', '../assets/images/background_title.png');
      this.load.image('background_ui', '../assets/images/race_ui.png');
      this.load.image('horse0_profile', '../assets/images/horse0_profile.png');
      this.load.image('horse1_profile', '../assets/images/horse1_profile.png');
      this.load.image('horse2_profile', '../assets/images/horse3_profile.png');
      this.load.image('horse3_profile', '../assets/images/horse4_profile.png');
      this.load.image('horse4_profile', '../assets/images/horse5_profile.png');
      this.load.image('finish_line', '../assets/images/finish_line.png');
      this.load.image('star', '../assets/images/star.png');
      this.load.image('gold_cup', '../assets/images/gold_cup.png');
      this.load.image('silver_cup', '../assets/images/silver_cup.png');
      this.load.image('bronze_cup', '../assets/images/bronze_cup.png');
      this.load.image('play_again', '../assets/images/play_again.png');


      this.load.spritesheet('coins', '../assets/images/coinsheet.png', {frameWidth: 25,frameHeight: 25 });

      this.load.spritesheet('horse0', '../assets/images/horse0_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });
      this.load.spritesheet('horse1', '../assets/images/horse2_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });
      this.load.spritesheet('horse2', '../assets/images/horse3_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });
      this.load.spritesheet('horse3', '../assets/images/horse4_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });
      this.load.spritesheet('horse4', '../assets/images/horse5_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });



  }

  create() {

      this.horsebeton = this.player.getHorseBetOn();
      this.betAmount = this.player.getBetCash();

      const { width, height } = this
      // CONFIG SCENE        
      this.handlerScene.updateResize(this)
      
      if (this.game.debugMode)
          this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        
      //GAME OBJECTS
      this.background_clouds = this.add.tileSprite(this.width/2, this.height * .1, 0, 0, 'background1_clouds').setDepth(1).setScale(1);
      this.background_seats = this.add.tileSprite(this.width/2, this.background_clouds.y + 60, 0, 0, 'background1_seats').setDepth(3);
      this.background_trees = this.add.tileSprite(this.width/2, this.background_clouds.y + 97, 0, 0, 'background1_trees').setDepth(4);
      this.background_course = this.add.tileSprite(this.width/2, this.background_clouds.y + 235, 0, 0, 'background1_course').setDepth(3);
      this.background_fence = this.add.tileSprite(this.width/2, this.background_clouds.y + 115, 0, 0, 'background1_fence').setDepth(5);
      this.background_fence2 = this.add.tileSprite(this.width/2, this.background_clouds.y + 340, 0, 0, 'background1_fence').setDepth(5);
      this.background_ui = this.add.image(this.width/2,this.background_fence2.y + 270,'background_ui');
      
      this.allBackgrounds = [
          {
            background: this.background_clouds,
            tileSpeed: 1,
          },
          {
            background:this.background_seats,
            tileSpeed: 2,
          },
          {
            background: this.background_trees,
            tileSpeed: 4,
          },
          {
            background:this.background_course,
            tileSpeed: 8,
          },      
          {
            background: this.background_fence,
            tileSpeed: 8,
          },      
          {
            background: this.background_fence2,
            tileSpeed: 8,
          },
        ]

    //create animation function
    const createAnim = (sprite) => {
      this.anims.create({
        key: `${sprite}-run`,
        frames: this.anims.generateFrameNumbers(sprite, {
          start: 0,
          end: 11
        }),
        frameRate: 15,
        repeat: -1,
        timeScale: 1
      });
    }

    this.horse0 = this.physics.add.sprite(width * .5 - 150, this.background_seats.y + 60, 'horse0').setScale(.3).setDepth(5);
    this.horse1 = this.physics.add.sprite(width * .5 - 150, this.horse0.y + 40, 'horse1').setScale(.3).setDepth(5);
    this.horse2 = this.physics.add.sprite(width * .5 - 150, this.horse0.y + 80, 'horse2').setScale(.3).setDepth(5);
    this.horse3 = this.physics.add.sprite(width * .5 - 150, this.horse0.y + 120, 'horse3').setScale(.3).setDepth(5);
    this.horse4 = this.physics.add.sprite(width * .5 - 150, this.horse0.y + 160 , 'horse4').setScale(.3).setDepth(5);


    this.horses = [{
      horse: this.horse0,
      name: 'Big Red',
      dashing: false,
      speed: 3,
      stamina: 1,
      rank: 0,
      profilepic: 'horse0_profile',
      finished : false
    },
    {
      horse: this.horse1,
      name: 'Leroy',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse1_profile',
      finished : false
    },
    {
      horse: this.horse2,
      name: 'Milo',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse2_profile',
      finished : false
    },
    {
      horse: this.horse3,
      name: 'Brody',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse3_profile',
      finished : false
    },
    {
      horse: this.horse4,
      name: 'Izzy',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse4_profile',
      finished : false
    }
  ]




    //ANIMATIONS-----------------------------------------

    this.horses.forEach((h, index) => {
      
      //create animations
      createAnim(`horse${index}`)
      
      const profilePic = this.add.image(this.width/2, (this.background_fence2.y + 55) + (108*index), h.profilepic).setScale(.18).setDepth(6)
      this.profilePics.push(profilePic)

      const horseName = this.add.text(60,(this.background_fence2.y + 35) + (110*index), `${h.name}`,{ fontFamily: 'font1', fill: '#00ff00' }).setFontSize(40).setColor('#FFFFFF').setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

      if(this.horsebeton == h.name){
          
        this.tweens.add({
            targets: [profilePic],
            scale: {
                from: .18,
                to: .3,
                },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Linear'
          })

          this.tweens.add({
            targets: [horseName],
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
    })


    //dash
    this.createDash = (sprite, delay) => {

      this.tweens.add({
        targets: [sprite.horse],
        x: 300,
        duration: 6000,
        hold: 700,
        loopDelay: delay,
        onComplete: () => {
          sprite.dashing = false
        },
        yoyo: true,
      })
    }

    this.profileDash = (sprite, delay) => {

      this.tweens.add({
        targets: [sprite],
        x: 30,
        duration: 6000,
        hold: 700,
        loopDelay: delay,
        yoyo: false,
      })
    }

    //animation for the finish
    this.createFinishDash = (sprite) => {
      const horse = sprite.horse;
      this.tweens.add({
        targets: [horse],
        x: 1000,
        duration: 700,
        onComplete: () => {
          sprite.dashing = false
          horse.destroy();
        },
      })
    }

    //creating the finish line assets
    this.finish_line = () => { 
      this.background1_finish = this.add.image(this.width-70, this.background_fence.y - 10, 'background1_finish').setScale(.6).setDepth(4);
      this.finish_line_sprite = this.physics.add.sprite(this.width-70, this.background_course.y - 10, 'finish_line')
      .setScale(.4)
      .setRotation(Phaser.Math.DegToRad(90))
      .setDepth(3)
      .setAlpha(.8)
    }

    //text
    this.timer = this.add.text(
      80,
      20, 
      "", 
    {
      fontFamily: 'font1',
    });
    this.timer.setFontSize(24)
    
    
    //Coins-----------------------------------------
    this.coinsGroup = this.physics.add.group();

    this.anims.create({
      key: 'coin-spin',
      frames: this.anims.generateFrameNumbers('coins', {
        start: 0,
        end: 5
      }),
      frameRate: 15,
      repeat: -1,
      timeScale: 1
    });
    
    this.spawnCoins = () => {
      let x = Phaser.Math.Between(0, this.width);
      let y = 0;
    
      let coin = this.coinsGroup.create(x, y, 'coins');
      coin.anims.play('coin-spin');
      coin.setCollideWorldBounds(false, 1, 1);
      coin.setDepth(6);
      coin.setGravityY(1000);
      coin.setVelocity(Phaser.Math.Between(-400, 400), -200);
    };

    //cash management
    this.cashText = (win,place) => {

      let cashBet = this.player.getBetCash();
      let cashWon = cashBet * place
      let cash = this.add.text(this.width/2, this.height/2 + 200, `Cash Won $${cashWon}`,{ fontFamily: 'font1', fill: '#00ff00' })
      .setFontSize(52)
      .setColor('#00FF00')
      .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
      .setDepth(7)
      .setOrigin(.5);

      if(win === true) {
        cash.setText(`$${cashWon}`).setScale(2);
        this.player.setCash(cashWon)
        
        //count up for cash won
        this.tweens.add({
          targets: { value: 0 },
          value: cashWon,
          duration: 3000,
          onUpdate: function (tween) {
              cash.setText(Math.floor(tween.getValue()));
          },
          onComplete: function () {
              cash.setText(`$${cashWon}`); 
          },
          callbackScope: this
        });
  
      }

    }

    this.rankText = (yPosition,winners) => {
      
        let text = this.add.text(this.width, yPosition, winners,{ fontFamily: 'font1', fill: '#00ff00' })
          .setFontSize(48)
          .setColor('#FFFFFF')
          .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
          .setDepth(7)
          .setOrigin(.5);

          this.tweens.add({
            targets: [text],
            x: this.width/2,
            duration: 1000,
            ease: 'Linear'
          })
    }   

    //trophy logic
    this.createTrophies = () => {
      this.gold_cup = this.add.image(this.width, this.height*.1, 'gold_cup').setDepth(7).setAlpha(1);
      this.silver_cup = this.add.image(this.width, this.gold_cup.y+160, 'silver_cup').setDepth(7).setAlpha(1);
      this.bronze_cup = this.add.image(this.width, this.silver_cup.y+160, 'bronze_cup').setDepth(7).setAlpha(1);
                    
      this.tweens.add({
        targets: [this.gold_cup,this.silver_cup,this.bronze_cup],
        x: this.width/2,
        duration: 1000,
        ease: 'Linear',
        yoyo: false
      })
      
    }

    this.winnerText=()=> {

      let winner = this.add.text(this.width/2, this.height/2 + 100, `WINNER`,{ fontFamily: 'font1', fill: '#00FF00' })
        .setFontSize(48)
        .setColor('#00FF00')
        .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
        .setDepth(7)
        .setOrigin(.5);
      
      this.tweens.add({
        targets: [winner],
        scale: {
          from: 1,
          to: 2
        },
        duration: 1000,
        ease: 'Linear',
        yoyo:true,
        repeat: -1
      })

    }

    this.loseText = (message) => {

      let lose =  this.add.text(this.width/2,this.height*.64,message,{ fontFamily: 'font1', fill: '#00ff00' })
        .setFontSize(48)
        .setColor('#FF0000')
        .setShadow(3, 3, 'rgba(0,0,0,0.5)', 5)
        .setDepth(7)
        .setOrigin(.5);

      this.tweens.add({
        targets: [lose],
        scale: {
          from: 1.3,
          to:2.5
        }, 
        duration: 1200,
        yoyo:true,
        repeat: -1,
        ease: 'Linear'
      })
  
    } 


    this.createplayAgain = () => {
      let playagain = this.add.sprite(this.width/2,this.height*.9,'play_again')
        .setInteractive()
        .setDepth(7);

      this.tweens.add({
        targets: [playagain],
        scale: {
            from: 1,
            to: 1.2,
            },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Linear'
        })

      playagain.on('pointerdown', () => {
            this.player.setFirstGameStatus(false)
            this.sceneStopped = true
            this.scene.stop('race')
            this.handlerScene.launchScene('pick')
  
      },this)
    }


  }


  
  //UPDATE-------------------------------------------------------------------------------
  update() {
    

    this.realTime += 1/60
    this.createDashTimer += 1/60
    this.timer.setText(`${(this.realTime).toFixed(2)}`)
    this.textRendered = false;
    //determine when to end the race
    this.realTime <= this.courseLength ? this.finish = false : this.finish = true;

    //if race ongoing
    if(this.finish == false){ 


      //horse animations
      if(this.horses.length > 0){
        this.horses.forEach((h, index) => {
          h.horse.anims.play(`horse${index}-run`, true)
        })
      }
      //profilepic animations
      if(this.horses.length > 0){
        this.profilePics.forEach((pic, index) => {
          if(this.horses[index]){
            pic.x = ((this.width/2) - 60) + (this.horses[index].horse.x/2) 
          }
        })
      }
      
        //create Dash
        if(this.createDashTimer >= 2){

          let rng = Phaser.Math.Between(0,this.horses.length-1)

          let horse = this.horses[rng]
          let horseDashing = this.horses[rng].dashing;

          if(!horseDashing){
            horse.dashing = true;
            this.createDash(horse, 1000)
            this.createDashTimer = 0;
          } 

          horseDashing = false;
        
        }

        //background motion
        this.allBackgrounds.forEach(b => {b.background.tilePositionX += b.tileSpeed})
    }

    //final dash to finish line
    if (this.finish == true) {

          //create finish line sprite
          this.finish_line()
            
          //change the horse animation
          this.horses.forEach(h  => {

            //create dash animation
            this.createFinishDash(h,true)
            this.realTime += 1/60
            this.createDashTimer += 1/60
            //choose winner based on x position
            if(h.horse.x >= 298 && this.renderWinnerText == true) {
              //create array of finishers
              if(h.finished === false && this.renderWinnerText === true){
                this.finishers.push(h.name);
                h.finished = true;
              }
            }
          })

          //if all horses finished create trophies and winners
          const allHorsesFinished = this.horses.every((horse,index)=> {
            return horse.finished == true
          });
          if(allHorsesFinished) {
            this.winner_finish = true;
          }
    }


    //Winner animations
    if(this.winner_finish === true) {


        if(this.renderRankText === true){
          this.createTrophies()
          this.rankText(170,this.finishers[0])
          this.rankText(330,this.finishers[1])
          this.rankText(490,this.finishers[2])
          this.renderRankText = false
        }
        //determine if horsebet on was placed
        if(this.horsebeton === this.finishers[0] || this.horsebeton === this.finishers[1] || this.horsebeton === this.finishers[2]) {
        //check if the horse you bet on finished in the top 3
          this.renderLoseText = false;
          this.spawnCoins();

          if(this.renderWinnerText === true){
            this.winnerText();
            this.createplayAgain();
            this.renderWinnerText = false;

            //payouts  
            if(this.finishers[0] === this.horsebeton) {
              this.cashText(true,6)
              console.log("Bet on Horse placed first")
              this.renderWinnerText = false;
              this.winner_finish = false;
            } 
            if(this.finishers[1] === this.horsebeton) {
              this.cashText(true,3)
              console.log("Bet on Horse placed second")
              this.winner_finish = false;
              this.renderWinnerText = false;

            } 
            if(this.finishers[2] === this.horsebeton) {
              this.cashText(true,2)
              console.log("Bet on Horse placed third")
              this.winner_finish = false;
              this.renderWinnerText = false;

            }
          }
        }
        //if no win
        if(this.renderLoseText === true) {
          this.renderWinnerText = false;
          this.player.getCash() == 0 ? this.loseText("Busted") : this.loseTest("You Lose");
          this.renderLoseText = false;
          this.createplayAgain();
        }
      
    } 

      //destroy coins
      this.coinsGroup.getChildren().forEach(coin => {
        if (coin.y > this.height) {
          coin.destroy(); 
        }
      });

  }

}
