import PreloadScene from "./states/Preload";
import GameScene from "./states/Game";
import StartScene from "./states/Start";

let config = {
    width: window.innerWidth /*100%*/,
    height: window.innerHeight,
    scene: [PreloadScene,GameScene,StartScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default : 'arcade'
    }
};
new Phaser.Game(config);