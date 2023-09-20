
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
  }
  
  //PRELOAD===================================================================================
  preload() {
    this.load.image('background1', '../assets/images/background1.png');
    this.load.spritesheet('horse1','../assets/images/horse1_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.spritesheet('horse2','../assets/images/horse2_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.bitmapFont('ccFont', '../assets/fonts/carrier_command.png', '../assets/fonts/carrier_command.xml');
    
  } 
  
  //CREATE===================================================================================
  create(){
    const width = this.scale.width;
    const height = this.scale.height;
    //this.background_clouds = this.add.tileSprite(width ,112,0,0,'background1_clouds')
    //this.background_course= this.add.tileSprite(width ,112,0,0,'background1_course')
    this.background= this.add.tileSprite(0 ,height * .5 ,0,0,'background1')


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
        duration: 8000,
        hold: 500,
        repeat: -1,
        repeatDelay: delay,
        ease: 'back.inout',
        yoyo:true,
      })
    }

    this.horse1 = this.physics.add.sprite(width * .5,height * .5 ,'horse1').setScale(.3);
    this.horse2 = this.physics.add.sprite(width * .5,height * .5 + 100 ,'horse2').setScale(.3);
    
    this.horses = [
      {horse: this.horse1, speed: 3, stamina: 1},
      {horse: this.horse2, speed: 1, stamina: 1},
    ]

    this.horses.forEach((h,index) => {
      let horseSprite = `horse${index+1}`
      let delay = Phaser.Math.Between(100,3000)
      console.log(delay)
      createAnim(horseSprite)
      createDash(h.horse,delay)
    })
  }
  
  //UPDATE===================================================================================
  update(time, delta) {

    this.realTime += 1/60

    // let rng = Phaser.Math.Between(0,150)
    // console.log(rng)
    this.horses.forEach((h,index) => {
      h.horse.anims.play(`horse${index+1}-run`,true)
    })

    this.realtimeText.setText(`time: ${this.realTime.toFixed(2)}`)
    this.background.tilePositionX += 8
  }


}

export default GameScene;