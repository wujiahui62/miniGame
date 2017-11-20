/*
    Kent State University
    CS 44105/54105 Web Programming I
    Fall 2017
    Assignment 3
    The World’s Hardest Game 2 Remake
    worldshardestgame.js
    Author 1: Abdulkareem Alali, aalali1@kent.edu
    Author 2: Jiahui Wu, wujiahui62@gmail.com
*/

    // var canvas = document.getElementsByTagName("canvas");
    // var c = canvas[0].getContext('2d');


    // var grd1 = c.createLinearGradient(0, 450, 1000, 50);
    // grd1.addColorStop(0, "#000000");
    // grd1.addColorStop(0.2, "#505050");
    // grd1.addColorStop(1, "#000000");
    // c.fillStyle = grd1;
    // c.fillRect(0, 50, 1000, 490);







const DARKBLUE = 'rgb(0,0,139)';
const BLACK = 'black';
const BACKGROUND_IMAGE = "images/world-hardest-game-2-bg-level-1.png";
const SCREENS = {

    screen1 : {

    },

    screen2 : {

    },

    screen3 : {
        gameCenterWall : {
            top : 100,
            bottom : 355,
            left : 384, 
            right : 634,
            },

        gameLeftWall : {
            top : 142,
            bottom : 312,
            left: 213,
            right : 384,

        },

        gameRightWall : {
            top : 142,
            bottom : 312,
            left : 634,
            right : 804,

        }
    }
}

const BALLS = {
    pair1 : {
        ball1 : ["p1b1", 400, 113, 11, 1, DARKBLUE, BLACK, 3],
        ball2 : ["p1b2", 443, 113, 11, 1, DARKBLUE, BLACK, 3],
    },

    pair2 : {
        ball1 : ["p1b3", 485, 339, 11, 1, DARKBLUE, BLACK, 3],
        ball2 : ["p1b4", 529, 339, 11, 1, DARKBLUE, BLACK, 3],
    },

    pair3 : {
        ball1 : ["p1b5", 570, 113, 11, 1, DARKBLUE, BLACK, 3],
        ball2 : ["p1b6", 613, 113, 11, 1, DARKBLUE, BLACK, 3],

    }
}

const COINS = {
    coin1 : ["p1b1", 421.5, 269, 6, 'yellow', BLACK, 3],
    coin2 : ["p1b2", 507, 182, 6, 'yellow', BLACK, 3],
    coin3 : ["p1b3", 591.5, 269, 6, 'yellow', BLACK, 3],
}

var obs;
var coins;
var crashSound;
var deathTime = 0;
var wallCenter = SCREENS.screen3.gameCenterWall;   
var wallLeft = SCREENS.screen3.gameLeftWall;   
var wallRight = SCREENS.screen3.gameRightWall;

//create a list with 12 coordinates representing the boundaries of the map
var map = [[wallLeft.left, wallLeft.top], [wallLeft.right, wallLeft.top], 
[wallCenter.left, wallCenter.top], [wallCenter.right, wallCenter.top], 
[wallRight.left, wallRight.top], [wallRight.right, wallRight.top], 
[wallRight.right, wallRight.bottom], [wallRight.left, wallRight.bottom], 
[wallCenter.right, wallCenter.bottom], [wallCenter.left, wallCenter.bottom], 
[wallLeft.right, wallLeft.bottom], [wallLeft.left, wallLeft.bottom]];
var crashSound;
var themeSound;
var coinSound;
var collectCoin = [false, false, false];


//
window.addEventListener("load", function(){


    //DOM Loaded
    // document.getElementsByTagName("p")[0].style.display = "none";

    //display screen1
    // loadSplash();
    createNewElement("Mute");
    createNewElement("Pause");

    startGame();  
    
});

/*
function loadSplash(){
    drawSplash();
    window.setTimeout(function(){
        removeProgressBar();
        drawBeginButton();
    }, 2000);
    
}

function drawBeginButton(){

    document.getElementsByTagName('canvas').addEventListener('click', function() {
        // add math logic to determine click loation is on begin button
        // clear canvans
        drawWarning();

        // remove this event binding
}); 

}

*/

function startGame(){
    //Begin
    game.init();
    obs = new obstacles(game); 
    coins = new coinsForEat(game);
    myGamePiece = new component(20, 20, "red", 240, 210, "black", 3); 
    document.getElementsByTagName("span")[5].innerHTML = deathTime;
    crashSound = new sound("soundeffects/RealisticPunch.mp3");
    themeSound = new sound("soundeffects/World'sHardestGame2ThemeSong.mp3");
    themeSound.play();
    coinSound = new sound("soundeffects/CoinCollect.wav");
}

//create a function to add "pause" and "mute" to the paragraph
function createNewElement(text) {
    this.text = text;
    var span = document.createElement("span");
    var node = document.createTextNode(text);
    span.appendChild(node);
    var element = document.getElementsByTagName("p");
    var child = document.getElementsByTagName("span");
    element[0].insertBefore(span, child[2]);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


function component(width, height, color, x, y, colorStroke, lineWidth) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y; 

    this.update = function(){
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.strokeStyle = colorStroke;
        ctx.lineWidth = lineWidth;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

    }
    this.newPos = function() {
        var topPos = this.y;
        var bottomPos = this.y + this.height;
        var leftPos = this.x;
        var rightPos = this.x + this.width;

        if(inside([leftPos+this.speedX,topPos+this.speedY]) && 
           inside([rightPos+this.speedX,topPos+this.speedY]) && 
           inside([rightPos+this.speedX,bottomPos+this.speedY]) && 
           inside([leftPos+this.speedX,bottomPos+this.speedY])){
            this.x += this.speedX;
            this.y += this.speedY;
        }

    }

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.radius);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.radius);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}

