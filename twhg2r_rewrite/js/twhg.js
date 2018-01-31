const DARKBLUE = 'rgb(0, 0, 139)';
const YELLOW = 'rgb(255, 215, 0)';
const BLACK = 'rgb(0,0,0)';
const WHITE = 'rgb(255,255,255)';
const LBLUE = '#AFB1FE';
const PINK = '#E8E9FE';
const BACKGROUND_IMAGE = "images/world-hardest-game-2-bg-level-1.png";
const BG_VOICE = "soundeffects/World'sHardestGame2ThemeSong.mp3";
const BALL_VOICE = "soundeffects/RealisticPunch.mp3";
const COIN_VOICE = "soundeffects/CoinCollect.wav";
const BALLS = {
    pair1: {
        ball1: ['p1b1', 400, 113, 11, 3, DARKBLUE],
        ball2: ['p1b2', 443, 113, 11, 3, DARKBLUE],
    },
    pair2: {
        ball1: ["p2b1", 485, 339, 11, -3, DARKBLUE],
        ball2: ["p2b2", 529, 339, 11, -3, DARKBLUE],        
    },
    pair3: {
        ball1: ["p3b1", 570, 113, 11, 3, DARKBLUE],
        ball2: ["p3b2", 613, 113, 11, 3, DARKBLUE],        
    },
};
const COINS = {
    coin1 : ["p1b1", 421.5, 269, 7, 'yellow', BLACK, 3, 1],
    coin2 : ["p1b2", 507, 182, 7, 'yellow', BLACK, 3, 1],
    coin3 : ["p1b3", 591.5, 269, 7, 'yellow', BLACK, 3, 1],
}
const BOX = ['box', 250, 215, 20, 8, 'red', BLACK];
const SCREENS = {
    screen1: {
        color1: '#090909',
        color2: "#4d4d4d",
        w: 1000,
        b: 490,
    },

    screen2: {
        color1: PINK,
        color2: LBLUE,
        w: 1000,
        b: 490,
    },

    screen3: {
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
    },
};

var screenOne, screenTwo, screenThree, screen = 1;

var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

window.addEventListener('load', function(){
    document.querySelector('p').style.display = 'none';
    startGame();
});

function startGame() {
    game.init();
    screenOne = new SCREENONE({canvas: game, animateWidth: 0, isHover: false});
    screenTwo = new SCREENTWO({canvas: game, timeLapsed: 0, time: 2000});
    screenThree = new SCREENTHREE({canvas: game, });    
}

function update() {
    game.clear();
    switch (screen) {
        case 1:
            screenOne.init();
            break;
        case 2:
            screenTwo.init();
            break;
        case 3:
            screenThree.init();
            break;
    }
}

function reset(status) {
    var s = status || "";
    if(s == 'win') {
        screenThree = new SCREENTHREE({can: game});
        alert("You made it!");
    } else {
        screenThree.deadNum += 1;
        game.stop();
        setTimeout(function() {
            screenThree.obs = new OBSTACLES(game);
            screenThree.tar = new TARGET(game);
            // screenThree.box = new OBJECT(game);
            game.init();
        }, 400);
    }
}

var game = {
    canvas: null,
    context: null,
    init: function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);
    },
    drawBackground: function() {
        if(this.context != undefined) {
            var img = new Image;
            img.src = BACKGROUND_IMAGE;
            this.context.drawImage(img, 0, 0);
        }
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },  
    stop: function() {
        clearInterval(this.interval);        
    },
    getContext: function() {
        return this.context;
    },
};

function SCREENONE(opt) {
    this.canvas = opt.canvas;
    this.context = opt.canvas.getContext();
    this.animateWidth = opt.animateWidth;
    this.isHover = opt.isHover;
}

SCREENONE.prototype.init = function() {
    var ctx = this.context,
        s1 = SCREENS.screen1,
        c1 = s1.color1,
        c2 = s1.color2,
        color1 = '#6292e1',
        color2 = '#165398',
        w = s1.w,
        b = s1.b,
        lg; //linearGradient
    //create gradient background    
    lg = ctx.createLinearGradient(0, b, w, 0);
    lg.addColorStop(0, c1);
    lg.addColorStop(0.5, c2);
    lg.addColorStop(1, c1);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, b);
    //white text
    ctx.font = " bold 100px  mono45-headline";
    ctx.textAlign = 'center';
    ctx.lineWidth = 8;
    ctx.strokeStyle = WHITE;
    w = ctx.measureText('HARDEST GAME').width / 2;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //black text
    ctx.lineWidth = 6;
    ctx.strokeStyle = BLACK;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //fill with blue
    lg = ctx.createLinearGradient(0, 0, 0, 160);
    lg.addColorStop(0, color2);
    lg.addColorStop(0.5, color1);
    lg.addColorStop(1, color2);
    ctx.fillStyle = lg;
    ctx.fillText('HARDEST GAME', 500, 160);
    //the world's
    ctx.font = '22px Arial';
    ctx.fillStyle = WHITE;
    ctx.textAlign = 'left';
    ctx.fillText("THE WORLD'S", 500 - w, 60);
    ctx.textAlight = 'right';
    ctx.fillText("VERSION 2.0", 500 + w, 200);
    //load animation
    this.animate();
};

