const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 20;
let y = 0;
let c = 0;
let gravity = 1;
let flag = true;
let jumpCheck = false;

const groundGravity = 0.5;

function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, 20, 100);
}

function jump() {
    c -= 10;
    y -= gravity;
    gravity += groundGravity;

    if (c == -270) {
        c = 0;
        gravity = 1;
        jumpCheck = false;
    }
}

function update() {
    drawPlayer();
    if (jumpCheck === true) {
        jump();
    } else if (jumpCheck === false) {
        if (y + gravity + groundGravity + 100 <= canvas.height) {
            y += gravity;
            gravity += groundGravity;
        } else {
            gravity = 0;
        }
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
            jumpCheck = true;
            flag = false;
        }
    }
}

addEventListener("keypress", move);
