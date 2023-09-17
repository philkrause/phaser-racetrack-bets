import { GAME_HEIGHT, GAME_WIDTH, DEBUG_MODE } from "./constants";
import GameScene from '../scenes/GameScene';

var startSceneConfig = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scene: [GameScene],
    roundPixels: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: DEBUG_MODE
        }
    }
};

export default startSceneConfig