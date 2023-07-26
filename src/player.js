const canvas = document.getElementById('main-canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;


export class Player {
    constructor(enemies) {
      this.position = {
        x: 200,
        y: 200,
      };
      this.velocity = {
        x: 0,
        y: 1,
      };
      this.width = 150;
      this.height = 150;
  
      this.sprites = {
        stand: {
          right: new Image(),
          left: new Image(),
        },
        run: {
          right: new Image(),
          left: new Image(),
        },
        isJump: {
          jump: new Image(),
        },
        atack:{
          right: new Image(),
        }
      };

      this.enemies = enemies;
      
        
  
      // Carregue as imagens
      
      this.sprites.stand.right.src = "/assets/images/player/2 Punk/Punk_idle.png";
      this.sprites.stand.left.src = "/assets/images/player/2 Punk/Punk_idleLeft.png"
      this.sprites.run.right.src = "/assets/images/player/2 Punk/Punk_run.png";
      this.sprites.run.left.src = "/assets/images/player/2 Punk/Punk_runLeft.png";
      this.sprites.isJump.jump.src = "/assets/images/player/2 Punk/Punk_doublejump.png";
  
      this.sprites.atack.right.src = "assets/images/player/2 Punk/Punk_attack3.png"
  
  
  
      this.currentSprite = this.sprites.stand.right;
      this.frames = 0;
      this.currentState = "stand"; // Estado inicial do jogador é "parado"
      this.isJumping = false; // Indica se o jogador está pulando ou não


      

    }



    checkCollision(enemy) {
      // Verifique se houve colisão entre o jogador e o inimigo usando bounding boxes
      if (
        this.position.x < enemy.position.x + enemy.width &&
        this.position.x + this.width > enemy.position.x &&
        this.position.y < enemy.position.y + enemy.height &&
        this.position.y + this.height > enemy.position.y
      ) {
        // Houve colisão! Remova o inimigo do array de inimigos
        const index = this.enemies.indexOf(enemy);
        if (index !== -1) {
          this.enemies.splice(index, 1);
        }
      }
}


  
    draw() {
      c.drawImage(
        this.currentSprite,
        48 * this.frames,
        0,
        48,
        48,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  
    update() {
      this.frames++;
      if (this.frames > 5) this.frames = 0;
  
      // Lógica para atualizar o estado do jogador
      
      for (const enemy of this.enemies){
        this.checkCollision(enemy)
      }

      this.draw();
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
  
      if (this.position.y + this.height + this.velocity.y <= canvas.height) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }