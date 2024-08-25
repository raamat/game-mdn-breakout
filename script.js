/*
Тег <canvas> сам по себе не несёт никакого смысла. Это просто
холст для отрисовки растровой графики. Но он предоставляет нам
доступ к Canvas API и WebGL API в JavaScript. С помощью этих API
вы можете получить доступ к каждому отдельному пикселю в пределах
холста и управлять его цветом в отдельности от других пикселей. 
*/
const canvas = document.querySelector(".game-canvas");

/*
Cоздаем переменную ctx для хранения контекста 2D—рендеринга
- фактического инструмента, который мы можем использовать
для рисования на холсте.
*/
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 10;
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
