const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let y = 0;
let xv = 0;
let yv = 0;
let flag = true;

const groundGravity = 0.5;

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 100, 100);
}

function update() {
  drawPlayer();
  x += xv;
  y += yv;
  yv += groundGravity;

  if (y + yv + 100 <= canvas.height) yv += groundGravity;
  else {
    yv = 0;
    flag = true;
  }
}

function move(event) {
  if (event.key === "d") {
    xv = 10;
  }
  if (event.key === "a" && x > 0) {
    xv = -10;
  }
  if (event.key === "w") {
    if (flag) {
      yv -= 30;
      flag = false;
    }
  }
}
function stop(event) {
  if (event.key === "d") {
    xv = 0;
  }
  if (event.key === "a" && x > 0) {
    xv = 0;
  }
}

addEventListener("keypress", move);
addEventListener("keyup", stop);

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
}

animation();
