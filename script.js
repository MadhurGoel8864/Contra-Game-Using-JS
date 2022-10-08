const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let y = 0;
let gravity = 1;
let flag = true;

const groundGravity = 0.5;

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 100, 100);
}

function update() {
  drawPlayer();

  if (y + gravity + groundGravity + 100 <= canvas.height) {
    y += gravity;
    gravity += groundGravity;
  } else {
    gravity = 0;
  }
  if (y + gravity + groundGravity + 100 === canvas.height) {
    flag = true;
  }
}

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
}

animation();

function move(event) {
  if (event.key === "d") {
    x += 35;
  }
  if (event.key === "a" && x > 0) {
    x -= 35;
  }
  if (event.key === "w") {
    if (flag) {
      y -= 300;
      flag = false;
    }
  }
}

addEventListener("keypress", move);
