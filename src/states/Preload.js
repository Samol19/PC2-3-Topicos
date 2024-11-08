import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){

    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene