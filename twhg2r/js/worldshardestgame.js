const DARKBLUE = 'rgb(0,0,139)';
const BLACK = 'black';
const BACKGROUND_IMAGE = "images/world-hardest-game-2-bg-level-1.png";
const SCREENS = {
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
    coin1 : ["p1b1", 421.5, 269, 7, 'yellow', BLACK, 3],
    coin2 : ["p1b2", 507, 182, 7, 'yellow', BLACK, 3],
    coin3 : ["p1b3", 591.5, 269, 7, 'yellow', BLACK, 3],
}

const BEGIN = {
    left: 437,
    right: 587,
    top: 459,
    bottom: 685,
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
var beginned = false;
var button;
var text1;
var text2;
var text3;
var text4;
var text5;
var text6;
var text1_s;
var text2_s;
var text3_s;
var text4_s;
var text5_s;
var text6_s;
var warning;
var pauseSwitch = true;
var soundSwitch = true;


var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

window.addEventListener("load", function(){
    loadSplash();
    });

function loadSplash(){
    document.getElementsByTagName("p")[0].style.visibility = "hidden";
    //this page is not updated
    drawDisplay();
    //start to update the page with setInterval after 2 seconds
    setTimeout(function() {
        loadingPage.init();
        text1 = new drawText(35, 100, "white", "35px Arial", "THE WORLD'S");
        text2 = new drawTextStroke(35, 230, "white", "172px mono45-headline", "HARDEST GAME", 6);
        text3 = new drawTextStroke(35, 230, "black", "172px mono45-headline", "HARDEST GAME", 3);
        text4 = new drawText(35, 230, "blue", "172px mono45-headline", "HARDEST GAME");
        text5 = new drawText(730, 268, "white", "35px Arial", "VERSION 2.0");
        button = new drawBeginButton(420, 400, "white", "50px Arial", "BEGIN");
    }, 2000);
}

var loadingPage = {
    canvas: null,
    context : null,
    staticInit : function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
    },

    init : function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSplash, 20);
        window.addEventListener('mousedown', function (e) {
            loadingPage.x = e.pageX;
            loadingPage.y = e.pageY;
            // alert(loadingPage.x + " " + loadingPage.y);
        })
        window.addEventListener('mouseup', function (e) {
            loadingPage.x = false;
            loadingPage.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            loadingPage.x = e.pageX;
            loadingPage.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            loadingPage.x = false;
            loadingPage.y = false;
        })
        // window.addEventListener('mousemove', function (e) {
        //     loadingPage.x = e.pageX;
        //     loadingPage.y = e.pageY;
        // })

    },

    //background of screen 1
    drawBackground: function() {
        if(this.context != undefined) {
            // this.context.beginPath();
            grd = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
            grd.addColorStop(0, "black");
            grd.addColorStop(1, "grey");
            this.context.fillStyle = grd;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    //background of screen 2
    drawBackground2: function() {
        if(this.context != undefined) {
            // this.context.beginPath();
            grd = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
            grd.addColorStop(0, "#E8E9FE");
            grd.addColorStop(1, "#AFB1FE");
            this.context.fillStyle = grd;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function() {
        clearInterval(this.interval);
    }   
}

//display the first image onload
function drawDisplay() {
    loadingPage.staticInit();
    loadingPage.drawBackground();
    text1_s = drawTextStatic(35, 100, "white", "35px Arial", "THE WORLD'S");
    text2_s = drawTextStrokeStatic(35, 230, "white", "172px mono45-headline", "HARDEST GAME", 6);
    text3_s = drawTextStrokeStatic(35, 230, "black", "172px mono45-headline", "HARDEST GAME", 3);
    text4_s = drawTextStatic(35, 230, "blue", "172px mono45-headline", "HARDEST GAME");
    text5_s = drawTextStatic(730, 268, "white", "35px Arial", "VERSION 2.0");
    loadingBar = drawLoadingBar(100, 500, 500, 20, "white");
    text6_s = drawTextStatic(160, 400, "white", "15px Arial", "This is the world's hardest game. It is harder than any game you have ever played, or ever will play.");
}

//draw text with no update
function drawTextStatic(x, y, color, font, text) {
    this.x = x;
    this.y = y; 
    this.text = text;
    ctx = loadingPage.context;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);
}

//draw text stroke with no update
function drawTextStrokeStatic(x, y, color, font, text, lineWidth) {
    this.x = x;
    this.y = y; 
    this.text = text;
    ctx = loadingPage.context;
    ctx.font = font;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.strokeText(this.text, this.x, this.y);
}

//draw loading bar with no update
function drawLoadingBar(x, y, width, height, color) {
    this.x = x;
    this.y = y; 
    this.width = width;
    this.height = height;
    ctx = loadingPage.context;
    ctx.beginPath(); 
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();            
    // console.log(x + " " + y + " " + width + " " + height + " " + color);
}

//draw text with update, it need to be updated after 2 s
function drawText(x, y, color, font, text) {
    this.x = x;
    this.y = y; 
    this.text = text;
    this.update = function() {
        ctx = loadingPage.context;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

//draw text stroke with update, it need to be updated after 2 s
function drawTextStroke(x, y, color, font, text, lineWidth) {
    this.x = x;
    this.y = y; 
    this.text = text;
    this.update = function() {
        ctx = loadingPage.context;
        ctx.font = font;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.strokeText(this.text, this.x, this.y);
    }
}

//draw begin button with update, it need to be updated after 2 s
function drawBeginButton(x, y, color, font, text) {
    // drawText(420, 400, "white", "50px Arial", "BEGIN");
    this.x = x;
    this.y = y;
    this.text = text;
    this.update = function() {
        ctx = loadingPage.context;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + ctx.measureText(text).width;
        var mytop = this.y;
        var mybottom = this.y + 50;
        var clicked = false;
        if ((loadingPage.x > BEGIN.left) && (loadingPage.x < BEGIN.right) && (loadingPage.y > BEGIN.top) && (loadingPage.x < BEGIN.bottom)) {
            clicked = true;
        }
        return clicked;
    }

}

//load screen 2
function loadWarning(){
    loadingPage.drawBackground2();
    warning = new drawTextStatic(220, 300, "black", "40px Arial", "YOU DON'T STAND A CHANCE");
    setTimeout(function(){
        document.getElementsByTagName("p")[0].style.visibility = "visible";
        createNewElement("MUTE");
        createNewElement("PAUSE");
    // console.log(document.getElementsByTagName("span"));
        var pause = document.getElementsByTagName("span")[2];
        pause.onclick = function() {
            if(pauseSwitch == true) pauseSwitch = false;
            else pauseSwitch = true;
        }
        var mute = document.getElementsByTagName("span")[5];
        mute.onclick = function() {
            if(soundSwitch == true) soundSwitch = false;
            else soundSwitch = true;
        }
        startGame();
    }, 2000)
}

//update the screen 
function updateSplash() {
    loadingPage.clear();
    if(loadingPage.x && loadingPage.y){
        if(button.clicked()) {
            loadingPage.stop();
            loadWarning();
            return;
        }
    }
    loadingPage.drawBackground();
    text1.update();   
    text2.update();        
    text3.update();        
    text4.update();        
    text5.update(); 
    button.update();
}


function startGame(){
    //Begin
    game.init();
    obs = new obstacles(game); 
    coins = new coinsForEat(game);
    myGamePiece = new component(20, 20, "red", 240, 210, "black", 3); 
    document.getElementsByTagName("span")[9].innerHTML = deathTime;
    crashSound = new sound("soundeffects/RealisticPunch.mp3");
    themeSound = new sound("soundeffects/World'sHardestGame2ThemeSong.mp3");
    themeSound.play();
    coinSound = new sound("soundeffects/CoinCollect.wav");
}

//create a function to add "pause" and "mute" to the paragraph
function createNewElement(text) {
    this.text = text;
    var span = document.createElement("span");
    var span1 = document.createElement("span");
    var node1 = document.createTextNode(text.charAt(0));
    span1.appendChild(node1);
    span1.style.textDecoration = "underline";
    var span2 = document.createElement("span");
    var node2 = document.createTextNode(text.substring(1));
    span2.appendChild(node2);
    span.appendChild(span1);
    span.appendChild(span2);
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

//red square
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

//Engine
var game = {
    canvas: null,
    context : null,
    init : function() {
        game.keys=[];
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        if(pauseSwitch)
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
    this.speed = 1,
    this.animate = function(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.strokeStyle = colorStroke;
        ctx.lineWidth = lineWidth;
        ctx.ellipse(this.x, this.y, this.radius, 7, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        if (this.radius > 7 || this.radius <= 0){
          this.speed = -this.speed;
        }
        this.radius -= this.speed
    }
}

function update() {
    //crash with the blue ball
    for(var i = 0; i < obs.balls.length; i++){
        if(myGamePiece.crashWith(obs.balls[i])){
            deathTime += 1;
            if(soundSwitch)
                crashSound.play();
            game.stop();
            themeSound.stop();
            collectCoin = [false, false, false];
            setTimeout(startGame, 1000);
            return;
        }
    }

    //eat a coin
    for(var i = 0; i < collectCoin.length; i++){
        if(myGamePiece.crashWith(coins.coins[i])){
            if(!collectCoin[i] && soundSwitch)
                coinSound.play();
            collectCoin[i] = true;
            game.clear();
        }
    }

    // win the game
    if(collectCoin[0] && collectCoin[1] && collectCoin[2] &&
     myGamePiece.x > 730){
        game.stop();
        themeSound.stop();
        deathTime = 0;
        collectCoin = [false, false, false];
        alert("you made it!");
        startGame();


    }
    if(!soundSwitch) {
        themeSound.stop();
    }
    if(soundSwitch) {
        themeSound.play();
    }
    if(!pauseSwitch)
        themeSound.stop();

    if(pauseSwitch) {
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

    console.log(pauseSwitch);
 
}


function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}



