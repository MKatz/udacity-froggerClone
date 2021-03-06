// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Random speeds
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 250) + 50);
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 600) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
    // Enemy collision
    if (player.x >= this.x - 25 && player.x <= this.x + 25) {
        if (player.y >= this.y - 25 && player.y <= this.y + 25) {
            player.reset();
        }
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player movement
Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 50;
    } else if (this.ctlKey === 'right' && this.x != 400) {
        this.x = this.x + 50;
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 50;
    } else if (this.ctlKey === 'down' && this.y != 400) {
        this.y = this.y + 50;
    }
    this.ctlKey = null;
    //water reset
    if (this.y < 50) {
        this.reset();
    }
};
// Reset your loser player
Player.prototype.reset = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};
Player.prototype.handleInput = function(e) {
    this.ctlKey = e;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(-100, 50));
    allEnemies.push(new Enemy(-100, 100));
    allEnemies.push(new Enemy(-100, 150));
    allEnemies.push(new Enemy(-100, 200));
    allEnemies.push(new Enemy(-100, 250));
}());
// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
