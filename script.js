const canvas = document.querySelector(".game-canvas");
/** Cоздаем переменную ctx для хранения контекста 2D—рендеринга
 *  - фактического инструмента, который мы можем использовать
 *  для рисования на холсте. */
const ctx = canvas.getContext("2d");

// Рисуем мяч
ctx.beginPath();
ctx.arc(50, 50, 10, 0, Math.PI * 2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
