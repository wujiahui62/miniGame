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
    pair1: {
        ball1: ["p1b1", 400, 150, 11, 3, DARKBLUE],
        ball2: ["p1b2", 443, 150, 11, 3, DARKBLUE]
    },
    pair2: {
        ball1: ["p2b1", 483, 305, 11, -3, DARKBLUE],
        ball2: ["p2b2", 526, 305, 11, -3, DARKBLUE]
    },
    pair3: {
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
        gameCenterWall: {
            top: 100,
            bottom: 355,
        },
        safezoom: {
            l_l: 210,
            l_r: 382,
            top: 140,
            bottom: 288,
            r_l: 613,
            r_r: 788,
            win: 720
        }
    }
};

var screenOne,
    screenTwo,
    screenThree,
    screen = 1;

var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

window.addEventListener("load", function() {
    //DOM Loaded
    document.querySelector('p').style.display = 'none';
    startGame();

});


document.onkeyup = function(e) {
    if (screen == 3) {
        //set default value so that JS engine does not coerce it to undefined
        var s = screenThree || {};
        s.arrow = null;
    }
};
document.onkeydown = function(e) {
    if (screen == 3) {
        var s = screenThree || {};
        var code = e.keyCode;
        switch (code) {
            case 37:
                s.arrow = 'arrow_left';
                e.preventDefault();
                break;
            case 38:
                s.arrow = 'arrow_up';
                e.preventDefault();
                break;
            case 39:
                s.arrow = "arrow_right";
                e.preventDefault();
                break;
            case 40:
                s.arrow = "arrow_down";
                e.preventDefault();
                break;
        }
    }
};



function startGame() {
    //Begin
    game.init();
    screenOne = new SCREENONE({ can: game, animateWidth: 0, hover: false });
    screenTwo = new SCREENTWO({ can: game, time: 2000, speed: 20 });
    screenThree = new SCREENTHREE({ can: game, arrow: "" });

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
            if (document.querySelector('p').style.display == 'none') {
                document.querySelector('p').style.display = 'flex';
                document.querySelector('p').innerHTML = screenThree.dom_p();
                screenThree.dom_audio();
                screenThree.audio_bg.play();
                document.querySelector('body p').addEventListener("click", function(e) {
                    var ele = e.target,
                        type = ele.getAttribute('datatype') || "";
                    switch (type) {
                        case "pause":
                            screenThree.pause = !screenThree.pause;
                            if (screenThree.pause) {
                                game.stop();
                            } else {
                                game.init();
                            }
                            break;
                        case "mute":
                            screenThree.mute = !screenThree.mute;
                            if (screenThree.mute) {
                                screenThree.audio_bg.pause();
                            } else {
                                screenThree.audio_bg.play();
                            }
                            break;
                    }
                    document.querySelector('p').innerHTML = screenThree.dom_p();
                });
            }

            break;
    }
}

function reset(status) {
    var s = status || "";
    if (s == 'win') {
        screenThree = new SCREENTHREE({ can: game });
        alert("You Made It!");

    } else {
        screenThree.deadNum += 1;
        game.stop();
        setTimeout(function() {
            screenThree.obs = new obstacles(game);
            screenThree.tar = new TARGET(game);
            screenThree.box = new OBJECT(game);
            game.init();
        }, 400);
    }
    document.querySelector('p').innerHTML = screenThree.dom_p();
}

