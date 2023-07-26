const canvas = document.getElementById('main-canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;


export class Bullet {
    constructor(x, y, enemies) {
      this.position = {
        x,
        y,
      };
      this.velocity = {
        x: 10, // Defina a velocidade horizontal da bala
        y: 0, // Defina a velocidade vertical da bala (se necessário)
      };
      this.width = 10; // Defina a largura da bala
      this.height = 5; // Defina a altura da bala
      this.enemies = enemies;
    }
    
    draw() {
      c.fillStyle = "red"; // Cor da bala
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  
    update() {
      this.draw();
      this.position.x += this.velocity.x; // Atualiza a posição horizontal da bala
      // Atualize a posição vertical da bala (se necessário)

      for (const enemy of this.enemies){
        this.checkCollision(enemy)
      }
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
  }