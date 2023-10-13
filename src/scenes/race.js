export default class Race extends Phaser.Scene {

  // Vars
  handlerScene = false
  sceneStopped = false

  constructor() {
      super({ key: 'race' })
      this.realTime = 0;
      this.createDashTimer = 0;
  }

  preload() {
      this.sceneStopped = false
      this.width = this.game.screenBaseSize.width
      this.height = this.game.screenBaseSize.height
      this.handlerScene = this.scene.get('handler')
      this.handlerScene.sceneRunning = 'race'

      this.courseLength = 10

      this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
      this.load.image('background1_seats', '../assets/images/background1_seats.png');
      this.load.image('background1_course', '../assets/images/background1_course.png');
      this.load.image('background1_wall', '../assets/images/background1_wall.png');
      this.load.image('background1_trees', '../assets/images/background1_trees.png');
      this.load.image('background1_fence', '../assets/images/background1_fence.png');
      this.load.image('background1_finish', '../assets/images/background1_finish.png');
      this.load.image('finish_line', '../assets/images/finish_line.png');

      this.load.spritesheet('horse0', '../assets/images/horse1_sheet.png', {
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
      const { width, height } = this
      // CONFIG SCENE         
      this.handlerScene.updateResize(this)
      this.canvasWidth = this.sys.game.canvas.width
      this.canvasHeight = this.sys.game.canvas.height

      this.width = this.game.screenBaseSize.width
      this.height = this.game.screenBaseSize.height

      this.handlerScene = this.scene.get('handler')
      this.handlerScene.sceneRunning = 'race'
      if (this.game.debugMode)
          this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        
        // this.add.text(width/2,height * .8, 'New Game', {
        //     fontFamily: 'font1',
        // });
      //GAME OBJECTS
      this.background_clouds = this.add.tileSprite(this.width/2, this.height * .2, 0, 0, 'background1_clouds').setDepth(1).setScale(1);
      this.background_seats = this.add.tileSprite(this.width/2, this.background_clouds.y + 60, 0, 0, 'background1_seats').setDepth(3);
      this.background_trees = this.add.tileSprite(this.width/2, this.background_clouds.y + 97, 0, 0, 'background1_trees').setDepth(4);
      this.background_course = this.add.tileSprite(this.width/2, this.background_clouds.y + 235, 0, 0, 'background1_course').setDepth(3);
      this.background_fence = this.add.tileSprite(this.width/2, this.background_clouds.y + 115, 0, 0, 'background1_fence').setDepth(5);
      this.background_fence2 = this.add.tileSprite(this.width/2, this.background_clouds.y + 340, 0, 0, 'background1_fence').setDepth(5);
      
      
    this.allBackgrounds = [
        {
          background: this.background_clouds,
          tileSpeed: 1,
        },
        {
          background:this.background_seats,
          tileSpeed: 4,
        },
        {
          background: this.background_trees,
          tileSpeed: 5,
        },
        {
          background:this.background_course,
          tileSpeed: 7,
        },      
        {
          background: this.background_fence,
          tileSpeed: 7,
        },      
        {
          background: this.background_fence2,
          tileSpeed: 7,
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

    this.horse0 = this.physics.add.sprite(width * .5 - 100, this.background_seats.y + 55, 'horse0').setScale(.3).setDepth(4);
    this.horse1 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 35, 'horse1').setScale(.3).setDepth(4);
    this.horse2 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 70, 'horse2').setScale(.3).setDepth(4);
    this.horse3 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 110, 'horse3').setScale(.3).setDepth(4);
    this.horse4 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 150, 'horse4').setScale(.3).setDepth(4);

    this.horses = [{
      horse: this.horse0,
      name: 'Viscount',
      dashing: false,
      speed: 3,
      stamina: 1,
      rank: 0,
      profilepic: 'horse0_profile'
    },
    {
      horse: this.horse1,
      name: 'Lady Grace',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse1_profile'
    },
    {
      horse: this.horse2,
      name: 'Princess April',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse2_profile'
    },
    {
      horse: this.horse3,
      name: 'Izzy',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse3_profile'
    },
    {
      horse: this.horse4,
      name: 'Lord Dorian',
      dashing: false,
      speed: 1,
      stamina: 1,
      rank: 0,
      profilepic: 'horse4_profile'
    },
  ]


    //animations and stats
    this.horses.forEach((h, index) => {
      createAnim(`horse${index}`)
    })



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
    
    this.createFinish = (sprite) => {
      this.tweens.add({
        targets: [sprite.horse],
        x: 700,
        duration: 700,
      })
    }

  }

  
  update() {

    this.realTime += 1/60
    this.createDashTimer += 1/60

    //animations
    this.horses.forEach((h, index) => {
      h.horse.anims.play(`horse${index}-run`, true)
    })

    //if race is still continues
    if(this.realTime <= this.courseLength){ 

      //create Dash
      if(this.createDashTimer >= 2 && this.realTime <= this.courseLength){

        let rng = Phaser.Math.Between(0,this.horses.length-1)
        
        let horse = this.horses[rng]
        let horseDashing = this.horses[rng].dashing;

        if(!horseDashing){        
          this.horses[rng].dashing = true;
          this.createDash(horse, 1000)
          this.createDashTimer = 0;
        } 
      
      }

      //background motion
      this.allBackgrounds.forEach(b => {
      b.background.tilePositionX += b.tileSpeed
      })
    } else { //FINISH
      this.finish_line = this.add.image(this.scale.width-20, this.background_course.y - 10, 'finish_line').setScale(.4).setRotation(Phaser.Math.DegToRad(90)).setDepth(3).setAlpha(.8);
      this.background1_finish = this.add.image(this.scale.width-20, this.background_fence.y, 'background1_finish').setScale(.6).setDepth(4);
            
      this.horses.forEach(h => {
        this.createFinish(h, true)
      })
    }
  }

}
