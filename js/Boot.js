var Campus = {};
Campus.Boot = function(game) {};
Campus.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'img/menu/loading-bg.png');
		this.load.image('preloaderBar', 'img/menu/loading-bar.png');
	},

	create: function() {
		this.game.input.maxPointers = 1;
		//this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.startFullScreen();
		this.game.state.start('Preloader');
	}
};