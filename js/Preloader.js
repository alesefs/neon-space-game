Campus.Preloader = function(game) {};
Campus.Preloader.prototype = {
	preload: function() {
		//scale game
	    //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	    //this.game.scale.forceLandscape = true;
        //this.game.scale.pageAlignHorizontally = true;
	    //this.game.scale.startFullScreen();
	    //this.game.scale.refresh();


		///background
		//this.game.stage.backgroundColor = '#000010';

		
		this.preloadBg = this.add.sprite(((this.game.world.width - 300)/2), ((this.game.world.height - 75)/2), 'preloaderBg');
		//this.preloadBg.anchor.setTo(0.5,0.5);
		this.preloadBar = this.add.sprite(((this.game.world.width - 300)/2), ((this.game.world.height - 75)/2), 'preloaderBar');
		//this.preloadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('energy', 'img/menu/energy.png');
		this.load.image('logo', 'img/menu/neonspace.png');
		this.load.image('star', 'img/menu/star.png');
		this.load.image('energie', 'img/menu/energia.png');
		this.load.spritesheet('start', 'img/menu/start.png', 175, 58);
		this.load.spritesheet('info', 'img/menu/info.png', 175, 58);
		this.load.image('baseM', 'img/menu/base.png');
		this.load.image('alavancaM', 'img/menu/manch.png');
		this.load.image('ship', 'img/menu/ship.png');
		/*this.load.image('title', 'img/menu/title.png');
		this.load.image('button-pause', 'img/menu/button-pause.png');
		this.load.image('button-start', 'img/menu/button-start.png');
		this.load.image('screen-bg', 'img/menu/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/menu/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'img/menu/screen-howtoplay.png');

		this.load.spritesheet('button-audio', 'img/menu/button-audio.png', 35, 35);

		this.load.audio('bounce', ['audio/phaserUp3.ogg']);*/

		//in game
		this.load.image('pixel', 'img/game/pixel_t.png');
		this.load.image('base', 'img/game/baset.png');
		this.load.image('manch', 'img/game/mancht.png');
		this.load.image('ship', 'img/game/shipn.png');
		this.load.image('button', 'img/game/buttont.png');
		this.load.image('button_b', 'img/game/buttont.png');
		this.load.image('b_button', 'img/game/b_buttont.png');
		this.load.image('b_button_b', 'img/game/b_button_b_t.png');
		this.load.image('bullet1', 'img/game/bullet1t.png');
		this.load.image('bullet2', 'img/game/bullet2t.png');
		this.load.image('bullet3', 'img/game/bullet3t.png');
		this.load.image('bomb', 'img/game/bomb0t.png');
		this.load.image('shield', 'img/game/shieldt.png');
		this.load.image('p_b', 'img/game/p_b.png');
		this.load.image('p_s', 'img/game/p_s.png');
		this.load.image('p_d', 'img/game/p_d.png');
		this.load.image('p_t', 'img/game/p_t.png')
		//this.load.image('enemy1', 'img/enemyt.png');
		//this.load.image('enemy2', 'img/enemy2t.png');
		this.load.spritesheet('enemies', 'img/game/enemiest.png', 75, 75);

		this.load.spritesheet('a_1', 'img/game/asteroidst.png', 75, 75);

	},

	create: function() {
		this.game.state.start('Splash');
	}
};