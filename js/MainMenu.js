Campus.MainMenu = function(game) {
	emitter = null;
};
Campus.MainMenu.prototype = {
	create: function() {

		var myBitmap = this.game.add.bitmapData(800, 600);
		var grd = myBitmap.context.createLinearGradient(0,0,0,600);
		grd.addColorStop(0,"#000000");
		grd.addColorStop(150/600,"#000010");
		grd.addColorStop(300/600,"#000025");
		grd.addColorStop(450/600,"#000010");
		grd.addColorStop(1,"#000000");
		myBitmap.context.fillStyle = grd;
		myBitmap.context.fillRect(0,0,800,600);
		this.game.add.sprite(0, 0, myBitmap);

		emitter = this.game.add.emitter(this.game.world.width, this.game.world.centerY, 3000);
		emitter.height = this.game.world.height;
		emitter.minParticleScale = 0.01;
		emitter.maxParticleScale = 0.5;
		emitter.makeParticles('star');
		emitter.setXSpeed(-100, -1000);
		emitter.setYSpeed(100, 50);
		emitter.start(false, 1500, 1, 0);

		this.marca = this.add.sprite(/*this.game.world.centerX*/ -100, this.game.world.centerY - 100, 'logo');
		this.marca.anchor.setTo(0.5,0.5);
		this.game.add.tween(this.marca).to({ x: this.game.world.centerX }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

		this.startButton = this.add.button(this.game.world.centerX + 75, this.game.world.centerY + 70, 'start', this.startGame, this, 1, 1, 0);
		this.startButton.anchor.setTo(0.5,0.5);

		this.infoButton = this.add.button(this.game.world.centerX + 75, this.game.world.centerY + 120, 'info', this.infoGame, this, 1, 1, 0);
		this.infoButton.anchor.setTo(0.5,0.5);
	},

	startGame: function() {
		this.game.state.start('Game');
		this.marca.destroy();
		this.startButton.destroy();
		this.infoButton.destroy();
	},

	infoGame: function() {
		this.game.state.start('Preloader');
		this.marca.destroy();
		this.startButton.destroy();
		this.infoButton.destroy();
	}
};