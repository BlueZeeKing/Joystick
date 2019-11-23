var canvasDOM = document.getElementById("joystick");

var width = canvasDOM.width;
var height = canvasDOM.height;
/*
width = window.screen.height;
height = window.screen.height;
*/

var canvas = canvasDOM.getContext("2d");
var direction = false;

var go = false;

var bigSize = 35;
var smallSize = 14;

function squared(num) {
    return Math.pow(num, 2);
}

function toDeg (rad) {
    return rad * 180 / Math.PI;
}

function solve(slope) {
    num1 = squared(slope)+1;
    num1 = squared((width/100)*bigSize) / num1;
    return Math.sqrt(num1);
}

var circleX = 0;
var circleY = 0;

canvas.beginPath();
canvas.fillStyle = "rgba(255, 255, 255, 0.17)";
canvas.arc(width / 2, height / 2, width / 100 * bigSize, 0, 2 * Math.PI);
canvas.fill();

canvas.beginPath();
canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
canvas.arc(width / 2, height / 2, width / 100 * smallSize, 0, 2 * Math.PI);
canvas.fill();

function clear() {
    canvas.clearRect(0,0,width,height);
    canvas.beginPath();
    canvas.fillStyle = "rgba(255, 255, 255, 0.17)";
    canvas.arc(width / 2, height / 2, width / 100 * bigSize, 0, 2 * Math.PI);
    canvas.fill();
}

function move(e) {

    if (go == true) {

        let x = e.pageX - canvasDOM.offsetLeft;
        let y = e.pageY - canvasDOM.offsetTop;

        let slope = (y - height/2) / (x - width/2);
        direction = toDeg(Math.atan(slope));
        if (x > width/2 && y > width/2) {
            direction = 270 - direction;
        } else if (x > width / 2 && y < height / 2) {
            direction = 270 - direction;
        } else if (x < width / 2 && y < height / 2) {
            direction = 90 - direction;
        } else if (x < width / 2 && y > height / 2) {
            direction = 90 - direction;
        } else if (y == height / 2) {
            if (x > width/2) {
                direction = 270;
            } else {
                direction = 90;
            }
        }

        if (distance(width / 2, width / 2, x, y) <= width / 100 * bigSize) {
            clear();
            canvas.beginPath();
            canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
            canvas.arc(x, y, width / 100 * smallSize, 0, 2 * Math.PI);
            canvas.fill();
        } else {
            if (x == width/2) {
                if (y>width/2) {
                    direction = 180;
                    clear();
                    canvas.beginPath();
                    canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
                    canvas.arc(width/2, height/2+(width/100*bigSize), width / 100 * smallSize, 0, 2 * Math.PI);
                    canvas.fill();
                } else {
                    direction = 0;
                    clear();
                    canvas.beginPath();
                    canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
                    canvas.arc(width / 2, height / 2 - (width / 100 * bigSize), width / 100 * smallSize, 0, 2 * Math.PI);
                    canvas.fill();
                }
            } else {
                let point = solve(slope);
                let newX;
                let newY;

                if (x < width/2) {
                    newX = 0 - point;
                    newX = newX + width/2;
                    
                    newY = 0 - point*slope;
                    newY = newY + height/2;
                } else {
                    newX = point+width/2;
                    newY = point*slope+height/2;
                }
                
                clear();
                canvas.beginPath();
                canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
                canvas.arc(newX, newY, width / 100 * smallSize, 0, 2 * Math.PI);
                canvas.fill();
            }
        }
        direction = Math.round(direction);
        console.log(direction);
    }
}

function distance (x1,y1,x2,y2) {
    let Xd = Math.abs(x1 - x2);
    let Yd = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(Xd, 2) + Math.pow(Yd, 2));
}

document.addEventListener("touchmove", move);
document.addEventListener("mousemove", move);

canvasDOM.addEventListener("touchstart", function(e) {
    let x = e.pageX - canvasDOM.offsetLeft;
    let y = e.pageY - canvasDOM.offsetTop;
    if (x <= (width / 2) + (width / 100 * smallSize) && x >= (width / 2) - (width / 100 * smallSize) && y <= (width / 2) + (width / 100 * smallSize) && y >= (width / 2) - (width / 100 * smallSize)) {
        go = true;
        clear();
        canvas.beginPath();
        canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
        canvas.arc(x, y, width / 100 * smallSize, 0, 2 * Math.PI);
        canvas.fill();
    }
});

canvasDOM.addEventListener("mousedown", function (e) {
    let x = e.pageX - canvasDOM.offsetLeft;
    let y = e.pageY - canvasDOM.offsetTop;
    if (x <= (width / 2) + (width / 100 * smallSize) && x >= (width / 2) - (width / 100 * smallSize) && y <= (width / 2) + (width / 100 * smallSize) && y >= (width / 2) - (width / 100 * smallSize)) {
        go = true;
        clear();
        canvas.beginPath();
        canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
        canvas.arc(x, y, width / 100 * smallSize, 0, 2 * Math.PI);
        canvas.fill();
    }
});

document.addEventListener("touchend", function() {
    go = false;
    clear();
    canvas.beginPath();
    canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
    canvas.arc(width / 2, height / 2, width / 100 * smallSize, 0, 2 * Math.PI);
    canvas.fill();
    direction = false;
});

document.addEventListener("mouseup", function () {
    go = false;
    clear();
    canvas.beginPath();
    canvas.fillStyle = "rgba(255, 255, 255, 0.3)";
    canvas.arc(width / 2, height / 2, width / 100 * smallSize, 0, 2 * Math.PI);
    canvas.fill();
    direction = false;
});

var degree = document.getElementById("degree");

function run() {

    degree.innerHTML = direction;

    requestAnimationFrame(run);
}

requestAnimationFrame(run);
