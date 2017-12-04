var player;
var platforms;
var cursors;
var stars;
var baddies;
var score = 0;
var dodgeball;
var baddieScore = 0;

test.lvl1 = function(){};
test.lvl1.prototype = 

{
    preload: function()
    {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.spritesheet('dude', 'assets/dude.png', 28, 48);
    

 },
    create: function()
    {
    game.physics.startSystem(Phaser.Physics.ARCADE);
        
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 10, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    game.add.sprite(0, 0, 'sky');
    
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 900;
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 1;
    player.animations.add('left', [0, 1, 0, 1], 5, true);
    player.animations.add('right', [2, 3, 2, 3], 5, true);
    player.scale.setTo(2,2)
    
    stars = game.add.group();
    stars.enableBody = true;
    stars.scale.setTo(1.5,1.5)
        
    dodgeball = game.add.group();
    dodgeball.enableBody = true;
    dodgeball.scale.setTo(1.5,1.5)
    
    baddies = game.add.group();
    baddies.enableBody = true;
    baddies.scale.setTo(2.5,2.5)
    
    for (var i = 0; i < 2; i++)
    {
        var star = stars.create(i * 100, 300, 'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = 1;
        star.body.velocity.x = 200;
        star.body.bounce.x = 1;
        star.body.collideWorldBounds = true;
        star.maxVelocity = 10;
    }
        
    for (var i = 0; i < 2; i++)
    {
        var star = stars.create(i * 250 , 300, 'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = 1;
        star.body.velocity.x = -200;
        star.body.bounce.x = 1;
        star.body.collideWorldBounds = true;
        star.maxVelocity = 10;
    }
    
    for (var i = 0; i < 2; i++)
    {
        var baddie = baddies.create(i * 250, 0, 'baddie', );
        baddie.frame = 1
        baddie.body.gravity.y = 300 + Math.random() * 20;
        baddie.body.bounce.y = 1;
        baddie.body.velocity.x = -300 - Math.random() * 20;
        baddie.body.bounce.x = 1;
        baddie.body.collideWorldBounds = true;
        baddie.maxVelocity = 10;
    }
        
    for (var i = 0; i < 3; i++)
    {
        var baddie = baddies.create(i * 250, 0, 'baddie', );
        baddie.frame = 1
        baddie.body.gravity.y = 300 + Math.random() * 20;
        baddie.body.bounce.y = 1;
        baddie.body.velocity.x = 300 + Math.random() * 20;
        baddie.body.bounce.x = 1;
        baddie.body.collideWorldBounds = true;
        baddie.maxVelocity = 10;
    }
    
    cursors = game.input.keyboard.createCursorKeys();
        
    text = game.add.text(game.world.centerX, game.world.centerY, "- Dodgeball Bouncy House! -\nPress Space, Defeat the Bullies!", { font: "55px Arial", fill: "green", align: "center" });
    text.anchor.setTo(0.5, 0.5);

    game.time.events.add(Phaser.Timer.SECOND * 4, removeText, this);
        
    },
    update: function()
    {

    player.body.velocity.x = 0;
    
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(baddies, platforms);
    game.physics.arcade.collide(dodgeball, platforms);
    game.physics.arcade.collide(player, baddies);
    game.physics.arcade.collide(baddies, baddies);
    game.physics.arcade.collide(stars, baddies);
    
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, dodgeball, collectBall, null, this);
    game.physics.arcade.overlap(player, baddies, collectBaddie, null, this);
    game.physics.arcade.overlap(dodgeball, baddies, killBaddie, null, this);

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
        
    if (player.body.velocity.y <= 0 && cursors.up.isDown){
        player.body.gravity.y = 600;}
    
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
      {
        player.body.velocity.y = -500;
    }

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    if (this.spaceKey.isDown && score != 0)
        {
            var ball = dodgeball.create(player.x + 100, player.y, 'star');
                ball.body.gravity.y = Math.random() * 500;
                ball.body.bounce.y = 0.7 + Math.random() * 0.4;
                ball.body.velocity.x = -(Math.random() * 500);
                ball.body.bounce.x = 0.7 + Math.random() * 0.4;
                ball.body.collideWorldBounds = true;
                ball.maxVelocity = 10;
            if (player.body.velocity.x < 0) {
               ball.body.velocity.x = -(700);
            }
            else
                {
                   ball.body.velocity.x = 700;
                }
            score -= 1
        }
    
}}
;
    
function collectStar (player, star) {
    
    star.kill();
    score += 1;

}

function collectBall (player, ball) {
    
    ball.kill();
    score += 1;

}
    
function collectBaddie (player, baddie) {
    
    strs = Math.floor(score / 2)
    threst = score - strs
    
    for (var i = 0; i < strs; i++)
    {
        var star = stars.create(i * 100, 300, 'star');
        star.body.gravity.y = 900;
        star.body.bounce.y = 1;
        star.body.velocity.x = Math.random() * 500;
        star.body.bounce.x = 0.7 + Math.random() * 0.4;
        star.body.collideWorldBounds = true;
    }
        
    for (var i = 0; i < threst; i++)
    {
        var star = stars.create(i * 160, 300, 'star');
        star.body.gravity.y = Math.random() * 500;
        star.body.bounce.y = 0.7 + Math.random() * 0.4;
        star.body.velocity.x = -(Math.random() * 500);
        star.body.bounce.x = 0.7 + Math.random() * 0.4;
        star.body.collideWorldBounds = true;
    }
    
    score = 0;
    
}

function killBaddie (dodgeball, baddie) {
    baddie.kill();
    baddieScore += 1;
    if (baddieScore == 15)
        { 
            game.state.start('lvl2');
        }
    
    if (baddieScore <= 10) {
        var baddie = baddies.create(250, 0, 'baddie', );
        baddie.frame = 1
        baddie.body.gravity.y = 300 + (Math.random() * 20);
        baddie.body.bounce.y = 1;
        baddie.body.velocity.x = 300 + (Math.random() * 20);
        baddie.body.bounce.x = 1;
        baddie.body.collideWorldBounds = true;
        // baddie.maxVelocity = 10;
    }
}
function removeText() {

    text.destroy();
    
}