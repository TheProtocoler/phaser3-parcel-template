import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene
{
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
	constructor()
	{
		super("MainScene")
	}

	preload()
    {
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 32, frameHeight: 48
        })
    }

    create()
    {
        this.add.image(400, 300, 'sky')
        //console.log(this.randomXandYTileGenerator())
        this.platforms = this.physics.add.staticGroup();
        
        const ground = this.platforms.create(400, 568, 'ground') as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        //this.platforms.create(100, 500, 'ground')
        // this.platforms.create(50, 250, 'ground')
        // this.platforms.create(750, 220, 'ground')

        // this.platforms.create(64, 534, "ground")
        // this.platforms.create(53, 417, 'ground')

        this.createPlatforms("ground")
        this.createPlatforms("ground")
        this.createPlatforms("ground")


        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        
        this.anims.create({
            key:'turn',
            frames: [{key:'dude', frame:4}],
            frameRate: 20
        })

        
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })
        this.physics.add.collider(this.player, this.platforms)
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
       
        // = this.cursors.left && this.cursors
        if(this.cursors?.left?.isDown){
            this.player?.setVelocityX(-160)
            this.player?.anims.play('left', true)
        }
        else if (this.cursors?.right?.isDown)
        {
            this.player?.setVelocityX(160)
            this.player?.anims.play('right', true)
        }
        else{
            this.player?.setVelocityX(0);
            this.player?.anims.play('turn');
        }
        if(this.cursors?.up.isDown && this.player?.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
    randomXandYTileGenerator(): [number, number]{
        let rnd = new Phaser.Math.RandomDataGenerator()
        
        let x_val = rnd.between(0, 700)
        let y_val = rnd.between(300, 400)
        console.log([x_val, y_val])
        return [x_val, y_val]

    }

    createPlatforms(sprite): Phaser.Physics.Arcade.StaticBody{
        let rndVal = this.randomXandYTileGenerator();

        return this.platforms?.create(rndVal[0], rndVal[1], sprite)
    }
}
