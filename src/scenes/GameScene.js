import * as Config from '../config/constants';

class GameScene extends Phaser.Scene {
  constructor(config) {
      super({
          key: 'GameSceneKey'
      });

    this.background_clouds;
    this.createHorse;
    this.horse1;
    this.realTime = 0;
    this.realtimeText;  
    this.gameSpeed = Config.GAME_SPEED;
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

    this.load.spritesheet('horse1','../assets/images/horse1_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.spritesheet('horse2','../assets/images/horse2_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.spritesheet('horse3','../assets/images/horse3_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.spritesheet('horse4','../assets/images/horse4_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.spritesheet('horse5','../assets/images/horse5_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.bitmapFont('ccFont', '../assets/fonts/carrier_command.png', '../assets/fonts/carrier_command.xml');
    
  } 
  
  //CREATE===================================================================================
  create(){
    const width = this.scale.width;
    const height = this.scale.height;
    this.background_clouds = this.add.tileSprite(width ,243,0,0,'background1_clouds').setDepth(1);
    this.background_wall = this.add.tileSprite(0 ,360,0,0,'background1_wall').setDepth(2);
    this.background_trees = this.add.tileSprite(0 ,330,0,0,'background1_trees').setDepth(4);
    this.background_seats = this.add.tileSprite(0,292,0,0,'background1_seats').setDepth(3);
    this.background_course = this.add.tileSprite(0,492,0,0,'background1_course').setDepth(3);
    this.background_fence = this.add.tileSprite(0,365,0,0,'background1_fence').setDepth(3);
    this.background_fence2 = this.add.tileSprite(0,602,0,0,'background1_fence').setDepth(3);


    //text
    this.realtimeText = this.add.bitmapText(10, 10, 'ccFont', '').setTint(this.red).setScale(.5).setScrollFactor(0).setDepth(2)

    //create animation function
    const createAnim = (sprite) => {
      this.anims.create({
        key: `${sprite}-run`,
        frames:this.anims.generateFrameNumbers(sprite , { start: 0, end: 11 }),
        frameRate: 15,
        repeat: -1
      });
    }

    const createDash = (sprite,delay) => {
      this.tweens.add({
        targets: [sprite],
        x: 300,
        duration: 10000,
        hold: 700,
        loop: -1,
        loopDelay: delay,
        ease: 'back.inout',
        yoyo:true,
      })
    }

    this.horse1 = this.physics.add.sprite(width * .5 -100,(height * .5) -20 ,'horse1').setScale(.3).setDepth(4);
    this.horse2 = this.physics.add.sprite(width * .5 -100,this.horse1.y + 40 ,'horse2').setScale(.3).setDepth(4);
    this.horse3 = this.physics.add.sprite(width * .5 -100,this.horse1.y + 80 ,'horse2').setScale(.3).setDepth(4);
    this.horse4 = this.physics.add.sprite(width * .5 -100,this.horse1.y + 120 ,'horse2').setScale(.3).setDepth(4);
    this.horse5 = this.physics.add.sprite(width * .5 -100,this.horse1.y + 155 ,'horse2').setScale(.3).setDepth(4);


    this.horses = [
      {horse: this.horse1, speed: 3, stamina: 1},
      {horse: this.horse2, speed: 1, stamina: 1},
      {horse: this.horse3, speed: 1, stamina: 1},
      {horse: this.horse4, speed: 1, stamina: 1},
      {horse: this.horse5, speed: 1, stamina: 1},

    ]

    this.horses.forEach((h,index) => {
      let horseSprite = `horse${index+1}`
      let delay = Phaser.Math.Between(100,8000)
      createAnim(horseSprite)
      createDash(h.horse,delay)
    })
  }
  
  //UPDATE===================================================================================
  update(time, delta) {

    this.realTime += 1/60

    if (Math.abs(this.realTime) %2 === 0){
      let rng = Phaser.Math.Between(0,150)
      console.log(`RNG:${rng}`)
    }
    this.horses.forEach((h,index) => {
      h.horse.anims.play(`horse${index+1}-run`,true)
    })


    //background motion
    this.realtimeText.setText(`time: ${this.realTime.toFixed(2)}`)
    this.background_clouds.tilePositionX += .5 * this.gameSpeed
    this.background_seats.tilePositionX += 2 * this.gameSpeed
    this.background_trees.tilePositionX += 3 * this.gameSpeed
    this.background_wall.tilePositionX += 3 * this.gameSpeed
    this.background_fence.tilePositionX += 4 * this.gameSpeed;
    this.background_fence2.tilePositionX += 4 * this.gameSpeed;

  }


}

export default GameScene;