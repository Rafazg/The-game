const canvas = document.getElementById('main-canvas');
const c = canvas.getContext('2d');
const score = document.getElementById('score');
const gravity = 0.5;

export class Enemy {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: -2, // Velocidade horizontal do inimigo
      y: 0,  // Velocidade vertical do inimigo (se necessário)
    };
    this.width = 200;
    this.height = 200;

    this.sprites = {
      walk: new Image(),
      attack: new Image(),
    };

    // Carregue as imagens do inimigo
    this.sprites.walk.src = "/assets/images/enemy_3/walk.png";
    this.sprites.attack.src = "/assets/images/enemy_3/attack.png";

    this.currentSprite = this.sprites.walk; // Defina a imagem inicial do inimigo
    this.frames = 0;
  }

  draw() {
    // Desenhe o inimigo no canvas
    c.drawImage(
      this.currentSprite,
      96 * this.frames,
      0,
      96,
      96,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {

     this.frames++;
      if (this.frames > 5) this.frames = 0;
    // Atualize a posição e outros estados do inimigo
    this.position.x += this.velocity.x;
    // Atualize a posição vertical do inimigo (se necessário)
    
    // Alterne entre as imagens do inimigo com base no estado (ex: andar, atacar, etc.)
    // Exemplo simples: Alternar entre andar e atacar a cada 60 quadros
    if (frames % 60 === 0) {
      if (this.currentSprite === this.sprites.walk) {
        this.currentSprite = this.sprites.attack;
      } else {
        this.currentSprite = this.sprites.walk;
      }
    }

    this.draw(); // Chame o método draw para desenhar o inimigo no canvas
  }
}