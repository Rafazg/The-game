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



const enemyPositions = [
  { x: 500, y: 300 },
  { x: 1000, y: 300 },
  { x: 900, y: 300 },
  { x: 1200, y: 465 /* Altura do solo*/ },
  {x: 1500,y: 100,},
  {x: 1580,y: 90,},
  {x: 1600,y: 100,},
  {x: 1650,y: 80,},
  {x: 1680,y: 300,},
  {x: 1500,y: 400,},
  {x: 1550,y: 50,},
  {x: 1550,y: 400,},
  {x: 1650,y: 300,},
  {x: 1600,y: 100,},
  {x: 1700,y: 30,},
  {x: 1750,y: 20,},
  {x: 1800,y: 10,},
  {x: 1920,y: 465,},
  {x: 2020,y: 465,},
  {x: 2320,y: 465,},
  {x: 2620,y: 465,},
  {x: 3920,y: 165,},
  {x: 3020,y: 465,},
  {x: 3920,y: 165,},
  {x: 4020,y: 105,},
  {x: 4220,y: 465,},
  {x: 4620,y: 465,},
  {x: 4720,y: 455,},
  {x: 4920,y: 465,},
  {x: 5220,y: 465,},
  {x: 5120,y: 465,},
  {x: 5620,y: 165,},
  {x: 5820,y: 265,},

  // Add more positions here as needed
];


const enemies = [];
createEnemies(enemyPositions);

function createEnemies(positions) {

  positions.forEach((position) => {
    enemies.push(new Enemy(position.x, position.y));
  });
}









export const plataformImage = new Image();
 plataformImage.src = "../assets/images/plataform01.png";


const player = new Player(enemies);

const bullets = [];
const maxX = 100;


const plataforms = [
  new Plataform({
    x: 0,
    y: 500,
  }),
  new Plataform({ x: 770, y: 500 }),
  new Plataform({ x: 1300, y: 300 }),
  new Plataform({ x: 1900, y: 200}),
  new Plataform({ x: 2700, y: 200}),
  new Plataform({ x: 2700, y: 500}),
  new Plataform({ x: 3500, y: 500}),
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

      

      if (bullet.position.x > maxX) {
        const index = bullets.indexOf(this);
        if(index !== -1){
          bullets.splice(index, 1)
        }
      }

     
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
/*createEnemies();*/
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
