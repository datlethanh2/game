//
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ball
var xBall=145;
var yBall=340;
var ball=5
function myBall() {
    ctx.beginPath();
    ctx.arc(xBall, yBall, ball, 0, Math.PI*2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}
//racket
var xRacket=120;
var yRacket=345;
function myRacket() {
    ctx.beginPath();
    ctx.rect(xRacket, yRacket, 50, 5);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}
//input
var net = [];
var netRowCount = 6;
var netColumnCount = 5;
var items=[0, 1, 2];
var score=0;
for(var c=0; c<netColumnCount; c++) {
    net[c] = [];
    for(var r=0; r<netRowCount; r++) {
        net[c][r] = { x: 0, y: 0, status: items[Math.floor(Math.random()*items.length)] };
        if(net[c][r].status===1){
            score++;
        }
    }
}
//net
var netWidth = 42;
var netHeight = 20;
var netPadding = 6;
var netOffsetTop = 25;
var netOffsetLeft =7;
function myNet() {
    for(var c=0; c<netColumnCount; c++) {
        for(var r=0; r<netRowCount; r++) {
            if(net[c][r].status === 1) {
                var netX = (r*(netWidth+netPadding))+netOffsetLeft;
                var netY = (c*(netHeight+netPadding))+netOffsetTop;
                net[c][r].x = netX;
                net[c][r].y = netY;
                ctx.rect(netX, netY, netWidth, netHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
            }
        }
    }
}

//boom
function myBoom() {
    for(var c=0; c<netColumnCount; c++) {
        for(var r=0; r<netRowCount; r++) {
            if(net[c][r].status === 2) {
                var boomX = (r*(netWidth+netPadding))+netOffsetLeft;
                var boomY = (c*(netHeight+netPadding))+netOffsetTop;
                net[c][r].x = boomX;
                net[c][r].y =boomY;
                ctx.fillStyle = "red";
                ctx.fillRect(boomX, boomY, netWidth, netHeight);
            }
        }
    }
}

//score
function myScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

//lives
var lives=3;
function myLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, canvas.width-65, 18);
}

var x=2;
var y=-2;
//touch
function touchBall(){
    //wall
    if(xBall + x > canvas.width-ball || xBall + x < ball) {
        x = -x;
    }
    if(yBall + y < ball ) {
        y = -y;
    }
    //die
    if(yBall >(canvas.height-ball)){
        lives--;  
        if(lives===0){
            alert("GAME OVER");
            document.location.reload();
        }else{
            xBall=145;
            yBall=290;
            y=-2;
            x=2;
            xRacket=120;
        }   
    }
    //net
    for(var c=0; c<netColumnCount; c++) {
        for(var r=0; r<netRowCount; r++) {
            var b = net[c][r];
            if(b.status == 1) {
                if(xBall > b.x && xBall < b.x+netWidth && yBall > b.y && yBall < b.y+netHeight) {
                    y = -y;
                    b.status = 0;
                    score--;
                    if(score===0){
                        alert("GAME WIN");
                        document.location.reload();
                    }
                }
            }
        }
    }
    //boom
    for(var c=0; c<netColumnCount; c++) {
        for(var r=0; r<netRowCount; r++) {
            var b = net[c][r];
            if(b.status ===2) {
                if(xBall > b.x && xBall < b.x+netWidth && yBall > b.y && yBall < b.y+netHeight) {
                    y = -y;
                    b.status = 0;
                }
            }
        }
    }
    //racket
    if(xBall > xRacket && xBall < xRacket + 50 && yBall + y> canvas.height-5) {
        //speed
        if(xBall > xRacket && xBall < xRacket + 24 && yBall + y> canvas.height-5 && y-1>0) {
            y = y-1;
        }
        if(xBall > xRacket+25 && xBall < xRacket + 50 && yBall + y> canvas.height-5) {
            y = y+1;
        }
        y = -y;
    }
}

//controll
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//run
function runMain(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    myBall();
    myNet();
    myBoom();
    myRacket();
    myScore();
    myLives();
    touchBall();
    
    if(rightPressed && xRacket < canvas.width-50) {
        xRacket += 5;
    }
    if(leftPressed && xRacket > 0) {
        xRacket -= 5;
    }
    xBall+=x;
    yBall+=y;
    requestAnimationFrame(runMain);
}
runMain();


