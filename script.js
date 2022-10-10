const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
const reversed_image = new Image();
reversed_image.src = " img/reverse_running.png";
const fire_ball_image = new Image();
fire_ball_image.src = "img/fireball.png";
const player_sprite_width = 25;
const player_sprite_height = 35;
const reversed_player_sprite_width = 26;
const reversed_player_sprite_height = 35;
let a = 0;
let b = 0;
let framex = 0;
let framey = 0;
let facing = 1;
let fire_x_pos = [];
let fire_y_pos = [];
function drawPlatform(a, b) {
  ctx.fillStyle = "blue";
  ctx.drawImage(image, a, b, backWidth * 2.4, backHeight * 0.4, platX, platY, backWidth * 7, backHeight * .94);
}
function drawPlayer() {
  if (facing == 1) {
    ctx.drawImage(player_image, framex * player_sprite_width, 114, player_sprite_width, player_sprite_height, x, y, 80, 80);
  }
  else if (facing == 0) {
    ctx.drawImage(reversed_image, framex * reversed_player_sprite_width, 1, reversed_player_sprite_width, reversed_player_sprite_height, x, y, 80, 80);
  }
}
function create_fireball() {
  for (let i = 0; i < fire_x_pos.length; i++) {
    ctx.drawImage(fire_ball_image, ++fire_x_pos[i], ++fire_y_pos[i], 20, 20);
  }
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatform(a, b);
  drawPlayer();

  x += xv;
  y += yv;
  yv += groundGravity;
  if (x >= 550) {
    a++;
    x = 549;
  }
  if (x <= 110) {
    x = 110;
  }
  if (y + yv + 100 <= canvas.height / 2 + 15) {
    yv += groundGravity;
  }
  else {
    rolling = 0;
    yv = 0;
    flag = true;
  }
}

function move(event) {
  if (event.key === "d") {
    facing = 1;
    if (framex < 2)
      framex++;
    else
      framex = 0;
    xv = 2;
  }
  if (event.key === "a") {
    if (framex < 2)
      framex++;
    else
      framex = 0;
    facing = 0;
    xv = -2;
  }
  if (event.key === "q") {
    console.log("HEloo");
    fire_x_pos.push(x);
    fire_y_pos.push(y);
    create_fireball();
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
  update()
  console.log(facing);
}

animation();
