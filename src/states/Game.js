import Phaser from "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    init() {
        this.score = 0;
        this.timeElapsed = 0; 
        this.lives = 3;
        this.currentTexture = 'player'; 
        this.PLAYER_SPEED = 5;

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

        //VIDAS
        this.livesText = this.add.text(10, 50, `Vidas: ${this.lives}`, {
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



        //Jugador
        this.player = this.add.sprite(100, this.game.config.height / 2, 'player');


        // Teclas para mover el personaje (WASD) y cambiar su textura
        this.cursors = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });


    }

    update() {
        // Lógica de movimiento
        if (this.cursors.W.isDown) {
            if (this.player.y > 0) {
                this.player.y -= this.PLAYER_SPEED;
            }
        }
        if (this.cursors.S.isDown) {
            if (this.player.y < this.game.config.height - this.player.height) {
                this.player.y += this.PLAYER_SPEED;
            }
        }

        // Lógica para cambiar la textura del jugador con las teclas WASD
        if (this.cursors.W.isDown) {
            this.player.setTexture('amarillo'); 
        } else if (this.cursors.A.isDown) {
            this.player.setTexture('player');
        } else if (this.cursors.S.isDown) {
            this.player.setTexture('rojo');
        } else if (this.cursors.D.isDown) {
            this.player.setTexture('verde');
        }
    }
    updateTime() {
        this.timeElapsed++;
        this.timeText.setText(`Tiempo: ${this.timeElapsed}`);
    }
}

export default GameScene;
