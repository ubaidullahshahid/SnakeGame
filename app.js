const gameArea = document.getElementById("gameArea");
const scoreText = document.querySelector(".score");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];

// console.log(snake)

let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box,
};
console.log(food.x);

// console.log(food)
let direction;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.keyCode == 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode == 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (event.keyCode == 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode == 40 && direction !== "UP") {
    direction = "DOWN";
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      alert("Game Over")
      return true;
    }
  }
  return false;
}

function draw() {
  gameArea.innerHTML = "";

  for (let i = 0; i < snake.length; i++) {
    const snakePart = document.createElement("div");
    snakePart.style.left = snake[i].x + "px";
    snakePart.style.top = snake[i].y + "px";
    snakePart.classList.add("snake");
    if (i === 0) {
      snakePart.classList.add("snake-head");
    }
    gameArea.appendChild(snakePart);
  }

  const foodDiv = document.createElement("div");
  foodDiv.style.left = food.x + "px";
  foodDiv.style.top = food.y + "px";
  foodDiv.classList.add("food");
  gameArea.appendChild(foodDiv);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box,
    };
    score++;
    scoreText.textContent = "Score: " + score;
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= 400 ||
    snakeY < 0 ||
    snakeY >= 400 ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}

const game = setInterval(draw, 100);
