
class GameScene extends Phaser.Scene {
  constructor(config) {
      super({
          key: 'GameSceneKey'
      });

    this.background;
    this.createHorse;
    this.horse1;
    this.realTime = 0;
    this.realtimeText;
  }
  
  //PRELOAD===================================================================================
  preload() {
    this.load.image('background', '../assets/images/background2.png');
    this.load.spritesheet('horse1','../assets/images/horse1_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
    this.load.bitmapFont('ccFont', '../assets/fonts/carrier_command.png', '../assets/fonts/carrier_command.xml');
    
  } 
  
  //CREATE===================================================================================
  create(){
    const width = this.scale.width;
    const height = this.scale.height;
    this.background = this.add.image(width , height * .5 ,'background');
    //text
    this.realtimeText = this.add.bitmapText(10, 10, 'ccFont', '').setTint(this.red).setScale(.5).setScrollFactor(0).setDepth(2)

    //create animation function
    const createAnim = (sprite) => {
      this.anims.create({
        key: 'run',
        frames:this.anims.generateFrameNumbers(sprite , { start: 0, end: 11 }),
        frameRate: 15,
        repeat: -1
      });
    }

    this.horse1 = this.physics.add.sprite(width * .5,height * .5 ,'horse1').setScale(.3);
    this.horse2 = this.physics.add.sprite(width * .5,height * .5 + 100 ,'horse1').setScale(.3);

    this.horses = [
      {horse: this.horse1, speed: 3, stamina: 1},
      {horse: this.horse2, speed: 3, stamina: 1},
    ]

    createAnim('horse1')
  }
  
  //UPDATE===================================================================================
  update(time, delta) {

    this.realTime += 1/60

    this.horses.forEach(h => {
      h.horse.anims.play('run', true);
    })

    this.realtimeText.setText(`time: ${this.realTime.toFixed(2)}`)
    this.background.x -= 5.9;    
  }


}

export default GameScene;