class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    create() {
        var goldPickupAudio = this.sound.add('goldSound', {loop: false});

        this.wall = this.physics.add.image(200, 300, 'button1');
        this.wall.setImmovable(true);

        this.add.image(500, 230, 'items', 2);

        this.chest = this.physics.add.image(100, 100, 'items', 0);

        this.player = new Player(this, 32,32, 'characters', 0);
        

        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, function(player, chest){ goldPickupAudio.play(); 
            chest.destroy(); });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.player.update(this.cursors);
    }
}