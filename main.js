//class
class Ball
{
    constructor(x, y, velX, velY, radius, color = 'black')
    {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.radius = radius;
        this.color = color;
        this.collider = null;
    }
}
//let
let canvas = document.getElementById('main');
let balls = [];
let count = 15;
//const
 const BACK_COLOR = 'white';
 //
 let MIN_VEL_X = 1;
 let MAX_VEl_X = 50;
 //
 let MIN_VEL_Y = 1;
 let MAX_VEl_Y = 50;
 //
 let MIN_RADIUS = 1;
 let MAX_RADIUS = 50;
//Main programm
Start();
//


function Start()
{
    //Set width and height
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;
    //Attach button`z
    attachButtons();
    //Generate start Ball`z
    generateBalls();
    //Execute animatioin
    requestAnimationFrame(mainAnimation);
}

function attachButtons()
{
    let settings = document.getElementById('setting');
    let rand = document.getElementById('random_set');
    let add_but = document.getElementById('add');
     //
    let velX = document.getElementById('velX_set');
    let velY = document.getElementById('velY_set');
    let radius = document.getElementById('radius_set');
     //
    let velX_max = document.getElementById('velX_set_Max');
    let velY_max = document.getElementById('velY_set_Max');
    let radius_max = document.getElementById('radius_set_Max');

    add_but.onclick = () => 
    {
        balls.push(new Ball(
            getRandomInt(canvas.width - MAX_RADIUS, MAX_RADIUS),
            getRandomInt(canvas.height - MAX_RADIUS, MAX_RADIUS),
            getRandomInt(MAX_VEl_X, MIN_VEL_X),
            getRandomInt(MAX_VEl_Y, MIN_VEL_Y),
            getRandomInt(MAX_RADIUS, MIN_RADIUS),
            getColor()));
    }
    rand.onchange = () => 
    {
        let label = document.getElementById('to_chainge');
        let max_set = document.getElementById('max_set');
        if(rand.checked)
        {
            label.innerText = 'Минимум';
            max_set.style.display = 'block';
            ball.forEach(ball => 
                {
                    ball.velX = getRandomInt(MAX_VEl_X, MIN_VEL_X);
                    ball.velY = getRandomInt(MAX_VEl_Y, MIN_VEL_Y);
                    ball.radius = getRandomInt(MAX_RADIUS, MIN_RADIUS);
                });
        }
        else
        {
            label.innerText = 'Параметры';
            max_set.style.display = 'none';
            // console.log('Without rand')
            balls.forEach(ball => 
                {
                    let velX_val = parseInt(velX.value);
                    let velY_val = parseInt(velY.value);
                    let radius_val = parseInt(radius.value);
                    ball.velX = (ball.velX > 0) ? velX_val : -velX_val;
                    ball.velY = (ball.velY > 0) ? velY_val : -velY_val;
                    ball.radius = radius_val;
                });
        }
    }
     //Min, foundation
    velX.oninput = () =>
    {
        let value = parseInt(velX.value);
        if(!rand.checked)
        {
            balls.forEach(ball => 
                {
                    ball.velX = (ball.velX > 0) ? value : -value;
                });
        }
        else
        {
            MIN_VEL_X = value;
            giveRandomVelX();
        }
    }
    velY.oninput = () =>
    {
        let value = parseInt(velY.value);
        if(!rand.checked)
        {
            balls.forEach(ball => 
                {
                    ball.velY = (ball.velY > 0) ? value : -value;
                });
        }
        else
        {
            MIN_VEL_Y = value;
            giveRandomVelY();
        }
    }
    radius.oninput = () => 
    {
        let value = parseInt(radius.value);
        if(!rand.checked)
        {
            balls.forEach(ball => 
                {
                    ball.radius = value;
                });
        }
        else
        {
            MIN_RADIUS = value;
            giveRandomRadius();
        }
    }
     //Max, optional
    velX_max.oninput = () => 
    {
        MAX_VEl_X = parseInt(velX_max.value);
        giveRandomVelX();
    }
    velY_max.oninput = () => 
    {
        MAX_VEl_Y = parseInt(velY_max.value);
        giveRandomVelY();
    }
    radius_max.oninput = () =>
    {
        MAX_RADIUS = parseInt(radius_max.value);
        giveRandomRadius();
    }
}

function generateBalls()
{
    for(let i = 0; i < count; i++)
    {
        balls.push(new Ball(
            getRandomInt(canvas.width - MAX_RADIUS, MAX_RADIUS),
            getRandomInt(canvas.height - MAX_RADIUS, MAX_RADIUS),
            getRandomInt(MAX_VEl_X, MIN_VEL_X),
            getRandomInt(MAX_VEl_Y, MIN_VEL_Y),
            getRandomInt(MAX_RADIUS, MIN_RADIUS),
            getColor()));
    }
}

function mainAnimation()
{
    let context = canvas.getContext('2d');
    context.fillStyle = BACK_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => 
        {
            drawBall(ball);
            moveBall(ball);
            colliderBall(ball);
        });
    requestAnimationFrame(mainAnimation);
}

function drawBall(ball)
{
    let context = canvas.getContext('2d');
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
    return context;
}

function moveBall(ball)
{
    if(ball.x + ball.radius + ball.velX >= canvas.width ||
       ball.x - ball.radius + ball.velX <= 0)
        ball.velX = -ball.velX;
    //
    if(ball.y + ball.radius + ball.velY >= canvas.height ||
       ball.y - ball.radius + ball.velY <= 0)
        ball.velY = -ball.velY;
    //
    ball.x += ball.velX;
    ball.y += ball.velY;
} 

function colliderBall(ball)
{
    for(let i = 0; i < balls.length; i++)
    {
        let oth_ball = balls[i];
        if(oth_ball != ball)
        {
            if(oth_ball.radius + ball.radius > 
               getDistance(ball.x, ball.y, oth_ball.x, oth_ball.y))
            {
                if(ball.collider == oth_ball)
                    return;
                ball.collider = oth_ball;
                ball.color = getColor();
                return;
            }
        }
    }
    ball.collider = null;
}

function getRandomInt(max, min)
{
    return Math.random() * (max - min) + min;
}

function getDistance(x_1, y_1, x_2, y_2)
{
    return parseInt(Math.sqrt(Math.pow(x_1 - x_2, 2) + Math.pow(y_1 - y_2, 2)));
}

function getColor(r = getRandomInt(255, 0), g = getRandomInt(255, 0), b = getRandomInt(255, 0))
{
    return `rgb(${r}, ${g}, ${b})`;
}

function giveRandomVelX()
{
    balls.forEach(ball => 
        {
            ball.velX = getRandomInt(MAX_VEl_X, MIN_VEL_X);
        });
}

function giveRandomVelY()
{
    balls.forEach(ball => 
        {
            ball.velY = getRandomInt(MAX_VEl_Y, MIN_VEL_Y);
        });
}

function giveRandomRadius()
{
    balls.forEach(ball => 
        {
            ball.radius = getRandomInt(MAX_RADIUS, MIN_RADIUS);
        });
}