import { GAME_SPEED } from '../config/constants';
import { inspect } from 'util'

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'game'
    });

    this.gameSpeed = GAME_SPEED;
    this.background_clouds;
    this.createHorse;
    this.horse1;
    this.realTime = 0;
    this.createDashTimer = 0;
    this.realtimeText;
    this.allBackgrounds = [];
    this.rngDash = false;
    this.createDash;
    this.courseLength;
    this.sortByXPosition;
  }

  //PRELOAD===================================================================================
  preload() {
    this.load.image('background1_clouds', '../assets/images/background1_clouds.png');
    this.load.image('background1_seats', '../assets/images/background1_seats.png');
    this.load.image('background1_course', '../assets/images/background1_course.png');
    this.load.image('background1_wall', '../assets/images/background1_wall.png');
    this.load.image('background1_trees', '../assets/images/background1_trees.png');
    this.load.image('background1_fence', '../assets/images/background1_fence.png');
    this.load.image('background1_finish', '../assets/images/background1_finish.png');
    this.load.image('gui_background', '../assets/images/gui_background.png');
    this.load.image('button_pause', '../assets/images/button_pause.png');
    this.load.image('finish_line', '../assets/images/finish_line.png');
    this.load.image('horse0_profile', '../assets/images/horse0_profile.png');
    this.load.image('horse1_profile', '../assets/images/horse2_profile.png');
    this.load.image('horse2_profile', '../assets/images/horse3_profile.png');
    this.load.image('horse3_profile', '../assets/images/horse4_profile.png');
    this.load.image('horse4_profile', '../assets/images/horse5_profile.png');
    //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.load.atlas('table_result', '../assets/images/table_result.png', '../assets/images/table_result.json');
    
    //length of course in seconds
    this.courseLength = 60;

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
    //this.load.bitmapFont('ccFont', '../assets/fonts/carrier_command.png', '../assets/fonts/carrier_command.xml');

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

    //results-gui
    this.add.image((width*.5) + 2, height*.885, 'table_result', 'gui_back').setOrigin(.5).setScale(.53,.278).setDepth(3)
    this.add.image((width*.5) + 2, 65, 'table_result', 'gui_back').setOrigin(.5).setScale(.53,.2).setDepth(3)
    this.add.image((width*.5) + 2, height*.88, 'table_result', 'gui_back2').setOrigin(.5).setScale(.55,.3).setDepth(3)

    this.button_pause = this.add.image(width-20, 633, 'button_pause').setScale(.5).setDepth(4);

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
    //this.realtimeText = this.add.bitmapText(10, 10, 'ccFont', '').setTint(this.red).setScale(.5).setScrollFactor(0).setDepth(2)

    //create animation function
    const createAnim = (sprite) => {
      this.anims.create({
        key: `${sprite}-run`,
        frames: this.anims.generateFrameNumbers(sprite, {
          start: 0,
          end: 11
        }),
        frameRate: 8 * this.gameSpeed,
        repeat: -1,
        timeScale: 1
      });
    }

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

    inspect(this)
    this.horse0 = this.physics.add.sprite(width * .5 - 100, (height * .5) - 20, 'horse0').setScale(.3).setDepth(4);
    this.horse1 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 40, 'horse1').setScale(.3).setDepth(4);
    this.horse2 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 80, 'horse2').setScale(.3).setDepth(4);
    this.horse3 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 120, 'horse3').setScale(.3).setDepth(4);
    this.horse4 = this.physics.add.sprite(width * .5 - 100, this.horse0.y + 155, 'horse4').setScale(.3).setDepth(4);

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

    this.horsesCopy = [...this.horses];
    
    this.customSort = (a, b) => {
      if (a.horse.x > b.horse.x) return -1;
      if (a.horse.x < b.horse.x) return 1;
      return 0;
    }

    //animations and stats
    this.horses.forEach((h, index) => {
      let horseSprite = `horse${index}`
      createAnim(horseSprite)
      this.add.image(h.profilepic)

    })

    var style = { font: "28px Finger Paint", fill: "#fff", tabs: [ 150, 150, 200 ] };
    this.add.text(2, height * .8 +5, "1\n2\n3\n4\n5", style).setDepth(5);
  }

  //UPDATE===================================================================================
  update(time, delta) {
  
    //debug
    this.realTime += 1/60

    this.createDashTimer += 1/60

    //text
    //this.realtimeText.setText(`time: ${this.realTime.toFixed(2)}`).setDepth(5)

    //animations
    this.horses.forEach((h, index) => {
      h.horse.anims.play(`horse${index}-run`, true)
    })

    // Sort the horsesCopy array by x position
    this.horsesCopy.sort(this.customSort);
    this.rankProfileGroup = this.add.group();

    if (!this.rankTextGroup) {
      this.rankTextGroup = this.add.group();

    }
    if (!this.rankProfilleGroup) {
      this.rankProfilleGroup = this.add.group();

    }
    
    this.rankTextGroup.clear(true, true);
    this.rankProfileGroup.clear(true,true)
    
    // Loop through the sorted horsesCopy to update their display position and rank
    this.horsesCopy.forEach((h, index) => {
      const profile = this.add.image(48,660 + (index*30), h.profilepic).setDepth(4).setScale(.07)
      const name = this.add.text(68 ,655 + (index*30), h.name).setDepth(4)
      this.rankTextGroup.add(name);
      this.rankProfileGroup.add(profile);

    });
    
    //race
    if(this.realTime <= this.courseLength){ 

      //create Dash
      if(this.createDashTimer >= 2 && this.realTime <= this.courseLength){

        let rng = Phaser.Math.Between(0,this.horses.length-1)
        
        let horse = this.horses[rng]
        let horseDashing = this.horses[rng].dashing;

        if(!horseDashing){        
          this.horses[rng].dashing = true;
          this.createDash(horse, 1000)
          //reset dash timer
          this.createDashTimer = 0;
        } 
      
      }

      //background motion
      this.allBackgrounds.forEach(b => {
      b.background.tilePositionX += b.tileSpeed * this.gameSpeed
      })
    } else { //FINISH
      this.finish_line = this.add.image(this.scale.width-20, this.background_fence.y, 'finish_line').setScale(.4).setRotation(Phaser.Math.DegToRad(90)).setDepth(3).setAlpha(.8);
      this.background1_finish = this.add.image(this.scale.width-20, this.scale.height*.4+20, 'background1_finish').setScale(.6).setDepth(4);
            
      this.horses.forEach(h => {
        this.createFinish(h, true)
      })
    }
  }


}

export default GameScene;