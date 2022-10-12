let starting = document.getElementById("start_btn");
let rules = document.getElementById("rules");
let controls = document.getElementById("controls");
let rules_display_condition = 0;
let scores = document.getElementById("score");
rules.addEventListener("click", rules_display);
function rules_display() {
  if (rules_display_condition == 0) rules_display_condition = 1;
  else {
    rules_display_condition = 0;
  }
  if (rules_display_condition == 1) controls.style.display = "flex";
  else {
    controls.style.display = "none";
  }
}
starting.addEventListener("click", change_image);
function change_image() {
  let background_audio = new Audio("audios/background_music.mp3");
  scores.style.display = "flex";
  let division = document.getElementById("options");
  division.style.display = "none";
  let canva = document.getElementById("myCanvas");
  canva.style.display = "flex";
  controls.style.display = "none";
  background_audio.play();
}
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
let enemyInterval;
let score = 0;
let ex = 700;
let movingLeft = true;
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
let enemies = [];
let lives = 5;
const backHeight = window.innerHeight;
const backWidth = window.innerWidth;
shiftTrack = 0;
shiftTrackBy = 2;
let playa = {
  position: { x: 200, y: 0 },
  size: { height: 80, width: 50 },
  id: "player",
};

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
let diagonal_facing = 1;
let rotate_angle = 180;
let cnt = 0;
let fireball_x = [];
let fireball_y = [];
let diagonal_fireball_x = [];
let diagonal_fireball_y = [];
let enemyFireBallx = [];
let enemyFireBally = [];
let enemyFaceGun = [];
let face_gun = [];
let diagonal_face_gun = [];
let enemyX = 820;
let enemyY = 0;
let bridgeDissapear = false;
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
    0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
  ],
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 4, 5, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 9, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2,
  ],
  [
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9,
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
let startMoving = false;
let blastPlayer = true;
let playerDead = false;
let playerShiftLeft = 0;
let playerShiftRight = 0;
let playerCounter = 0;
let player = {
  running: { sx: 0, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
  runningReverse: { sx: 397, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 },
};
function drawPlayer() {
  if (!playerDead) {
    if (laying == 1 && facing == 1) {
      ctx.drawImage(laying_img, playerX, playerY + 40, 80, 80);
    } else if (laying == 1 && facing == 0) {
      ctx.drawImage(reverse_laying_image, playerX, playerY + 40, 80, 80);
    } else if (facing == 1) {
      if (startMoving === true) {
        if (playerCounter % 10 === 0) {
          playerShiftLeft += player.running.sw;
          if (playerShiftLeft >= player.running.sw * player.running.cols) {
            playerShiftLeft = 0;
          }
        }
      }
      ctx.drawImage(
        player_image,
        player.running.sx + playerShiftLeft,
        player.running.sy,
        player.running.sw,
        player.running.sh,
        playerX,
        playerY,
        50,
        100
      );
      playerCounter++;
    } else if (facing == 0) {
      if (startMoving === true) {
        if (playerCounter % 10 === 0) {
          playerShiftRight += player.runningReverse.sw;
          if (
            playerShiftRight >=
            player.runningReverse.sw * player.runningReverse.cols
          ) {
            playerShiftRight = 0;
          }
        }
      }
      ctx.drawImage(
        reverseEnemy,
        player.runningReverse.sx - playerShiftRight,
        player.runningReverse.sy,
        player.runningReverse.sw,
        player.runningReverse.sh,
        playerX,
        playerY,
        50,
        100
      );
      playerCounter++;
    }
  } else if (playerDead) {
    if (blastPlayer) {
      ctx.drawImage(blastImage, playerX, playerY, 50, 50);
      blastPlayer = false;
    }
  }
}
function blastBridge(playerX, playerY) {
  for (let i = 0; i < track.length; i++) {
    for (let j = 0; j < track[i].length; j++) {
      let trackPosition = { x: j * 60 - shiftTrack, y: i * 60 };
      if (track[i][j] === 3 || track[i][j] === 4 || track[i][j] === 5) {
        if (
          playerX + 80 >= trackPosition.x &&
          playerX <= trackPosition.x + 60 &&
          playerY + 80 <= trackPosition.y &&
          playerY + 80 >= trackPosition.y - 30
        ) {
          track[i][j] = 0;
          onWater = true;
          ctx.drawImage(blastImage, trackPosition.x, trackPosition.y, 50, 50);
        }
      }
    }
  }
}
function calculateGroundLevel(playerX, playerY) {
  let flag22 = false;
  for (let i = 0; i < track.length; i++) {
    for (let j = 0; j < track[i].length; j++) {
      let trackPosition = { x: j * 60, y: i * 60 };
      if (track[i][j] > 1) {
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
    return 0;
  } else {
    return groundGravity;
  }
}
function create_diagonal_fireball() {
  for (let i = 0; i < diagonal_fireball_x.length; i++) {
    ctx.drawImage(
      fireball_image,
      diagonal_fireball_x[i] + 10,
      diagonal_fireball_y[i] + 20,
      15,
      15
    );
    if (diagonal_face_gun[i] == 1) {
      diagonal_fireball_x[i] += 6;
      diagonal_fireball_y[i] -= 3;
    } else {
      diagonal_fireball_x[i] -= 6;
      diagonal_fireball_y[i] -= 3;
    }
  }
}
let counter = 0;
function update() {
  drawPlatform();
  create_diagonal_fireball();
  playerX += xv;
  playerY += yv;
  if (playerX >= 350) {
    playerX = 349;
    moveForward();
  }
  if (playerX <= 110) {
    playerX = 110;
  }
  playa.position.x = playerX;
  playa.position.y = playerY;
  if (calculateGroundLevel(playerX, playerY) === 0) {
    yv = 0;
    flag = true;
  } else yv += calculateGroundLevel(playerX, playerY);

  blastBridge(playerX, playerY);

  drawPlayer();
}
function move(event) {
  if (event.key === "s" || event.key === "ArrowDown") {
    laying = 1;
  }
  if (event.key === "d" || event.key === "ArrowRight") {
    if (framex < 2) framex++;
    else framex = 0;
    startMoving = true;
    facing = 1;
    diagonal_facing = 1;
    xv = 2;
    laying = 0;
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    if (framex < 2) framex++;
    else framex = 0;
    startMoving = true;
    facing = 0;
    diagonal_facing = 0;
    xv = -2;
    laying = 0;
  }
  if (event.key === "w" || event.key === "ArrowUp") {
    if (flag) {
      yv -= 15;
      flag = false;
    }
    laying = 0;
  }
}
function move1(event) {
  console.log(event.key);
  if (event.key === "s" || event.key === "ArrowDown") {
    if (laying == 0) laying = 1;
    else {
      laying = 0;
    }
  }
  if (event.key === "q" || event.key === "Enter" || event.key == " ") {
    let fire_audio = new Audio("audios/gun_sound.mp3");
    shoot();
  }

  if (event.key === "e" || event.key == "/") {
    let fire_audio = new Audio("audios/gun_sound.mp3");
    fire_audio.play();
    diagonal_fireball_x.push(playerX);
    diagonal_fireball_y.push(playerY);
    diagonal_face_gun.push(diagonal_facing);
  }

  if (event.key === "e" || event.key == "/") {
    let fire_audio = new Audio("audios/gun_sound.mp3");
    fire_audio.play();
    diagonal_fireball_x.push(playerX);
    diagonal_fireball_y.push(playerY);
    diagonal_face_gun.push(diagonal_facing);
  }


}
function stop(event) {
  if (event.key === "d" || event.key === "ArrowRight") {
    startMoving = false;
    xv = 0;
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    startMoving = false;
    xv = 0;
  }
}
let shootBulletDirection = {
  right: { dx: 1, dy: 0, sx: 352, sy: 0 },
  left: { dx: -1, dy: 0, sx: 352, sy: 0 },
};
function createNewBullet(x, y, { dx, dy, sx, sy }) {
  return new Bullet(x, y, sx, sy, dx, dy);
}
function shoot() {
  if (facing === 1) {
    bullets.push(
      createNewBullet(
        playerX + 60,
        playerY,
        shootBulletDirection.right,
        "player"
      )
    );
  } else if (facing === 0) {
    bullets.push(
      createNewBullet(playerX, playerY, shootBulletDirection.left, "player")
    );
  }
}

let bullets = [];

class Bullet {
  constructor(x, y, sx, sy, dx, dy, shotBy) {
    this.position = { x, y };
    this.bulletDirection = { dx, dy };
    this.bulletSourceImage = { sx, sy };
    this.bulletSpeed = 4;
    this.size = { height: 50, width: 50 };
    this.shotBy = shotBy;
    this.drawBullet();
  }
  checkOutOfBox() {
    if (this.position.x > canvas.width) {
      return true;
    } else if (this.position.x < 0) {
      return true;
    } else if (this.position.y < 0) {
      return true;
    } else if (this.position.y > canvas.height) {
      return true;
    } else {
      return false;
    }
  }
  drawBullet() {
    ctx.drawImage(
      player_image,
      this.bulletSourceImage.sx,
      this.bulletSourceImage.sy,
      10,
      20,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
  updatePosition() {
    this.position = {
      x: this.position.x + this.bulletSpeed * this.bulletDirection.dx,
      y: this.position.y + this.bulletSpeed * this.bulletDirection.dy,
    };
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
let enemyReverse = { sx: 228, sy: 43, sh: 36, sw: 19, dh: 80, dw: 50, cols: 5 };
let cnnt = 0;
class Enemy {
  constructor() {
    this.counter = 0;
    this.position = { x: 920, y: 0 };
    this.size = { height: 80, width: 50 };
    this.velocity = { x: -3, y: 0 };
    this.baseLevel = canvas.height;
    this.shiftRightEnemy = 0;
    this.shiftLeftEnemy = 0;
    this.delayEnemySprite = 0;
    this.enemyDead = false;
    this.blastFlag = true;
    this.counter = 1;
    this.id = "enemy";
  }
  drawEnemy() {
    if (!this.enemyDead) {
      ctx.drawImage(
        reverseEnemy,
        enemyPosition.sx + this.shiftLeftEnemy,
        enemyPosition.sy,
        enemyPosition.sw,
        enemyPosition.sh,
        this.position.x,
        this.position.y,
        50,
        100
      );
      if (this.delayEnemySprite % 10 === 0) {
        this.shiftLeftEnemy -= enemyPosition.sw;
        if (this.shiftLeftEnemy < -enemyPosition.sw * enemyPosition.cols) {
          this.shiftLeftEnemy = 0;
        }
      }
      this.delayEnemySprite++;
    } else {
      if (this.blastFlag) {
        ctx.drawImage(blastImage, enemyX, enemyY, 50, 50);
        this.blastFlag = false;
      }
    }
  }
  shoot() {
    if (this.counter % 100 === 0) {
      bullets.push(
        new Bullet(this.position.x, this.position.y, 352, 0, -1, 0, "enemy")
      );
    }
    this.counter++;
  }
  updatePosition() {
    if (calculateGroundLevel(this.position.x, this.position.y) === 0) {
      this.velocity.y = 0;
    } else
      this.velocity.y += calculateGroundLevel(this.position.x, this.position.y);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.drawEnemy();
    this.shoot();
  }
}
let enemyy = new Enemy();
class Game {
  constructor() {
    enemyInterval = setInterval(() => {
      enemies.push(new Enemy());
    }, 4000);
  }
  playGame() {
    update();
    enemies.forEach((enemy) => {
      enemy.updatePosition();
    });
    bullets.forEach((bullet) => {
      bullet.updatePosition();
      bullet.drawBullet();
    });
    bullets = bullets.filter((bulettt) => {
      enemies = enemies.filter((enemy) => {
        if (checkBulletCollision(bulettt, enemy)) {
          score++;
          console.log(score);
          document.querySelector('.scoreUpdate').textContent = score;
          return null;
        } else {
          return enemy;
        }
      });
      if (checkBulletCollision(bulettt, playa)) {
        playerDead = true;
        lives--;
        if (lives > 0) {
          playerX = 220;
          playerY = 0;
          playa.position.x = playerX;
          playa.position.y = playerY;
          playerDead = false;
          blastPlayer = true;
        }
      }
      return bulettt;
    });
  }
}
function checkBulletCollision(bullet, target) {
  if (target.id == "playa") {
  }
  if (bullet.shotBy != target.id) {
    let x1 = bullet.position.x;
    let y1 = bullet.position.y;
    let w1 = bullet.size.width;
    let h1 = bullet.size.height;
    let x2 = target.position.x;
    let y2 = target.position.y;
    let h2 = target.size.height;
    let w2 = target.size.width;

    if (laying === 1) {
      target.position.y += 60;
    }

    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

addEventListener("keydown", move);
addEventListener("keyup", move1);
addEventListener("keyup", stop);

function startgame() {
  let gg = new Game();
  function animation() {
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gg.playGame();
  }
  animation();
}
startgame();

