import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {
        // Cargar todos los assets
        this.load.image('menuBackground', 'assets/fondos/menu.png');
        this.load.image('startButton', 'assets/rojo.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('amarillo', 'assets/amarillo.png');
        this.load.image('rojo', 'assets/rojo.png');
        this.load.image('verde', 'assets/verde.png');
        this.load.image('gameBackground', 'assets/fondos/game.png');
        this.load.image('gameOver', 'assets/fondos/gam-over.jpg');
    }

    create() {
        // Una vez que todos los assets estén cargados, comenzamos la siguiente escena
        this.scene.start('StartScene');
    }
}

export default PreloadScene;
