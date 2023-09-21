import * as Config from '../config/constants';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super({
      key: 'GameSceneKey'
    });

    this.gameSpeed = Config.GAME_SPEED;
    this.background_clouds;
    this.createHorse;
    this.horse1;
    this.realTime = 0;
    this.createDashTimer = 0;
    this.realtimeText;
    this.allBackgrounds = [];
    this.rngDash = false;
  }

  //PRELOAD===================================================================================
  preload() {
    this.load.image('background1', '../assets/images/background1.png');
    this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
    this.load.image('background1_seats', '../assets/images/background1_seats.png');
    this.load.image('background1_course', '../assets/images/background1_course.png');
    this.load.image('background1_wall', '../assets/images/background1_wall.png');
    this.load.image('background1_trees', '../assets/images/background1_trees.png');
    this.load.image('background1_fence', '../assets/images/background1_fence.png');

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
    this.load.bitmapFont('ccFont', '../assets/fonts/carrier_command.png', '../assets/fonts/carrier_command.xml');

  }

  //CREATE===================================================================================
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    this.background_clouds = this.add.tileSprite(width, 243, 0, 0, 'background1_clouds').setDepth(1);
    this.background_wall = this.add.tileSprite(0, 360, 0, 0, 'background1_wall').setDepth(2);
    this.background_seats = this.add.tileSprite(0, 292, 0, 0, 'background1_seats').setDepth(3);
    this.background_trees = this.add.tileSprite(0, 330, 0, 0, 'background1_trees').setDepth(4);
    this.background_course = this.add.tileSprite(0, 492, 0, 0, 'background1_course').setDepth(3);
    this.background_fence = this.add.tileSprite(0, 365, 0, 0, 'background1_fence').setDepth(3);
    this.background_fence2 = this.add.tileSprite(0, 602, 0, 0, 'background1_fence').setDepth(3);

    this.allBackgrounds = [
      {
        background: this.background_clouds,
        tileSpeed: .5,
      },
      {
        background:this.background_seats,
        tileSpeed: 2,
      },
      {
        background: this.background_trees,
        tileSpeed: 3,
      },
      {
        background: this.background_wall,
        tileSpeed: 3,
      },
      {
        background:this.background_course,
        tileSpeed: 4,
      },      {
        background: this.background_fence,
        tileSpeed: 4,
      },      {
        background: this.background_fence2,
        tileSpeed: 4,
      },
    ]
    //text
    this.realtimeText = this.add.bitmapText(10, 10, 'ccFont', '').setTint(this.red).setScale(.5).setScrollFactor(0).setDepth(2)

    //create animation function
    const createAnim = (sprite) => {
      this.anims.create({
        key: `${sprite}-run`,
        frames: this.anims.generateFrameNumbers(sprite, {
          start: 0,
          end: 11
        }),
        frameRate: 8 * this.gameSpeed,
        repeat: -1
      });
    }

    const createDash = (sprite, delay) => {
      console.log('DASH!')
      this.tweens.add({
        targets: [sprite],
        x: 300,
        duration: 10000,
        hold: 700,
        loopDelay: delay,
        ease: 'back.inout',
        yoyo: true,
      })
    }

    this.horse0 = this.physics.add.sprite(width * .5 - 100, (height * .5) - 20, 'horse0').setScale(.3).setDepth(4);
    this.horse1 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 40, 'horse1').setScale(.3).setDepth(4);
    this.horse2 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 80, 'horse2').setScale(.3).setDepth(4);
    this.horse3 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 120, 'horse3').setScale(.3).setDepth(4);
    this.horse4 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 155, 'horse4').setScale(.3).setDepth(4);


    this.horses = [{
        horse: this.horse0,
        speed: 3,
        stamina: 1
      },
      {
        horse: this.horse1,
        speed: 1,
        stamina: 1
      },
      {
        horse: this.horse2,
        speed: 1,
        stamina: 1
      },
      {
        horse: this.horse3,
        speed: 1,
        stamina: 1
      },
      {
        horse: this.horse4,
        speed: 1,
        stamina: 1
      },

    ]

    this.horses.forEach((h, index) => {
      let horseSprite = `horse${index}`
      createAnim(horseSprite)
    })


    let rng = Phaser.Math.Between(0,this.horses.length-1)
    
    if(this.rngDash === false) {
      console.log(rng)
      let horse = this.horses[rng]
      createDash(horse.horse, 1000)
      this.rngDash = true;
    }
  }

  //UPDATE===================================================================================
  update(time, delta) {
  
    //debug
    this.realTime += 1/60
    
    this.createDashTimer += 1/60

    if(this.createDashTimer >= 20){

    }

    this.realtimeText.setText(`time: ${this.realTime.toFixed(2)}`)

  
    //animations
    this.horses.forEach((h, index) => {
      h.horse.anims.play(`horse${index}-run`, true)
    })


    //background motion
    this.allBackgrounds.forEach(b => {
     b.background.tilePositionX += b.tileSpeed * this.gameSpeed
    })

  }


}

export default GameScene;