//determine if a coordinate is inside the map
function inside(point) {
    var x = point[0], y = point[1];
    var inside = false;
    for(var i = 0, j = map.length - 1; i < map.length; j = i++) {
        var xi = map[i][0], yi = map[i][1];
        var xj = map[j][0], yj = map[j][1];

        var intersect = ((yi > y) != (yj > y)) && 
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if(intersect) 
            inside = !inside;
    }
    return inside;
}




//
// function text(width, height, color, x, y, type) {
//   this.type = type;
//   this.width = width;
//   this.height = height;
//   this.speedX = 0;
//   this.speedY = 0; 
//   this.x = x;
//   this.y = y; 
//   this.update = function() {
//     ctx = game.context;
//     if (this.type == "text") {
//       ctx.font = this.width + " " + this.height;
//       ctx.fillStyle = color;
//       ctx.fillText(this.text, this.x, this.y);        
//     }
//   }
// }

//Engine
var game = {
    canvas: null,
    context : null,
    init : function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20); 
        window.addEventListener('keydown', function(e){
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = true;
            e.preventDefault();
        })   
        window.addEventListener('keyup', function(e){
            game.keys[e.keyCode] = false;
            e.preventDefault();
        })    
    },
    drawBackground: function(){
        if (this.context != undefined){
            var img = new Image;
            img.src = BACKGROUND_IMAGE;
            this.context.drawImage(img, 0, 0);
        }
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext: function(){
        return this.context;
    }
}

function obstacles(game){
    //create the array of balls that will be animated
    this.game = game;
    this.balls = [ ball.construct(BALLS.pair1.ball1),
                   ball.construct(BALLS.pair1.ball2),
                   ball.construct(BALLS.pair2.ball1),
                   ball.construct(BALLS.pair2.ball2),
                   ball.construct(BALLS.pair3.ball1),
                   ball.construct(BALLS.pair3.ball2),
                ];
    this.animate = function(){
        //loop through the balls array
        //draw the balls
        this.game.drawBackground();
        for (var i = 0; i < this.balls.length; i++){
            this.balls[i].animate(this.game.getContext());
        }
    }
}


function coinsForEat(game){
    //create the array of coins that will be animated
    this.game = game;
    this.coins = [ coin.construct(COINS.coin1),
                   coin.construct(COINS.coin2),
                   coin.construct(COINS.coin3),
                ];
    this.animate = function(){
        //loop through the coins array
        //draw the coins
        for (var i = 0; i < this.coins.length; i++){
            if(!collectCoin[i]){
                this.coins[i].animate(this.game.getContext());
            }
        }
    }
}


// add two parameter colorStroke and lineWidth to draw the outer stroke of the balls
function ball(name, x, y, radius, speed, color, colorStroke, lineWidth){
    this.name = name,
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.speed = speed,
    this.color = color,
    this.animate = function(ctx){
        //Draw ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = colorStroke;
        ctx.lineWidth = lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        //Animate
        var wall = SCREENS.screen3.gameCenterWall;        
        if (this.y - this.radius + this.speed < wall.top
         || this.y + this.radius + this.speed > wall.bottom){
          this.speed = -this.speed;
        }
        this.y += this.speed
    }
}

// coin function to draw the coins and animate
function coin(name, x, y, radius, color, colorStroke, lineWidth){
    this.name = name,
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.color = color,
    this.animate = function(ctx){
        //Draw coin
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = colorStroke;
        ctx.lineWidth = lineWidth;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        //animate 

    }
}

function update() {
    //crash with the blue ball
    for(var i = 0; i < obs.balls.length; i++){
        if(myGamePiece.crashWith(obs.balls[i])){
            deathTime += 1;
            crashSound.play();
            game.stop();
            themeSound.stop();
            collectCoin = [false, false, false];
            setTimeout(startGame(), 2000);
            return;
        }
    }

    //eat a coin
    for(var i = 0; i < collectCoin.length; i++){
        if(myGamePiece.crashWith(coins.coins[i])){
            if(!collectCoin[i])
                coinSound.play();
            collectCoin[i] = true;
            game.clear();
        }
    }

    // win the game
    if(collectCoin[0] && collectCoin[1] && collectCoin[2] &&
     myGamePiece.x > 720){
        alert("you made it!");
        game.stop();
        themeSound.stop();
        deathTime = 0;
        collectCoin = [false, false, false];
        setTimeout(startGame(), 2000);
        return;
    }

    game.clear();
    obs.animate();
    coins.animate();
    stopMove();
    if(game.keys && game.keys[37]){myGamePiece.speedX = -2;}
    if(game.keys && game.keys[39]){myGamePiece.speedX = 2;}
    if(game.keys && game.keys[38]){myGamePiece.speedY = -2;}
    if(game.keys && game.keys[40]){myGamePiece.speedY = 2;}
    myGamePiece.newPos();
    myGamePiece.update();
}


function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

