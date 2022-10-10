const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
let ex = 700;
let ex1 = 1500;
let ex2 = 1100;
let ey = canvas.height / 2 - 10;
let playerX = 200;
let playerY = 0;
let xv = 0;
let yv = 0;
let platX = 0;
let platY = 100;
let flag = true;
let ground = canvas.height;
let laying = 0;
let enemyXVelo = 0;
let enemyYVelo = 0;
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
const fireball_image = new Image();
fireball_image.src = "img/fire_ball.png";
const laying_img = new Image();
laying_img.src = "img/laydown.png";
const reverse_laying_image = new Image();
reverse_laying_image.src = "img/reverse_laydown.png";
const reverseEnemy = new Image();
reverseEnemy.src = "img/playerreverse.png";
const blastImage = new Image();
blastImage.src = "img/blastimage.png";
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
let fireball_x = [];
let fireball_y = [];
let enemyFireBallx = [];
let enemyFireBally = [];
let enemyFaceGun = [];
let face_gun = [];
let enemyX = 820;
let enemyY = 0;
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
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 5, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
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
              trackDetail: { image: "background", trackSource: "grass" },
            });
            break;
          }
          case 2: {
            drawTrack({
              trackPosition,
              trackDetail: { image: "background", trackSource: "road" },
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
let blastPlayer = true;
let playerDead = false;
function drawPlayer() {
  if (!playerDead) {
    if (laying == 1 && facing == 1) {
      ctx.drawImage(laying_img, playerX, playerY, 80, 80);
    } else if (laying == 1 && facing == 0) {
      ctx.drawImage(reverse_laying_image, playerX, playerY, 80, 80);
    } else if (facing == 1) {
      ctx.drawImage(
        player_image,
        framex * player_sprite_width,
        114,
        player_sprite_width,
        player_sprite_height,
        playerX,
        playerY,
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
        playerX,
        playerY,
        80,
        80
      );
    }
  } else {
    if (blastPlayer) {
      ctx.drawImage(blastImage, playerX, playerY, 50, 50);
      blastPlayer = false;
    }
  }
}
function calculateGroundLevel(playerX, playerY) {
  let flag22 = false;
  for (let i = 0; i < track.length; i++) {
    for (let j = 0; j < track[i].length; j++) {
      if (track[i][j] > 1) {
        let trackPosition = { x: j * 60, y: i * 60 };
        if (
          playerX + 80 >= trackPosition.x &&
          playerX <= trackPosition.x + 60 &&
          playerY + 80 <= trackPosition.y &&
          playerY + 80 >= trackPosition.y - 60
        ) {
          flag22 = true;
          ground = trackPosition.y;
        }
      }
      if (!flag22) ground = canvas.height;
    }
  }
  if (playerY + 100 >= ground) {
    playerY = ground - 100;
    flag = true;
    return 0;
  } else {
    return groundGravity;
  }
}
function create_fireball() {
  for (let i = 0; i < fireball_x.length; ++i) {
    ctx.drawImage(
      fireball_image,
      fireball_x[i] + 28,
      fireball_y[i] + 32,
      15,
      15
    );
    if (face_gun[i] == 1) fireball_x[i] += 6;
    else fireball_x[i] -= 6;
    if (fireball_x[i] === enemyX) {
      enemyDead = true;
    }
  }
}
function createEnemyFireBall() {
  for (let i = 0; i < enemyFireBallx.length; ++i) {
    ctx.drawImage(
      fireball_image,
      enemyFireBallx[i] + 28,
      enemyFireBally[i] + 32,
      15,
      15
    );
    enemyFireBallx[i] -= 6;
    if (enemyFireBallx[i] === playerX) {
      playerDead = true;
    }
  }
}
let counter = 0;
function update() {
  drawPlatform();
  create_fireball();
  playerX += xv;
  playerY += yv;
  enemyX += enemyXVelo;
  enemyY += enemyYVelo;
  if (playerX >= 550) {
    playerX = 549;
    moveForward();
  }
  if (playerX <= 110) {
    playerX = 110;
  }
  if (calculateGroundLevel(playerX, playerY) === 0) yv = 0;
  else yv += calculateGroundLevel(playerX, playerY);
  if (calculateGroundLevel(enemyX, enemyY) === 0) enemyYVelo = 0;
  else enemyYVelo += calculateGroundLevel(enemyX, enemyY);
  if (enemyX < 50) {
    enemyXVelo = 0;
  } else if (enemyYVelo === 0) {
    if (counter % 55 === 0) {
      enemyFireBallx.push(enemyX);
      enemyFireBally.push(enemyY);
    }
    counter++;
    createEnemyFireBall();
    enemyXVelo = -2;
  } else {
    enemyXVelo = 0;
  }

  drawPlayer();
  drawEnemy();
}

function move(event) {
  if (event.key === "s") {
    laying = 1;
  }
  if (event.key === "d") {
    if (framex < 2) framex++;
    else framex = 0;
    facing = 1;
    xv = 2;
    laying = 0;
  }
  if (event.key === "a") {
    if (framex < 2) framex++;
    else framex = 0;
    facing = 0;
    xv = -2;
    laying = 0;
  }
  if (event.key === "w") {
    if (flag) {
      yv -= 15;
      flag = false;
    }
    laying = 0;
  }
}
function move1(event) {
  if (event.key === "q") {
    fireball_x.push(playerX);
    fireball_y.push(playerY);
    face_gun.push(facing);
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

let enemyPosition = {
  sx: 190,
  sy: 43,
  sh: 36,
  sw: 19,
  dh: 80,
  dw: 50,
  cols: 5,
};
let shiftRightEnemy = 0;
let shiftLeftEnemy = 0;
let delayEnemySprite = 0;
let enemyDead = false;
let blastFlag = true;
function drawEnemy() {
  if (!enemyDead) {
    ctx.drawImage(
      reverseEnemy,
      enemyPosition.sx + shiftLeftEnemy,
      enemyPosition.sy,
      enemyPosition.sw,
      enemyPosition.sh,
      enemyX,
      enemyY,
      80,
      80
    );
    if (delayEnemySprite % 10 === 0) {
      shiftLeftEnemy -= enemyPosition.sw;
      if (shiftLeftEnemy < -enemyPosition.sw * enemyPosition.cols) {
        shiftLeftEnemy = 0;
      }
    }
    delayEnemySprite++;
  } else {
    if (blastFlag) {
      ctx.drawImage(blastImage, enemyX, enemyY, 50, 50);
      blastFlag = false;
    }
  }
}

addEventListener("keydown", move);
addEventListener("keyup", move1);
addEventListener("keyup", stop);

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
}

animation();
