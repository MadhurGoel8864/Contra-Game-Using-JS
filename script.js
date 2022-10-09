const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

let x = 200;
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
let a = 0;
let b = 0;
let framex = 0;
let framey = 0;
function drawPlatform(a, b) {
  ctx.fillStyle = "blue";
  ctx.drawImage(
    image,
    a,
    b,
    backWidth * 2.4,
    backHeight * 0.4,
    platX,
    platY,
    backWidth * 7,
    backHeight * 0.94
  );
}

function drawPlayer() {
  ctx.drawImage(
    player_image,
    framex * player_sprite_width,
    114,
    player_sprite_width,
    player_sprite_height,
    x,
    y,
    80,
    80
  );
}

function update() {
  drawPlatform(a, b);
  drawPlayer();
  x += xv;
  y += yv;
  console.log(x, " ", y);
  yv += groundGravity;
  if (x >= 550) {
    a++;
    x = 549;
  }
  if (x <= 110) {
    x = 110;
  }
  if (y + yv + 100 <= canvas.height / 2 + 85) yv += groundGravity;
  else {
    yv = 0;
    flag = true;
  }
}

function move(event) {
  if (event.key === "d") {
    if (framex < 2) framex++;
    else framex = 0;
    xv = 2;
  }
  if (event.key === "a" && x > 350) {
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
  update();
}

animation();
