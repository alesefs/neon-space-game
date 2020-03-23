Campus.Splash = function(game) {
	timer = 150;
};
Campus.Splash.prototype = {
	create: function() {

		///background
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

		///logo energie
		this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'energie');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.alpha = 1;
   		this.game.add.tween(this.logo).to( { alpha: 0 }, 3200, Phaser.Easing.Linear.None, true, 0, 1000, true);

		//timerText = this.game.add.text(15, 15, "Time: "+timer, { font: "24px Arial", fill: "#e4beef" });
	},

	update: function(){
		timer -= 1;
		//timerText.text = "Time: "+timer;

		if(timer <= 0){
			timer = 0;
			this.callMainMenu();
		}
	},

	callMainMenu: function(){
		this.game.state.start('MainMenu');
		this.logo.destroy();
		timer = 150;
	}

};