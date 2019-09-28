let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext("2d");

let box = 10;
let score = 0;
let game_over = false;
function Body(a, b) {
    this.x = a * box;
    this.y = b * box;
}

function Snake() {
    this.length = 0;
    this.body = [];

    this.increaseLength = function(a, b) {
        this.length ++;
        this.body.push(new Body(a, b));
    };
}

let food = {
    x : Math.floor(Math.floor(Math.random() * 30) * 10),
    y : Math.floor(Math.floor(Math.random() * 15) * 10)
}

let snake = new Snake();
snake.increaseLength(10, 10);
snake.increaseLength(10, 11);
snake.increaseLength(10, 12);
const worm = new Image();
worm.src = "worm.png";


document.addEventListener("keydown", getDirection);

let direction = "UP";

function getDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function draw() {
    
    // viermele
    ctx.fillStyle = "brown";
    ctx.fillRect(food.x, food.y, box, box);

    // snake
    for (let i = 0; i < snake.body.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(snake.body[0].x, snake.body[0].y, box, box);
        } else {
            ctx.fillStyle = "white";
            ctx.fillRect(snake.body[i].x, snake.body[i].y, box, box);
        }
    }

    //move
    let new_head = new Body();
    let tail = snake.body.pop();
    // remove color at the end of the snake
    ctx.fillStyle = "green";
    ctx.fillRect(tail.x, tail.y, box + 5, box + 5);


    switch(direction) {
        case "LEFT":
            new_head.x = snake.body[0].x - box;
            new_head.y = snake.body[0].y;
            break;
        case "UP":
            new_head.x = snake.body[0].x;
            new_head.y = snake.body[0].y - box;
            break;
        case "RIGHT":
            new_head.x = snake.body[0].x + box ;
            new_head.y = snake.body[0].y;
            break;        
        case "DOWN":
            new_head.x = snake.body[0].x;
            new_head.y = snake.body[0].y  + box;
            break;
    }
    snake.body.unshift(new_head);

    // catch the food moment

    if (new_head.x > food.x - 5 && new_head.x < food.x + 5
        && new_head.y < food.y + 5 && new_head.y > food.y - 5) {
        snake.body.push(tail);
        score ++;
        document.getElementById("score").innerHTML = score.toString();
        ctx.fillStyle = "green";
        ctx.fillRect(food.x, food.y, box + 5, box + 5);
        food = {
            x : Math.floor(Math.floor(Math.random() * 30) * 10),
            y : Math.floor(Math.floor(Math.random() * 15) * 10)
        }
    }

    // game over

    for (let i = 1; i < snake.body.length; i++) {
        if (new_head.x == snake.body[i].x && new_head.y == snake.body[i].y) {
            game_over = true;
            clearInterval(game);
        } 
    }

    if (new_head.x < 0 || new_head.y < 0
        || new_head.x >= 30 * box 
        || new_head.y >= 15 * box)
         {
        game_over = true;
        clearInterval(game);
    }
}

let game = setInterval(draw, 100);


