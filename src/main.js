import { Player } from "../src/player.js";
import { Enemy } from "./enemy.js";
import { Plataform } from "../src/plataform.js";
import { Bullet } from "../src/bullet.js";



const canvas = document.querySelector('#main-canvas');
const c = canvas.getContext("2d");
const attackSound = document.getElementById('attackSound')
const jumpSound = document.getElementById('jumpSound')
const backGround = document.getElementById("main-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;

/* class Player {
  constructor() {
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
    

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
} */










/* class Plataform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.width = 500;
    this.height = 200;
  }

  draw() {
    c.drawImage(
      plataformImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
} */

/* class Bullet {
  constructor(x, y) {
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
  }

  draw() {
    c.fillStyle = "red"; // Cor da bala
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x; // Atualiza a posição horizontal da bala
    // Atualize a posição vertical da bala (se necessário)
  }

} */



const enemies = [];

function createEnemies() {
  enemies.push(new Enemy( 900, 300));
  enemies.push(new Enemy( 1000, 300));
  enemies.push(new Enemy( 900, 300));
  enemies.push(new Enemy( 1400, 100));

}

const bullets = [];

export const plataformImage = new Image();
 plataformImage.src = "../assets/images/plataform01.png";


const player = new Player(enemies);




const plataforms = [
  new Plataform({
    x: 0,
    y: 500,
  }),
  new Plataform({ x: 770, y: 500 }),
  new Plataform({ x: 1300, y: 300 }),
  new Plataform({ x: 1900, y: 200})
];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  jump: {
    pressed: false,
  },
  attack:{
    pressed: false,
  }
};


let scrollOffSet = 0;
let lastTime = 0;
const animationInterval = 1000 / 60; // 60 FPS

function animate(currentTime) {
  requestAnimationFrame(animate);
  const deltaTime = currentTime - lastTime;



  // Limitar a atualização da animação para uma determinada taxa de quadros
  if (deltaTime >= animationInterval) {
    lastTime = currentTime;
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    plataforms.forEach((plataform) => {
      plataform.draw();
    });

    if (keys.right.pressed && player.position.x < 400) {
      player.velocity.x = 9;
    } else if (keys.left.pressed && player.position.x > 100) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;

      if (keys.right.pressed) {
        scrollOffSet += 5;
        plataforms.forEach((plataform) => {
          plataform.position.x -= 5;
        });
      } else if (keys.left.pressed) {
        scrollOffSet -= 5;
        plataforms.forEach((plataform) => {
          plataform.position.x += 5;
        });
      }
    }

    if (scrollOffSet >= 1300) {
      plataformImage.src = "/assets/images/plataform02.png";
      backGround.style.backgroundImage = "url(/assets/images/city/8.png)";
    }

    //plataform collision
    plataforms.forEach((plataform) => {
      if (
        player.position.y + player.height <= plataform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          plataform.position.y &&
        player.position.x + player.width >= plataform.position.x &&
        player.position.x <= plataform.position.x + plataform.width
      ) {
        player.velocity.y = 0;
      }
    });

    bullets.forEach((bullet) => {
      bullet.update();

      // Remova as balas que saem da tela (caso necessário)
      if (bullet.position.x > canvas.width) {
        const index = bullets.indexOf(bullet);
        if (index > -1) {
          bullets.splice(index, 1);
        }
      }
    });

    enemies.forEach((enemy) => {
      enemy.update();
    })

  }
}
createEnemies();
animate();

function playJumpSound() {
  jumpSound.play()
}



function playAttackSound() {
   attackSound.play()
}


addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      player.currentSprite = player.sprites.run.left
      break;
    case 68:
      keys.right.pressed = true;
      player.currentSprite = player.sprites.run.right
      break;
    case 83:
      break;
    case 87:
      keys.jump.pressed = true;
      playJumpSound()
      player.currentSprite = player.sprites.isJump.jump
      player.velocity.y -= 10;
      break;
    case 32:
      keys.attack.pressed = true;
      playAttackSound()
      player.currentSprite = player.sprites.atack.right
      const bullet = new Bullet(
        player.position.x + player.width,
        player.position.y + player.height / 2, enemies
      );
      bullets.push(bullet);
      
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      player.currentSprite = player.sprites.stand.left
      break;
    case 68:
      keys.right.pressed = false;
      player.currentSprite = player.sprites.stand.right
      
      break;
    case 83:
      break;
    case 87:
      break;
    case 32:
      keys.attack.pressed = false;
      player.currentSprite = player.sprites.stand.right
  }
});

const parallaxLayers = document.querySelectorAll(".parallax-layer");

window.addEventListener("scroll", () => {
  parallaxLayers.forEach((layer) => {
    const speed = parseFloat(layer.getAttribute("data-speed"));
    const yOffset = window.scrollY * speed;
    layer.style.transform = `translateY(${yOffset}px)`;
  });
});