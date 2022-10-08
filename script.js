const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight;
canvas.height = window.innerHeight;

let x = 0;
let y = 650;

function animation() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, 100, 100);
  requestAnimationFrame(animation);
}

animation();

function moveDown() {
  ctx.clearRect(x, y, 100, 100);
  y += 50;
  console.log(y);
}

function move(event) {
  ctx.clearRect(x, y, 100, 100);
  if (event.key === "d") {
    x += 5;
  }
  if (event.key === "a" && x > 0) {
    x -= 5;
  }
  if (event.key === "w") {
    y -= 50;
  }
}

addEventListener("keypress", move);
