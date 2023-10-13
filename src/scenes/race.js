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
      this.load.image('background1_seats', '../assets/images/background1_seats.png');
      this.load.image('background1_course', '../assets/images/background1_course.png');
      this.load.image('background1_wall', '../assets/images/background1_wall.png');
      this.load.image('background1_trees', '../assets/images/background1_trees.png');
      this.load.image('background1_fence', '../assets/images/background1_fence.png');
      this.load.image('background1_finish', '../assets/images/background1_finish.png');
      
      this.load.spritesheet('horse0', '../assets/images/horse1_sheet.png', {
        frameWidth: 432,
        frameHeight: 321
      });

      this.load.spritesheet('horse1', '../assets/images/horse2_sheet.png', {
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
      this.background_clouds = this.add.tileSprite(this.width/2, this.height * .1, 0, 0, 'background1_clouds').setDepth(1).setScale(2);
      this.background_seats = this.add.tileSprite(this.width/2, this.background_clouds.y + 170, 0, 0, 'background1_seats').setDepth(3);
      this.background_wall = this.add.tileSprite(this.width/2, this.background_clouds.y + 300, 0, 0, 'background1_wall').setDepth(2);
      this.background_trees = this.add.tileSprite(this.width/2, this.background_clouds.y + 210, 0, 0, 'background1_trees').setDepth(4);
      this.background_course = this.add.tileSprite(this.width/2, this.background_clouds.y + 348, 0, 0, 'background1_course').setDepth(2);
      this.background_fence = this.add.tileSprite(this.width/2, this.background_clouds.y + 235, 0, 0, 'background1_fence').setDepth(3);
      this.background_fence2 = this.add.tileSprite(this.width/2, this.background_clouds.y + 450, 0, 0, 'background1_fence').setDepth(3);
      
      
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
          background: this.background_wall,
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

    this.horse0 = this.physics.add.sprite(width * .5 - 100, (height * .5) - 20, 'horse0').setScale(.3).setDepth(4);
    this.horse1 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 40, 'horse1').setScale(.3).setDepth(4);

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
    }
  ]


    //animations and stats
    this.horses.forEach((h, index) => {
      createAnim(`horse${index}`)
    })

  }

  
  update() {
    this.allBackgrounds.forEach(b => {
        b.background.tilePositionX += b.tileSpeed
     })

    //animations
    this.horses.forEach((h, index) => {
      h.horse.anims.play(`horse${index}-run`, true)
    })
  }

}
