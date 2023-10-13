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
      this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
      this.load.image('background1_seats', '../assets/images/background1_seats.png');
      this.load.image('background1_course', '../assets/images/background1_course.png');
      this.load.image('background1_wall', '../assets/images/background1_wall.png');
      this.load.image('background1_trees', '../assets/images/background1_trees.png');
      this.load.image('background1_fence', '../assets/images/background1_fence.png');
      this.load.image('background1_finish', '../assets/images/background1_finish.png');
      
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
      this.handlerScene.sceneRunning = 'race    '
      if (this.game.debugMode)
          this.add.image(0, 0, 'guide').setOrigin(0).setDepth(4)
        
        // this.add.text(width/2,height * .8, 'New Game', {
        //     fontFamily: 'font1',
        // });
      //GAME OBJECTS
      this.background_clouds = this.add.tileSprite(this.width/2, this.height * .1, 0, 0, 'background1_clouds').setDepth(1);
      this.background_wall = this.add.tileSprite(0, 360, 0, 0, 'background1_wall').setDepth(2);
      this.background_seats = this.add.tileSprite(0, 292, 0, 0, 'background1_seats').setDepth(3);
      this.background_trees = this.add.tileSprite(0, 330, 0, 0, 'background1_trees').setDepth(4);
      this.background_course = this.add.tileSprite(0, 492, 0, 0, 'background1_course').setDepth(3);
      this.background_fence = this.add.tileSprite(0, 365, 0, 0, 'background1_fence').setDepth(3);
      this.background_fence2 = this.add.tileSprite(0, 602, 0, 0, 'background1_fence').setDepth(3);
      
      
      this.allBackgrounds = [
        {
          background: this.background_clouds,
          tileSpeed: 2,
        }
    ]
  }
  update() {
    this.allBackgrounds.forEach(b => {
        b.background.tilePositionX += b.tileSpeed
     })
  }

}
