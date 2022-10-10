const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
let ex = 700;
let ex1 = 1500;
let ex2 = 1100;
let ey = canvas.height / 2 - 10;
let x = 200;
let y = 100;
let xv = 0;
let yv = 0;
let platX = 0;
let platY = 100;
let flag = true;
const backHeight = window.innerHeight;
const backWidth = window.innerWidth;
shiftTrack = 0;
shiftTrackBy = 2;

const groundGravity = 0.5;

const image = new Image();
image.src = "img/backgroundimg.png";

const player_image = new Image();
player_image.src = "img/player_movement_sprite.png";
const reversed_image = new Image();
reversed_image.src = " img/reverse_running.png";
const player_sprite_width = 25;
const player_sprite_height = 35;
const reversed_player_sprite_width = 26;
const reversed_player_sprite_height = 35;
let a = 0;
let b = 0;
let framex = 0;
let framey = 0;
let facing = 1;
let rotate_angle = 180;
let cnt = 0;

let trackImage = {
  road: { sx: 100, sy: 100, sw: 60, sh: 60 },
  grass: { sx: 100, sy: 65, sw: 70, sh: 30 },
  bridgeStart: { sx: 1055, sy: 105, sw: 60, sh: 30 },
  bridge: { sx: 1075, sy: 105, sw: 60, sh: 30 },
  bridgeEnd: { sx: 1125, sy: 105, sw: 60, sh: 30 },
  enemyBot: { sx: 320, sy: 140, sw: 30, sh: 25 },
  enemyBot2: { sx: 1125, sy: 105, sw: 60, sh: 30 },
  waterTop: { sx: 1180, sy: 185, sw: 60, sh: 30 },
  water: { sx: 1110, sy: 185, sw: 60, sh: 30 },
  wall: { sx: 1188, sy: 120, sw: 60, sh: 60 },
};

track = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 4, 4, 4, 5, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    9, 9, 9, 9, 9, 9, 9, 9,
  ],
  [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
];

function moveForward() {
  for (let y = 0; y < this.track.length; y++) {
    if (shiftTrack >= 60) {
      console.log();
      track[y].shift();
    }
  }
  if (shiftTrack < 60) {
    shiftTrack += shiftTrackBy;
  } else {
    shiftTrack = 0;
  }
}

function drawPlatform() {
  for (let y = 0; y < track.length; y++) {
    for (let x = 0; x < track[y].length; x++) {
      if (this.track[y][x] != 0) {
        let trackPosition = {
          x: x * 60 - shiftTrack,
          y: y * 60,
        };

        switch (track[y][x]) {
          case 1: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "road" },
            });
            break;
          }
          case 2: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "grass" },
            });
            break;
          }
          case 3: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "bridgeStart" },
            });
            break;
          }
          case 4: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "bridge" },
            });
            break;
          }
          case 5: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "bridgeEnd" },
            });
            break;
          }
          case 6: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "enemyBot" },
            });
            break;
          }
          case 7: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "enemyBot2" },
            });
            break;
          }
          case 8: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "water" },
            });
            break;
          }
          case 9: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "wall" },
            });
            break;
          }
        }
      }
    }
  }
  function drawTrack({ trackPosition, trackDetail }) {
    ctx.drawImage(
      image,
      trackImage[trackDetail.trackSource].sx,
      trackImage[trackDetail.trackSource].sy,
      trackImage[trackDetail.trackSource].sw,
      trackImage[trackDetail.trackSource].sh,
      trackPosition.x,
      trackPosition.y,
      60,
      60
    );
  }
}

function drawPlayer() {
  if (facing == 1) {
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
  } else if (facing == 0) {
    ctx.drawImage(
      reversed_image,
      framex * reversed_player_sprite_width,
      1,
      reversed_player_sprite_width,
      reversed_player_sprite_height,
      x,
      y,
      80,
      80
    );
  }
}

function create_fireball() {}

function update() {
  drawPlatform();
  drawPlayer();
  x += xv;
  y += yv;
  yv += groundGravity;
  if (x >= 550) {
    x = 549;
    moveForward();
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
    facing = 1;
    xv = 2;
  }
  if (event.key === "a") {
    if (framex < 2) framex++;
    else framex = 0;
    facing = 0;
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
