export default class Race extends Phaser.Scene {

  // Vars
  handlerScene = false
  sceneStopped = false

  constructor() {
      super({ key: 'race' })
  }

  preload() {
      this.sceneStopped = false
      this.width = this.game.screenBaseSize.width
      this.height = this.game.screenBaseSize.height
      this.handlerScene = this.scene.get('handler')
      this.handlerScene.sceneRunning = 'race'
      this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
      
  }

  create() {
      const { width, height } = this
      // CONFIG SCENE         
      this.handlerScene.updateResize(this)
      if (this.game.debugMode)
          this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
      
      //GAME OBJECTS
      this.background_clouds = this.add.tileSprite(this.width/2, this.width, 0, 0, 'background1_clouds').setDepth(1);
      // this.add.text(width/2,height * .8, 'New Game', {
      //     fontFamily: 'font1',
      // });
      

  }
}
