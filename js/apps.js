var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += 200 * (this.speed * dt);
    } else {
        this.x = -100;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

Player.prototype.update = function(dt) {
    // Check collision
    for (var i = 0, len = allEnemies.length; i < len; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
            this.reset();
        }
    }

    // reaches the water 
    if (this.y < 50) {
        this.reset();
    };
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === "left" && this.x > 10)
        this.x -= 100;
    if (key === "right" && this.x < 400)
        this.x += 100;
    if (key === "up" && this.y > 0)
        this.y -= 80;
    if (key === "down" && this.y < 390)
        this.y += 80;
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 390;
};

var enemy1 = new Enemy(-450, 60, 1);
var enemy2 = new Enemy(200, 150, 1.5);
var enemy3 = new Enemy(-50, 230, 1.25);
var enemy4 = new Enemy(-600, 150, 2.4);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player(200, 390, 1);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
