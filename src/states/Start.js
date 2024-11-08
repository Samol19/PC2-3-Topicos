import Phaser from "phaser";

class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        this.add.image(0, 0, 'menuBackground')
        .setOrigin(0, 0)
        .setDisplaySize(this.game.config.width, this.game.config.height);
        // Texto "Bica 4 life G_G and forever"
        let titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, "Bica 4 life G_G and forever (gaaa)", {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let studentText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, "Alumno: Fernando Samuel Paredes Espinoza", {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        let clickText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, "Haz clic para comenzar", {
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Detectar clic en la pantalla para comenzar el juego
        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

export default StartScene;