//Engine
var game = {
    canvas: null,
    context: null,
    init: function() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);
    },
    drawBackground: function() {
        if (this.context != undefined) {
            var img = new Image;
            img.src = BACKGROUND_IMAGE;
            this.context.drawImage(img, 0, 0);
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

//constructors
function SCREENONE(opt) {
    this.can = opt.can;
    this.ctx = opt.can.getContext();
    this.animateWidth = opt.animateWidth;
    this.ishover = opt.hover;
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
    //draw text background
    lg = ctx.createLinearGradient(0, b, w, 0);
    lg.addColorStop(0, c1);
    lg.addColorStop(0.5, c2);
    lg.addColorStop(1, c1);
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, w, b);

    //white liner
    ctx.font = " bold 100px  mono45-headline";
    ctx.textAlign = 'center';
    ctx.lineWidth = 8;
    ctx.strokeStyle = WHITE;
    w = ctx.measureText('HARDEST GAME').width / 2;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //black liner
    ctx.lineWidth = 6;
    ctx.strokeStyle = BLACK;
    ctx.strokeText('HARDEST GAME', 500, 160);
    //fill blue
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
    ctx.fillText("THE WORLD'S", 500 - w, 60);
    ctx.textAlign = 'right';
    ctx.fillText("VERSION 2.0", 500 + w, 200);
    //animate
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
    //calculate the length of loading bar
    w = ctx.measureText(txt).width;
    speed = w / (2000 / 20);
    this.animateWidth += speed;
    if (this.animateWidth < w) {
        ctx.fillText(txt, 500, b);
        ctx.strokeRect((1000 - w) / 2, b - 50, w, 10);
        ctx.fillRect((1000 - w) / 2, b - 50, this.animateWidth, 10);
    } else {
        //show begin after loading
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
    this.ctx = opt.can.getContext();
    this.time = opt.time;
    this.speed = opt.speed;

}

SCREENTWO.prototype.init = function() {
    if (this.speed >= this.time) {
        screen = 3;
        return;
    }
    var ctx = this.ctx,
        screen2_bg = SCREENS.screen2,
        color1 = screen2_bg.color1,
        color2 = screen2_bg.color2,
        x1 = 0,
        x2 = screen2_bg.w,
        y1 = 0,
        y2 = screen2_bg.b,
        lg = ctx.createLinearGradient(x1, y1, x1, y2);
    lg.addColorStop(0, color1);
    lg.addColorStop(1, color2);
    ctx.fillStyle = lg;
    ctx.fillRect(x1, y1, x2, y2);

    ctx.font = ' 26px Arial';
    ctx.fillStyle = BLACK;
    ctx.textAlign = 'center';
    ctx.fillText("YOU DON'T STAND A CHANCE.", 500, 200);
    this.speed += 20;
};


function SCREENTHREE(opt) {
    this.can = opt.can;
    this.ctx = opt.can.getContext();
    this.obs = new obstacles(opt.can);
    this.tar = new TARGET(opt.can);
    this.box = new OBJECT(opt.can);
    this.arrow = opt.arrow;
    this.pause = false;
    this.mute = false;
    this.deadNum = 0;

};
SCREENTHREE.prototype.init = function() {
    this.obs.animate();
    this.tar.animate();
    this.box.animate();
};
SCREENTHREE.prototype.dom_p = function() {
    var p = this.pause ? 'PLAY' : 'PAUSE',
        m = this.mute ? 'AUDIO' : 'MUTE',
        num = this.deadNum;
    return '<span>LEVEL:<span>1</span>/50</span><span style="cursor: pointer" datatype="pause"><span style="text-decoration: underline" >' + p.charAt(0) + '</span>' + p.substring(1) + '</span><span datatype="mute" style="cursor: pointer"><span style="text-decoration: underline" >' + m.charAt(0) + '</span>' + m.substring(1) +'</span><span>DEATHS:<span>' + num + '</span></span>';
};
SCREENTHREE.prototype.dom_audio = function(argument) {
    var e_bg = document.createElement('audio');
    var e_coin = document.createElement('audio');
    var e_ball = document.createElement('audio');
    e_bg.src = BG_VOICE;
    e_bg.setAttribute('loop', true);
    e_bg.setAttribute('id', 'audio_bg');
    e_coin.src = COIN_VOICE;
    e_coin.setAttribute('id', 'audio_coin');
    e_ball.src = BALL_VOICE;
    e_ball.setAttribute('id', 'audio_ball');
    document.body.appendChild(e_bg);
    document.body.appendChild(e_ball);
    document.body.appendChild(e_coin);
    SCREENTHREE.prototype.audio_coin = e_coin;
    SCREENTHREE.prototype.audio_bg = e_bg;
    SCREENTHREE.prototype.audio_ball = e_ball;
};

function obstacles(game) {
    //create the array of balls that will be animated
    this.game = game;
    this.balls = [ball.construct(BALLS.pair1.ball1),
        ball.construct(BALLS.pair1.ball2),
        ball.construct(BALLS.pair2.ball1),
        ball.construct(BALLS.pair2.ball2),
        ball.construct(BALLS.pair3.ball1),
        ball.construct(BALLS.pair3.ball2),
    ];
    this.animate = function() {
        //loop through the balls array
        //draw the balls
        this.game.drawBackground();
        for (var i = 0; i < this.balls.length; i++) {
            this.balls[i].animate(this.game.getContext());
        }

    };
};

function ball(name, x, y, radius, speed, color) {
    this.name = name,
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.speed = speed,
        this.color = color,
        this.animate = function(ctx) {
            //Draw ball
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.fill();

            //Animate
            var wall = SCREENS.screen3.gameCenterWall;
            if (this.y - this.radius + this.speed < wall.top ||
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

function coin(name, x, y, radius, width, color, borderColor) {
    this.name = name,
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.radius_x = radius,
        this.width = width,
        this.color = color,
        this.borderColor = borderColor,
        this.animate = function(ctx) {
            //Draw coin
            ctx.fillStyle = this.borderColor;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius_x, this.radius, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.ellipse(this.x, this.y, this.radius_x - 2, this.radius - 2, 0, 0, 2 * Math.PI);
            ctx.fill();
            this.radius_x -= this.width;
            if (this.radius_x <= 2 || this.radius_x >= this.radius) {
                this.width = -this.width;
                this.radius_x -= this.width;
            }
        };
}

function OBJECT(game) {
    this.game = game;
    this.box = box.construct(BOX);
    this.animate = function() {
        this.box.animate(this.game.getContext());

    };
}

function box(name, x, y, width, speed, color, border) {
    var that = this;
        this.name = name,
        this.x = x,
        this.y = y,
        this.speed = speed,
        this.width = width,
        this.color = color,
        this.border = border,
        this.animate = function(ctx) {
            var gameCenterWall = SCREENS.screen3.gameCenterWall,
                safezoom = SCREENS.screen3.safezoom,
                touchBalls = this.touch(screenThree.obs.balls),
                touchCoins = this.touch(screenThree.tar.coins);
            if (touchBalls !== false) {
                if (!screenThree.mute) {
                    screenThree.audio_ball.play();
                }
                reset();
            };
            if (touchCoins !== false) {
                if (!screenThree.mute) {
                    screenThree.audio_coin.play();
                }
                screenThree.tar.coins.splice(touchCoins, 1);
            };
            if (screenThree.tar.coins.length == 0 && this.x > safezoom.win) {
                reset('win');
                return;
            }
            this.arrow = screenThree.arrow || "";
            ctx.fillStyle = this.border;
            switch (this.arrow) {
                case 'arrow_left':
                    this.x -= speed;
                    break;
                case 'arrow_up':
                    this.y -= speed;
                    break;
                case 'arrow_right':
                    this.x += speed;
                    break;
                case 'arrow_down':
                    this.y += speed;
                    break;

            };
            if (this.x < safezoom.l_r || this.x > safezoom.r_l) {
                this.x = this.x > safezoom.l_l ? this.x : safezoom.l_l;
                this.x = this.x > safezoom.r_r ? safezoom.r_r : this.x;
                this.y = this.y < safezoom.top ? safezoom.top : this.y;
                this.y = this.y > safezoom.bottom ? safezoom.bottom : this.y;
            } else if (this.x >= safezoom.l_r && this.x <= safezoom.r_l) {
                this.y = this.y < gameCenterWall.top ? gameCenterWall.top : this.y;
                this.y = this.y > gameCenterWall.bottom - this.width - 4 ? gameCenterWall.bottom - this.width - 4 : this.y;
            }

            ctx.fillRect(this.x, this.y, this.width, this.width);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.width - 4);
        },
        this.touch = function(obj) {
            var $obj = obj || [];
            for (var i = 0; i < $obj.length; i++) {
                var $obj_x = $obj[i].x,
                    $obj_y = $obj[i].y,
                    $obj_w = $obj[i].radius,
                    b_x = this.x,
                    b_y = this.y,
                    b_w = this.width,
                    x = $obj_x - b_x,
                    y = $obj_y - b_y,
                    limit = $obj_w + b_w;
                if ((x <= limit && x >= -$obj_w) && (y <= limit && y >= -$obj_w)) {
                    return i;
                }
            }
            return false;
        };
}




