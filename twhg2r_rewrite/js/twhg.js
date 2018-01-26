const DARKBLUE = 'rgb(0,0,139)';
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
    pair1 : {
        ball1 : ["p1b1", 400, 150, 11, 3, DARKBLUE],
        ball2 : ["p1b2", 443, 150, 11, 3, DARKBLUE]
    },
    pair2 : {
        ball1: ["p2b1", 483, 305, 11, -3, DARKBLUE],
        ball2: ["p2b2", 526, 305, 11, -3, DARKBLUE]
    },
    pair3 : {
        ball1: ["p3b1", 569, 150, 11, 3, DARKBLUE],
        ball2: ["p3b2", 612, 150, 11, 3, DARKBLUE]
    },
};
const COINS = {
    coin1: ["coin1", 420, 268, 10, 0.4, YELLOW, BLACK],
    coin2: ["coin2", 506, 185, 10, 0.4, YELLOW, BLACK],
    coin3: ["coin3", 592, 268, 10, 0.4, YELLOW, BLACK],    
};
const BOX = ['box', 250, 215, 20, 8, 'red', BLACK];
const SCREENS = {
    screen1 : {
        color1: '#090909',
        color2: "#4d4d4d",
        w: 1000,
        b: 490, 
    },
    screen2 : {
        color1: PINK,
        color2: LBLUE,
        w: 1000,
        b: 490,
    },
    screen3 : {

    },
}

var screenOne, screenTwo, screenThree, screen = 1;

var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

//game engine
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
            image.src = BACKGROUND_IMAGE;
            this.context.drawImage(img, 0, 0)
        }
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext: function() {
        return this.context;
    }
};

//start game on load
window.addEventListener('load', function() {
    document.querySelector('p').style.display = 'none';
    startGame();
});

document.onkeyup = function(e) {
    if(screen == 3) {
        //set default value so that JS engine does not coerce it to undefined
        var s = screenThree || {};
        s.arrow = null;
    }
};

document.onkeydown = function(e) {
    if(screen == 3) {
        var s = screenThree || {};
        var code = e.keyCode;
        switch(code) {
            case 37:
                s.arrow = 'arrow_left';
                e.preventDefault();
                break;
            case 38:
                s.arrow = 'arrow_up';
                e.preventDefault();
                break;
            case 39:
                s.arrow = 'arrow_right';
                e.preventDefault();
                break;
            case 40:
                s.arrow = 'arrow_down';
                e.preventDefault();
                break;
        }
    }
};

function startGame() {
    game.init();
    screenOne = new SCREENONE({ can: game, animateWidth: 0 });
    screenTwo = new SCREENTWO({can: game, time: 2000, speed: 20});
}

function update() {
    game.clear();
    switch(screen) {
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

}

function SCREENONE(opt) {
   this.can = opt.can;
   this.ctx = opt.can.getContext();
   this.animateWidth = opt.animateWidth;
   this.ishover = opt.ishover;
}

SCREENONE.prototype.init = function() {
    var ctx = this.ctx,
        s1 = SCREENS.screen1,
        c1 = s1.color1,
        c2 = s1.color2,
        color1 = '#6292e1',
        color2 = '#165398',
        w = s1.w,
        b = s1.b,
        lg;
    //draw text backgroun
    lg = ctx.createLinearGradient(0, b, w, 0);
    lg.addColorStop(0, c1);
    lg.addColorStop(0.5, c2);
    lg.addColorStop(1, c1);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, b);

    //white edge
    ctx.font = " bold 100px  mono45-headline";
    ctx.textAlign = 'center';
    ctx.lineWidth = 8;
    ctx.strokeStyle = WHITE;
    w = ctx.measureText('HARDEST GAME').width / 2;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //black edge
    ctx.lineWidth = 6;
    ctx.strokeStyle = BLACK;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //blue fill
    lg = ctx.createLinearGradient(0, 0, 0, 160);
    lg.addColorStop(0, color2);
    lg.addColorStop(0.5, color1);
    lg.addColorStop(1, color2);
    ctx.fillStyle = lg;
    ctx.fillText('HARDEST GAME', 500, 160);

    //THE WORLD’S
    
    ctx.font = '22px Arial';
    ctx.fillStyle = WHITE;
    ctx.textAlign = 'left';
    ctx.fillText('THE WORLD’S', 500 - w, 60);
    ctx.textAlign = 'right';
    ctx.fillText('VERSION 2.0', 500 + w, 200);
    this.animate();
};
SCREENONE.prototype.animate = function() {
    var ctx = this.ctx,
        can = this.can,
        that = this,
        b = 420,
        txt = "This is the world's hardest game. It is harder than any game you have ever played, or ever will play.",
        w,
        speed;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = WHITE;
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 2;
    //loading bar 
    w = ctx.measureText(txt).width;
    speed = w / (2000 / 20);
    this.animateWidth += speed;
    if (this.animateWidth < w) {
        ctx.fillText(txt, 500, b);
        ctx.strokeRect((1000 - w) / 2, b - 50, w, 10);
        ctx.fillRect((1000 - w) / 2, b - 50, this.animateWidth, 10);
    } else {
        //showbegin
        ctx.font = '46px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = WHITE;
        if (this.ishover) {
            ctx.fillStyle = '#919191';
        }
        ctx.fillText('BEGIN', 500, 380);
        if (!can.canvas.onmousemove) {
            can.canvas.onmousemove = function(e) {
                var ex = e.offsetX,
                    ey = e.offsetY;
                if (ex >= 400 && ex <= 600 && ey >= 340 && ey <= 380) {
                    that.ishover = true;
                    e.target.style.cursor = 'pointer';
                } else {
                    that.ishover = false;
                    e.target.style.cursor = 'default';
                }
            };
            can.canvas.onclick = function(e) {
                var ex = e.offsetX,
                    ey = e.offsetY;
                if (ex >= 400 && ex <= 600 && ey >= 340 && ey <= 380) {
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
    this.can = opt.can;
    this.ctx = this.can.getContext();
    this.time = opt.time;
    this.speed = opt.speed;
}

SCREENTWO.prototype.init = function() {
    if(this.speed >= this.time) {
        screen = 3;
        return;
    }
    var ctx = this.ctx;
        screen2_bg = SCREENS.screen2;
        color1 = screen2_bg.color1;
        color2 = screen2_bg.color2;
        x1 = 0,
        x2 = screen2_bg.w;
        y1 = 0,
        y2 = screen2_bg.b,
        lg = ctx.createLinearGradient(x1, y1, x2, y2);
    lg.addColorStop(0, color1);
    lg.addColorStop(1, color2);
    ctx.fillStyle = lg;
    ctx.fillRect(x1, y1, x2, y2);

    ctx.font = '26px Arial';
    ctx.fillStyle = BLACK;
    ctx.textAlign = 'center';
    ctx.fillText("YOU DON'T STAND A CHANCE", 500, 200);
    this.speed += 20;
}
