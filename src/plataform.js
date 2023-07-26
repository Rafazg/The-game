import { plataformImage } from "./main.js";

const canvas = document.getElementById('main-canvas');
const c = canvas.getContext('2d');
const gravity = 0.5;




export class Plataform {
    constructor({ x, y }) {
      this.position = {
        x,
        y,
      };
      this.width = 500;
      this.height = 200;
    }
  
    draw() {
      if(plataformImage.complete && plataformImage.naturalWidth !== 0){
      c.drawImage(
        plataformImage,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      }
    }
  }