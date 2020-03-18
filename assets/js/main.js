var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
            gravity: {
                y: 0,
                x: 0,
            },
        },
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.spritesheet('items', 'assets/images/items.png', {frameWidth:32, frameHeight:32});
    this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth:32, frameHeight:32});
    this.load.audio('goldSound', 'assets/audio/Pickup.wav');
}
 
function create() {
    var goldPickupAudio = this.sound.add('goldSound', {loop: false});

    this.wall = this.physics.add.image(200, 300, 'button1');
    this.wall.setImmovable(true);

    this.add.image(500, 230, 'items', 2);

    this.chest = this.physics.add.image(100, 100, 'items', 0);

    this.player = this.physics.add.image(32,32, 'characters', 0);
    this.player.setScale(2, 2);
    this.player.body.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(this.player, this.chest, function(player, chest){ goldPickupAudio.play(); 
        chest.destroy(); });

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    this.player.setVelocity(0);

    if (this.cursors.left.isDown){
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown){
        this.player.setVelocityX(160);
    }

    if (this.cursors.up.isDown){
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown){
        this.player.setVelocityY(160);
    }
}