SCREENONE.prototype.animate = function() {
    var ctx = this.context,
        can = this.canvas,    
        that = this,
        b = 420,
        txt = "This is the world's hardest game. It is harder than any game you have ever played, or ever will play.",
        w,
        speed;
    ctx.textAlign = 'center';
    ctx.fillStyle = WHITE;
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 2;
    ctx.font = '16px Arial';
    //calculate the width of loading bar
    w = ctx.measureText(txt).width;
    //calculate the speed of the loading bar, it takes 2000ms, the canvas updates every 20ms
    speed = w / (2000 / 20);
    this.animateWidth += speed;
    if (this.animateWidth < w) {
        ctx.fillText(txt, 500, b);
        ctx.strokeRect((1000 - w) / 2, b - 50, w, 10);
        ctx.fillRect((1000 - w) / 2, b - 50, this.animateWidth, 10);
    } else {
        ctx.font = '46px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = WHITE;
        if(this.isHover) {
            ctx.fillStyle = '#919191';
        }
        ctx.fillText('BEGIN', 500, 380);
        if(!can.canvas.onmousemove) {
            can.canvas.onmousemove = function(e) {
                var ex = e.offsetX;
                    ey = e.offsetY;
                if(ex >= 400 && ex <= 600 && ey >= 340 && ey <= 380) {
                    that.isHover = true;
                    e.target.style.cursor = 'pointer';
                } else {
                    that.isHover = false;
                    e.target.style.cursor = 'default';
                }
            };
            can.canvas.onclick = function(e) {
                var ex = e.offsetX;
                    ey = e.offsetY;
                if(ex >= 400 && ex <= 600 && ey >= 340 && ey <= 380) {
                    screen = 2;
                    e.target.style.cursor = 'default';
                    can.canvas.onmousemove = null;
                    can.canvas.onclick = null;
                }
            };
        }
    }   

};

function SCREENTWO(opt) {
    this.canvas = opt.canvas;
    this.context = opt.canvas.getContext();
    this.timeLapsed = opt.timeLapsed;
    this.time = opt.time;
}

SCREENTWO.prototype.init = function() {
    if(this.timeLapsed >= this.time) {
        screen = 3;
        return;
    }
    var ctx = this.context,
        s2 = SCREENS.screen2,
        color1 = s2.color1,
        color2 = s2.color2,
        w = s2.w,
        b = s2.b,
        lg;
    lg = ctx.createLinearGradient(0, 0, w, b);
    lg.addColorStop(0, color1);
    lg.addColorStop(1, color2);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, b);

    ctx.font = '26px Arial';
    ctx.fillStyle = BLACK;
    ctx.textAlign = 'center';
    ctx.fillText("YOU DON'T STAND A CHANCE.", 500, 200);
    this.timeLapsed += 20;
};

function SCREENTHREE(opt) {
    this.canvas = opt.canvas;
    this.context = opt.canvas.getContext();
    this.obs = new OBSTACLES(opt.canvas);
    this.tar = new TARGET(opt.canvas);
    // this.box = new OBJECT(opt.can);
    this.arrow = opt.arrow;
    this.pause = false;
    this.mute = false;
    this.deadNum = 0;
}

SCREENTHREE.prototype.init = function() {
    this.obs.animate();
    this.tar.animate();
    // this.box.animate();
};

function OBSTACLES(game) {
    this.game = game;
    this.balls = [
        ball.construct(BALLS.pair1.ball1),
        ball.construct(BALLS.pair1.ball2),
        ball.construct(BALLS.pair2.ball1),
        ball.construct(BALLS.pair2.ball2),
        ball.construct(BALLS.pair3.ball1),
        ball.construct(BALLS.pair3.ball2),        
    ];
    this.animate = function() {
        this.game.drawBackground();
        for(var i = 0; i < this.balls.length; i++) {
            this.balls[i].animate(this.game.getContext());
        }
    };
}

function ball(name, x, y, radius, speed, color) {
    this.name = name,
    this.x = x,
    this.y = y, 
    this.radius = radius,
    this.color = color,
    this.speed = speed,
    this.animate = function(ctx) {
        //draw ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();

        //animate
        var wall = SCREENS.screen3.gameCenterWall;
        if(this.y - this.radius + this.speed < wall.top ||
            this.y + this.radius + this.speed > wall.bottom) {
                this.speed = -this.speed;
        } 
        this.y += this.speed;
    };
}

function TARGET(game) {
    this.game = game;
    this.coins = [
        coin.construct(COINS.coin1),
        coin.construct(COINS.coin2),
        coin.construct(COINS.coin3),
    ];
    
    this.animate = function() {
        for (var i = 0; i < this.coins.length; i++) {
            this.coins[i].animate(this.game.getContext());
        }
    };
}


function coin(name, x, y, radius, color, colorStroke, lineWidth, speed) {
    this.name = name,
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.lineWidth = lineWidth,
        this.color = color,
        this.colorStroke = colorStroke,
        this.speed = speed;
        this.animate = function(ctx) {
            //Draw coin
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
        };
}


