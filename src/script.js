const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const backGround = document.querySelector("body")
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;
class Player {
  constructor() {
    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 100;
    this.height = 100;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
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

class Plataform {
  constructor({x, y}) {
    this.position = {
      x,
      y
    };

    this.width = 500;
    this.height = 200;
  }

  draw() {
    c.drawImage(plataformImage, this.position.x, this.position.y, this.width, this.height);
  }
}

const plataformImage = new Image();
 plataformImage.src = 'assets/images/pixilart-drawing.png';
const player = new Player();
const plataforms = [new Plataform({
  x: 0, y:500
}), new Plataform({x:650, y: 500}), new Plataform({x: 1200, y: 300})];
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffSet = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  plataforms.forEach((plataform) => {
    plataform.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
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

  console.log(scrollOffSet);

  if (scrollOffSet >= 1300) {
    plataformImage.src ='assets/images/plataform02.png'
    backGround.style.backgroundImage = 'url(assets/images/city/8.png)'
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
 })
}




animate();

addEventListener("keydown", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      
      keys.left.pressed = true;
      break;
    case 68:
      
      keys.right.pressed = true;
      break;
    case 83:
      
      break;
    case 87:
      
      player.velocity.y -= 20;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 65:
      
      keys.left.pressed = false;
      break;
    case 68:
      
      keys.right.pressed = false;
      break;
    case 83:
      
      break;
    case 87:

      break;
  }
});


const parallaxLayers = document.querySelectorAll('.parallax-layer');

window.addEventListener('scroll', () => {
  parallaxLayers.forEach(layer => {
    const speed = parseFloat(layer.getAttribute('data-speed'));
    const yOffset = window.scrollY * speed;
    layer.style.transform = `translateY(${yOffset}px)`;
  });
});