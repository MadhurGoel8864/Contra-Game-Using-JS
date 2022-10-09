const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 100;
let y = 100;
let xv = 0;
let yv = 0;
let platX = 0;
let platY = 100;
let flag = true;
const backHeight = window.innerHeight;
const backWidth = window.innerWidth;

const groundGravity = 0.5;

const image = new Image();
image.src = "img/backgroundimg.png";

const player_image = new Image();
player_image.src = "img/player_movement_sprite.png";
const player_sprite_width = 25;
const player_sprite_height = 35;

let framex = 0;
let framey = 0;
function drawPlatform() {
  ctx.fillStyle = "blue";
  ctx.drawImage(image, platX, platY, backWidth * 7, backHeight * .94);
}

function drawPlayer() {
  ctx.drawImage(player_image, framex * player_sprite_width, 114, player_sprite_width, player_sprite_height, x, y, 60, 60);
  // ctx.fillStyle = "yellow";
  // ctx.fillRect(x, y, 100, 100);
}

function update() {
  drawPlayer();
  x += xv;
  y += yv;
  yv += groundGravity;

  if (y + yv + 100 <= canvas.height / 2 + 75) yv += groundGravity;
  else {
    yv = 0;
    flag = true;
  }
}

function move(event) {
  if (event.key === "d" && x < 400) {
    if (framex < 2)
      framex++;
    else
      framex = 0;
    xv = 2;
  }
  if (event.key === "a" && x > 100) {
    xv = -2;
  }
  if (event.key === "w") {
    if (flag) {
      yv -= 20;
      flag = false;
    }
  }
}
function stop(event) {
  if (event.key === "d") {
    xv = 0;
  }
  if (event.key === "a") {
    xv = 0;
  }
}

addEventListener("keydown", move);
addEventListener("keyup", stop);

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatform();
  update();

  if (
    y + 100 <= platY &&
    y + 100 + yv >= platY &&
    x + 100 >= platX &&
    x <= platX + 400
  ) {
    yv = 0;
  }
  if (x > 800 || x < 100) {
    xv = 0;
  }
  if (x > 800) {
    platX -= 10;
  }
  if (x < 100) {
    platX += 10;
  }
}

animation();
