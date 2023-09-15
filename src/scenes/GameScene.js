
class GameScene extends Phaser.Scene {
  constructor(config) {
      super({
          key: 'GameSceneKey'
      });

    this.background;
  }

  //PRELOAD===================================================================================
  preload() {
    this.load.image('background', '../assets/images/background1.png');
    this.load.spritesheet('horse1','../assets/images/horse1_sheet.png', { frameWidth: 432, frameHeight: 321 }); 
  }

  //CREATE===================================================================================
  create(){
    const width = this.scale.width;
    const height = this.scale.height;
    this.background = this.add.tileSprite(width * .5+10,height * .5,width,height*.5,'background')

    this.horse1 = this.physics.add.sprite(width * .5, height * .5, 'horse1').setScale(.3)

    this.anims.create({
        key: 'run',
        frames:this.anims.generateFrameNumbers('horse1', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
  }

  //UPDATE===================================================================================
  update() {
    this.horse1.anims.play('run', true);
    this.background.tilePositionX += 3.9;

  }


}

export default GameScene;