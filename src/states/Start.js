import Phaser from "phaser";

class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        this.add.image(0, 0, 'menuBackground')
        .setOrigin(0, 0)
        .setDisplaySize(this.game.config.width, this.game.config.height);

        this.gameOverMusic = this.sound.get('gameOverMusic');
        if (this.gameOverMusic) {
            this.gameOverMusic.stop();
        }

        this.backgroundMusic = this.sound.add('backgroundMusic');
        this.backgroundMusic.play({
            loop: true,   // Repetir la música
            volume: 0.7  // Ajustar volumen
        });


        // Texto "Bica 4 life G_G and forever"
        let titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, "Bica 4 life G_G and forever (gaaa)", {
            fontSize: '52px',
            fill: '#ffffff',
            stroke: '#000000',     // Color del contorno (negro)
            strokeThickness: 6     // Grosor del contorno
        }).setOrigin(0.5);

        let studentText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, "Alumno: Fernando Samuel Paredes Espinoza", {
            fontSize: '34px',
            fill: '#ffffff',
            stroke: '#000000',     // Color del contorno (negro)
            strokeThickness: 6     // Grosor del contorno
        }).setOrigin(0.5);

        let clickText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, "Haz clic para comenzar", {
            fontSize: '28px',
            fill: '#ffffff',
            stroke: '#000000',     // Color del contorno (negro)
            strokeThickness: 6     // Grosor del contorno
        }).setOrigin(0.5);

        // Detectar clic en la pantalla para comenzar el juego
        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

export default StartScene;
