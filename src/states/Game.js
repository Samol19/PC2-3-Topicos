import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    init() {
        this.score = 0;
        this.timeElapsed = 0; 
    }

    create() {
        this.add.image(0, 0, 'gameBackground')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width, this.game.config.height);

        //TIEMPO
        this.timeText = this.add.text(10, 10, `Tiempo: ${this.timeElapsed}`, {
            fontSize: '24px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        //TEXTO
        this.scoreText = this.add.text(this.game.config.width - 150, 10, `Puntaje: ${this.score}`, {
            fontSize: '24px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });

        // Llamar a la función de actualización del tiempo cada segundo
        this.time.addEvent({
            delay: 1000,  // 1000 ms = 1 segundo
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });
    }

    update() {

    }

    updateTime() {
        this.timeElapsed++;
        this.timeText.setText(`Tiempo: ${this.timeElapsed}`);
    }
}

export default GameScene;
