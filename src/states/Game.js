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


        //Enemigo
        this.ENEMY_SPEED= 200; 
        this.enemySpawnInterval = 2000; // Apareciendo cada 2 segundos
        this.enemyGroup = this.physics.add.group();
        this.streak = 0;
        this.lastDestroyedTexture = ''; 

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
        this.scoreText = this.add.text(this.game.config.width - 200, 10, `Puntaje: ${this.score}`, {
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
        this.physics.world.enable(this.player);  // Activa las físicas para el jugador
        this.player.body.setCollideWorldBounds(true);  // Evita que el jugador salga del mundo

        // Teclas para mover el personaje (WASD) y cambiar su textura
        this.cursors = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        //Generar enemigos (Remplazo para update)
        this.time.addEvent({
            delay: this.enemySpawnInterval,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.player, this.enemyGroup, this.handleCollision, null, this);

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


    spawnEnemy() {
        const colors = ['amarillo', 'rojo', 'verde'];
        const randomColor = Phaser.Utils.Array.GetRandom(colors);

        const enemy = this.enemyGroup.create(this.game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), randomColor);

        this.physics.world.enable(enemy);
        enemy.body.setAllowGravity(false);  
        enemy.setVelocityX(-this.ENEMY_SPEED);
        enemy.setScale(0.5);
    }


    handleCollision(player, enemy) {
    
        // Si el jugador y el enemigo tienen la misma textura, aumenta el puntaje
        if (player.texture.key === enemy.texture.key) {
            this.score += 10;
            this.streak++;
    
            // Si la racha de enemigos destruidos es 5, duplicamos el puntaje
            if (this.streak === 5) {
                this.score *= 2;
                this.streak = 0;
            }
            // Si la racha de enemigos destruidos es 3, multiplicamos el puntaje por 2
            if (this.streak === 3) {
                this.score *= 2;
                this.streak = 0;
            }
            this.scoreText.setText(`Puntaje: ${this.score}`);
            enemy.destroy();  // El enemigo debe destruirse aquí
        } else {
            
            // Perder Vida
            this.lives--;
            this.livesText.setText(`Vidas: ${this.lives}`);
            enemy.destroy(); // También destruir el enemigo si no coincide
    
            // Verificar si el jugador se queda sin vidas
            if (this.lives <= 0) {
                this.gameOver();
            }
        }
    }
    

    gameOver() {
        this.scene.start('GameOverScene');
    }

}

export default GameScene;
