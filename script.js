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
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let isLeftPressed = false;
let isRightPressed = false;

// Позволяем пользователю управлять ракеткой
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    isLeftPressed = true;
  } else if (e.key === "ArrowRight") {
    isRightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    isLeftPressed = false;
  } else if (e.key === "ArrowRight") {
    isRightPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // Обнаружение столкновений между шаром и битой
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      // Перезагружает ресурс из текущего URL подобно кнопке обновления браузера
      document.location.reload();
      // Отменяет регулярное выполнение функции, установленное вызовом setInterval().
      clearInterval(interval);
    }
  }

  if (isLeftPressed && paddleX > 0) {
    paddleX -= 7;
  } else if (isRightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }

  x += dx;
  y += dy;
}

const interval = setInterval(draw, 10);
