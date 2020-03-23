Campus.Game = function(game) {
	emitter = null; 
	base = null;
	manch = null; 
	ship = null;
	shield = null;shield_b = false;
	button = null;button_b = null; 
	bullet = null;bullets = null;bullettime = 0;
	bullet2 = null;bullets2 = null;bullettime2 = 0; 
	bullet3 = null;bullets3 = null;bullettime3 = 0; 
	b_button_b = null;b_button = null;
	bomb = null;bombs = null;n_bombs = 0;bombtime = 0;tbomb = null;
	p_bomb = null;pb_count = 0;pb_create = 450 + (Math.random()*40) *  game.rnd.integerInRange(300, 400);pb_speed = 120;
	p_shield = null; ps_count = 0; ps_create = 400 + (Math.random()*35) *  game.rnd.integerInRange(100, 200); ps_speed = 120;
	p_double = null; pd_count = 0; pd_create = 250 + (Math.random()*20) *  game.rnd.integerInRange(150, 250); pd_speed = 120;
	p_triple = null; pt_count = 0; pt_create = 350 + (Math.random()*30) *  game.rnd.integerInRange(250, 350); pt_speed = 120;
	hurt = 20; energy = 20; energytext = null; n_energytext = null; 
	score = 0; scoretext = null; n_scoretext = null;
	b_single = true;
	n_shield = 0; b_shield = false;  n_shieldtext = null;
	n_double = 0; b_double = false;  n_doubletext = null;
	n_triple = 0; b_triple = false;  n_tripletext = null;
	cursors = null; fireButton = null; bombButton = null;
	asteroid1 = null; a1_count = 0; a1_create = 50 + (Math.random()*5) * game.rnd.integerInRange(25, 50); a1_speed = 150; a1_hurt = 3; starfield = null;
	enemy = null; enemy2 = null;
	num_timer_enemy = 0; num_math_enemy = 0; enemy_b = false;
};

Campus.Game.prototype = {
	create: function() {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//background
		this.game.stage.backgroundColor = '#06121E';
		
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
		

		//space dust - particle
		emitter = this.game.add.emitter(this.game.world.width, this.game.world.centerY, 3000);
		emitter.height = this.game.world.height;
		emitter.minParticleScale = 0.01;
		emitter.maxParticleScale = 0.5;
		emitter.makeParticles('pixel');
		emitter.setXSpeed(-100, -1000);
		emitter.setYSpeed(0, 0);
		emitter.start(false, 1500, 1, 0);
	//background	
	
	//controles	
		//base manch
		base = this.game.add.sprite(80, this.game.world.height - 80, 'base');
		base.anchor.setTo(0.5,0.5);
		base.scale.x = 1.25;
		base.scale.y = 1.25;
		
		//manch
		manch = this.game.add.sprite(base.x, base.y, 'manch');
		manch.anchor.setTo(0.5,0.5);
		manch.scale.x = 1.25;
		manch.scale.y = 1.25;
		manch.inputEnabled = true;
		manch.input.enableDrag();
		manch.input.enableSnap(base.x, base.y, false, true);
		manch.events.onDragStop.add(this.fixLocation);

		//button_b fire desactive
		button_b = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 80, 'button');
		button_b.anchor.set(0.5);
		button_b.inputEnabled = true;
		button_b.events.onInputDown.add(this.active_button, this);
		button_b.events.onInputUp.add(this.desactive_button, this);

		
		//button fire active
		button = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 80, 'button');
		button.anchor.set(0.5);
		button.inputEnabled = true;
		button.exists = false;
		button.events.onInputDown.add(this.firebullet, this);

		
		//bomb_button desactive
		b_button_b = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 80, 'b_button_b');
		b_button_b.anchor.set(0.5);
		b_button_b.inputEnabled = true;
		b_button_b.exists = true;
	
		//bomb_button ative
		b_button = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 80, 'b_button');
		b_button.anchor.set(0.5);
		b_button.inputEnabled = true;
		b_button.exists = false;
		b_button.events.onInputDown.add(this.active_b_button, this);

		//keys
		cursors = this.game.input.keyboard.createCursorKeys();
		bombButton = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
		fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
	//controles

	//hud
		//energie
		energytext = this.game.add.text(40, 20, num_timer_enemy + ' energy', {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});
		n_energytext = this.game.add.text(25, 40, '' + ((hurt/energy)*100) + '%', {font: "50px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});

		//score
			scoretext = this.game.add.text(this.game.world.width/2 - 25, 20, 'score', {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});
			n_scoretext = this.game.add.text(this.game.world.width/2 - 10, 40, '' + score, {font: "50px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});

		//tbomb
		tbomb = this.game.add.text(this.game.world.width - 180, 16, 'bomb: ' + n_bombs, {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});

		//shield
		n_shieldtext = this.game.add.text(this.game.world.width - 180, 42, 'shield: 0%', {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});
		
		//double
		n_doubletext = this.game.add.text(this.game.world.width - 180, 68, 'double: 0%', {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});//double
		
		//triple
		n_tripletext = this.game.add.text(this.game.world.width - 180, 94, 'triple: 0%', {font: "20px  spacefont", fill: '#00c6ff', align: "center", stroke: "#000508", strokeThickness: 1});

	//hud

	//game
		//ship bullet1 group
	    bullets = this.game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(100, 'bullet1');
		bullets.setAll('anchor.x', 0);
	    bullets.setAll('anchor.y', 0.5);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

	    //ship bullet2 group
	    bullets2 = this.game.add.group();
	    bullets2.enableBody = true;
	    bullets2.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets2.createMultiple(100, 'bullet2');
		bullets2.setAll('anchor.x', 0);
	    bullets2.setAll('anchor.y', 0.5);
	    bullets2.setAll('outOfBoundsKill', true);
	    bullets2.setAll('checkWorldBounds', true);
		
		//ship bullet3 group
	    bullets3 = this.game.add.group();
	    bullets3.enableBody = true;
	    bullets3.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets3.createMultiple(100, 'bullet3');
		bullets3.setAll('anchor.x', 0);
	    bullets3.setAll('anchor.y', 0.5);
	    bullets3.setAll('outOfBoundsKill', true);
	    bullets3.setAll('checkWorldBounds', true);



	    //ship bomb group
	    bombs = this.game.add.group();
	    bombs.enableBody = true;
	    bombs.physicsBodyType = Phaser.Physics.ARCADE;
	    bombs.createMultiple(1, 'bomb');
		bombs.setAll('anchor.x', 0);
	    bombs.setAll('anchor.y', 0.5);
	    bombs.setAll('outOfBoundsKill', true);
	    bombs.setAll('checkWorldBounds', true);
	

		//ship
		ship = this.game.add.sprite(this.game.world.centerY + 75, this.game.world.centerY, 'ship');
		ship.enableBody = true;
		ship.anchor.setTo(0.5,0.5);
		this.game.physics.enable(ship, Phaser.Physics.ARCADE);
		ship.body.collideWorldBounds = true;
		ship.scale.x = 0.8;
		ship.scale.y = 0.8;
		shield_b = false;
	
		//shield
		shield = this.game.add.sprite(ship.body.x, ship.body.y, 'shield');
		shield.enableBody = true;
		shield.anchor.setTo(0.5,0.5);
		shield.scale.x = 1.3;
		shield.scale.y = 1.3;
		shield.exists = false;
		this.game.physics.enable(shield, Phaser.Physics.ARCADE);

		//pacote shield
		//p_shield = game.add.sprite(game.world.width - 100, game.world.centerY - 100, 'p_s');
		//p_shield.enableBody = true;
		//this.game.physics.enable(p_shield, Phaser.Physics.ARCADE);
		p_shield = this.game.add.group();
		p_shield.enableBody = true;
   		p_shield.physicsBodyType = Phaser.Physics.ARCADE;
		
		
		//pacote bomba
		//p_bomb = this.game.add.sprite(this.game.world.width - 100, this.game.world.centerY, 'p_b');
		//p_bomb.enableBody = true;
		//this.game.physics.enable(p_bomb, Phaser.Physics.ARCADE);
		p_bomb = this.game.add.group();
		p_bomb.enableBody = true;
   		p_bomb.physicsBodyType = Phaser.Physics.ARCADE;

		
		//pacote double bullet
		//p_double = this.game.add.sprite(this.game.world.width - 100, this.game.world.centerY + 100, 'p_d');
		//p_double.enableBody = true;
		//this.game.physics.enable(p_double, Phaser.Physics.ARCADE);
		p_double = this.game.add.group();
		p_double.enableBody = true;
   		p_double.physicsBodyType = Phaser.Physics.ARCADE;		
		

		//pacote triple bullet
		//p_triple = this.game.add.sprite(this.game.world.width - 200, this.game.world.centerY, 'p_t');
		//p_triple.enableBody = true;
		//this.game.physics.enable(p_triple, Phaser.Physics.ARCADE);
		p_triple = this.game.add.group();
		p_triple.enableBody = true;
   		p_triple.physicsBodyType = Phaser.Physics.ARCADE;



   		//asteroid1
		//asteroid1 = this.game.add.sprite(this.game.world.width - 400, this.game.world.centerY, 'a_1');
		//asteroid1.enableBody = true;
		//this.game.physics.enable(asteroid1, Phaser.Physics.ARCADE);
		asteroid1 = this.game.add.group();
		asteroid1.enableBody = true;
   		asteroid1.physicsBodyType = Phaser.Physics.ARCADE;


   		//starfield collide
   		starfield = this.game.add.emitter(0, 0, 100);
    	starfield.makeParticles('pixel');
    	starfield.gravity = 200;
    	/*starfield = this.game.add.group();
    	starfield.createMultiple(30, 'star');
    	starfield.forEach(setupAsteroids, this);*/
		


		/*//enemy
		enemy = this.game.add.sprite(this.game.world.width - 400, this.game.world.centerY, 'enemy1');
		enemy.enableBody = true;
		enemy.scale.x = 1.3;
		enemy.scale.y = 1.3;
		this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
		
		//enemy2
		enemy2 = this.game.add.sprite(this.game.world.width - 400, this.game.world.centerY - 200, 'enemy2');
		enemy2.enableBody = true;
		enemy2.scale.x = 1.3;
		enemy2.scale.y = 1.3;
		this.game.physics.enable(enemy2, Phaser.Physics.ARCADE);*/

		enemy = this.game.add.group();
		enemy.enableBody = true;
   		enemy.physicsBodyType = Phaser.Physics.ARCADE;
   		enemy.setAll('body.collideWorldBounds', true);
		enemy.setAll('body.bounce.x', 1);
		enemy.setAll('body.bounce.y', 1);
		enemy.setAll('body.minBounceVelocity', 0);
		enemy_b  = false;


		
	//game

	//info timers
		//counter shield
		this.game.time.events.loop(Phaser.Timer.SECOND, this.counter_shield, this);
		//counter bullets
		this.game.time.events.loop(Phaser.Timer.SECOND, this.counter_bullets, this);
		
	},

	//counter shield
	counter_shield: function(){	
		if(b_shield == true){
			n_shield -= 1;
			shield_b = true; // desliga o hurt enemy
			shield.exists = true;
			if(n_shield <= 0){
				n_shield = 0;
				b_shield = false;
				shield_b = false;
				n_shieldtext.text = "shield: 0%";
			} else {
				n_shieldtext.text = "shield: " + (n_shield*2) + "%";
			}
		} else {
			shield.exists = false;
		}
	},

	//counter_bullets
	counter_bullets: function(){	
		if(b_double == true && b_triple == false && b_single == false){
			n_double -= 2;
			n_triple = 0;
			if(n_double <= 0){
				n_double = 0;
				b_double = false;
				b_single = true;
				n_doubletext.text = "double: 0%";
			} else {
				n_doubletext.text = "double: " + (n_double*2) + "%";
			}
			n_tripletext.text = "triple: " + n_triple*2 + "%";
		}

		if(b_triple == true && b_double == false && b_single == false){
			n_triple -= 3;
			n_double = 0;
			if(n_triple <= 0){
				n_triple = 0;
				b_triple = false;
				b_single = true;
				n_tripletext.text = "triple: 0%";
			} else {
				n_tripletext.text = "triple: " + ((n_triple*2)+2) + "%";
			}
			n_doubletext.text = "double: " + n_double*2 + "%";
		}
	},

	update: function(){	
		//num_timer_enemy //timer para criação e qual o array
		num_timer_enemy += 1;
		energytext.text = num_timer_enemy + " - " + num_math_enemy;
		if(num_timer_enemy >= 300/* * Math.random()*1000*/ && enemy_b == false){
			num_timer_enemy = 0;
			enemy_b = true
			this.createEnemies();
		}


	//input controls
	    if(button.exists == true)
	    {
	    	this.firebullet();
	    }
	//input controls

	//key controls	
		if (fireButton.isDown)
	    {
	        this.firebullet();
	    }
	    if (bombButton.isDown)
	    {
	        this.active_b_button();
	    }
	    ship.body.velocity.setTo(0, 0);

	    if (cursors.left.isDown)
	    {
	        ship.body.velocity.x = -500;
	    }
	    if (cursors.right.isDown)
	    {
	        ship.body.velocity.x = 500;
	    }
	    if (cursors.up.isDown)
	    {
	        ship.body.velocity.y = -500;
	    }
	    if (cursors.down.isDown)
	    {
	        ship.body.velocity.y = 500;
	    }
	//key controls	  
    
	//ship moving 
		if(manch.x > base.x - 10 && manch.x < base.x + 10 && manch.y > base.y - 10 && manch.y < base.y + 10){
			//ship.angle = 0;
			ship.body.velocity.x += 0;
			ship.body.velocity.y += 0;
		}
		if(manch.x > base.x + 10 && manch.y > base.y - 10 && manch.y < base.y + 10){
			//ship.angle = 0;
			ship.body.velocity.x += 500;
		}
		if(manch.x < base.x - 10 && manch.y > base.y - 10 && manch.y < base.y + 10){
			//ship.angle = 180;
			ship.body.velocity.x -= 500;
		}
		if(manch.y < base.y - 10 && manch.x > base.x - 10 && manch.x < base.x + 10){
			//ship.angle = 270;
			ship.body.velocity.y -= 500;
		}
		if(manch.y > base.y + 10 && manch.x > base.x - 10 && manch.x < base.x + 10){
			//ship.angle = 90;
			ship.body.velocity.y += 500;
		}
		if(manch.y < base.y - 10 && manch.x > base.x + 10){
			//ship.angle = 315;
			ship.body.velocity.y -= 250;
			ship.body.velocity.x += 250;
		}
		if(manch.y > base.y + 10 && manch.x > base.x + 10){
			//ship.angle = 45;
			ship.body.velocity.y += 250;
			ship.body.velocity.x += 250;
		}
		if(manch.y < base.y - 10 && manch.x < base.x - 10){
			//ship.angle = 225;
			ship.body.velocity.y -= 250;
			ship.body.velocity.x -= 250;
		}
		if(manch.y > base.y + 10 && manch.x < base.x - 10){
			//ship.angle = 135;
			ship.body.velocity.y += 250;
			ship.body.velocity.x -= 250;
		}
	//ship moving	
		
	//manch stop draggable
		if(manch.x > base.x + 50){
			manch.x = base.x + 50;
		}
		if(manch.x < base.x - 50){
			manch.x = base.x - 50;
		}
		if(manch.y > base.y + 50){
			manch.y = base.y + 50;
		}
		if(manch.y < base.y - 50){
			manch.y = base.y - 50;
		}
	//manch stop draggable


	//draw p_bomb
	pb_count += 1;
	if(pb_count > pb_create){
		this.create_p_bomb();
		pb_count = 0;
	}
	//draw p_bomb

	//draw p_shield
	ps_count += 1;
	if(ps_count > ps_create){
		this.create_p_shield();
		ps_count = 0;
	}
	//draw p_shield

	//draw p_double
		pd_count += 1;
		if(pd_count > pd_create){
			this.create_p_double();
			pd_count = 0;
		}
	//draw p_double

	//draw p_triple
		pt_count += 1;
		if(pt_count > pt_create){
			this.create_p_triple();
			pt_count = 0;
		}
	//draw p_triple


	//asteroid1
		a1_count += 1;
		if(a1_count > a1_create){
			this.create_p_asteroid1();
			a1_count = 0;
		}
	//asteroid1



	//collisions
		//ship x pack bomb
		this.game.physics.arcade.collide(ship, p_bomb, this.getbomb, null, this);
		//ship x pack shield
		this.game.physics.arcade.collide(ship, p_shield, this.getshield, null, this);
		//ship x pack double
		this.game.physics.arcade.collide(ship, p_double, this.getdouble, null, this);
		//ship x pack triple
		this.game.physics.arcade.collide(ship, p_triple, this.gettriple, null, this);
		//ship x asteroid 1
		this.game.physics.arcade.collide(ship, asteroid1, this.crash_asteroids, null, this);

		//bullet 1 x asteroids
		this.game.physics.arcade.overlap(bullets, asteroid1, this.bullet1asteroids, null, this);
		//bullet 2 x asteroids
		this.game.physics.arcade.overlap(bullets2, asteroid1, this.bullet2asteroids, null, this);
		//bullet 3 x asteroids
		this.game.physics.arcade.overlap(bullets3, asteroid1, this.bullet3asteroids, null, this);
		//bomb x asteroids
		this.game.physics.arcade.overlap(bombs, asteroid1, this.bombsasteroids, null, this);


		//enemy vs enemy
		this.game.physics.arcade.collide(enemy);


	//info shield
		if(shield.body.x != ship.body.x - 15 || shield.body.y != ship.body.y - 15){
	    	shield.body.x = ship.body.x - 15;
	    	shield.body.y = ship.body.y - 15;
	    }
	    //info counters
	    if(n_shield > 100){
	    	n_shield = 100;
	    }
	    if(n_double > 100){
	    	n_double = 100;
	    }
	    if(n_triple > 100){
	    	n_triple = 100;
	    }
	    if(hurt > 20){
	    	hurt = 20;
	    }
	    if(hurt < 0){
	    	hurt = 0;
	    }
	},

	createEnemies: function(){
			num_math_enemy = this.game.rnd.integerInRange(1, 5);
			energytext.text = num_timer_enemy + " - " + num_math_enemy;
		for (var i =  0; i < num_math_enemy; i++){
			
			var _enemies = this.game.add.sprite(this.game.world.width + 100 * i, this.game.rnd.integerInRange(50, this.game.world.height - 50), 'enemies', this.game.rnd.integerInRange(0, 1));
		   	
		   	this.game.physics.enable(_enemies, Phaser.Physics.ARCADE);
		   	
		   	_enemies.body.velocity.x = -100;
		   	

		   	enemy.forEach(this.limits_enemy.bind(_enemies));
		   	enemy.add(_enemies);


		}
	},

	limits_enemy: function(enemy){
		if(enemy.x < 0){
			//enemy.kill();
			enemy.x = 500;
		}
	},

	create_p_bomb: function(){	
		var pb_ = this.game.add.sprite(this.game.world.width + 100, /* this.game.world.randomY*/ this.game.rnd.integerInRange(50, this.game.world.height - 50), 'p_b');
	   	this.game.physics.enable(pb_, Phaser.Physics.ARCADE);
	   	pb_.body.velocity.x = -pb_speed*2;
	   	p_bomb.forEach(this.limits_pb.bind(pb_));
	   	p_bomb.add(pb_);
	},

	limits_pb: function(p_bomb){
		if(/*p_bomb.y < 50 || p_bomb.y > this.game.world.height - 50 || */p_bomb.x < -100){
			p_bomb.kill();
		}
	},

 	create_p_shield: function(){	
		var ps_ = this.game.add.sprite(this.game.world.width + 100,  /*this.game.world.randomY*/ this.game.rnd.integerInRange(50, this.game.world.height - 50), 'p_s');
	   	this.game.physics.enable(ps_, Phaser.Physics.ARCADE);
	   	ps_.body.velocity.x = -ps_speed*2;
	   	p_shield.forEach(this.limits_ps.bind(ps_));
	   	p_shield.add(ps_);
	},

 	limits_ps: function(p_shield){
		if(/*p_shield.y < 50 || p_shield.y > this.game.world.height - 50 || */p_shield.x < -100){
			p_shield.kill();
		}
	},

	create_p_double: function(){	
		var pd_ = this.game.add.sprite(this.game.world.width + 100,  /*this.game.world.randomY*/ this.game.rnd.integerInRange(50, this.game.world.height - 50), 'p_d');
	   	this.game.physics.enable(pd_, Phaser.Physics.ARCADE);
	   	pd_.body.velocity.x = -pd_speed*2;
	   	p_double.forEach(this.limits_pd.bind(pd_));
	   	p_double.add(pd_);
	},

	limits_pd: function(p_double){
		if(p_double.x < -100){
			p_double.kill();
		}
	},

	create_p_triple: function(){	
		var pt_ = this.game.add.sprite(this.game.world.width + 100,  /*this.game.world.randomY*/ this.game.rnd.integerInRange(50, this.game.world.height - 50), 'p_t');
	   	this.game.physics.enable(pt_, Phaser.Physics.ARCADE);
	   	pt_.body.velocity.x = -pt_speed*2;
	   	p_triple.forEach(this.limits_pt.bind(pt_));
	   	p_triple.add(pt_);
	},


	limits_pt: function(p_triple){
		if(p_triple.x < -100){
			p_triple.kill();
		}
	},


	create_p_asteroid1: function(){	
		var a1_ = this.game.add.sprite(this.game.world.width + 100,  /*this.game.world.randomY*/ this.game.rnd.integerInRange(50, this.game.world.height - 50) , 'a_1', this.game.rnd.integerInRange(0, 4));
		a1_.tint = Math.random() * 0xffffff;
		a1_.scale.x = 0.8;
		a1_.scale.y = 0.8;
		a1_hurt = 3;
	   	this.game.physics.enable(a1_, Phaser.Physics.ARCADE);
	   	a1_.body.velocity.x = -a1_speed*2;
	   	asteroid1.forEach(this.limits_a1.bind(a1_));
	   	asteroid1.add(a1_);
	},

	limits_a1: function(asteroid1){
		if(asteroid1.x < -100){
			asteroid1.kill();
		}
	},


	//ship x pack bomb
	getbomb: function(_ship, _p_bomb) {
    	_p_bomb.kill();
    	n_bombs += 1;
    	tbomb.text = "bomb: " + n_bombs;
    	b_button.exists = true;
	},

	//press bomb_button
	active_b_button: function(){
		if(n_bombs != 0){
			this.bombbullet();
			b_button.exists = true;
		}
		if(n_bombs == 0){
			b_button.exists = false;
		}
	},

	//press button
	active_button: function(){
		button.exists = true;
	},

	//release button
	desactive_button: function(){
		button.exists = false;
	},


	//fire!
	firebullet: function(){

		if (this.game.time.now >= bullettime && b_single == true){
        	//  Grab the first bullet we can from the pool
        	bullet = bullets.getFirstExists(false);
        	if (bullet){
        	   //  And fire it
	   			bullet.reset(ship.x, ship.y);
				bullet.scale.x = 4;
       			bullet.angle = ship.angle;
       			this.game.physics.arcade.velocityFromRotation(ship.rotation, 400, bullet.body.velocity);
	   			bullettime = this.game.time.now + 200;
 	   		}
	   	}
	   	if (this.game.time.now >= bullettime2 && b_double == true){
        	//  Grab the first bullet we can from the pool
        	bullet2 = bullets2.getFirstExists(false);
        	if (bullet2){
        	   //  And fire it
	   			bullet2.reset(ship.x, ship.y);
				bullet2.scale.x = 4;
       			bullet2.angle = ship.angle;
       			this.game.physics.arcade.velocityFromRotation(ship.rotation, 400, bullet2.body.velocity);
	   			bullettime2 = this.game.time.now + 200;
 	   		}
	   	}
	   	if (this.game.time.now >= bullettime3 && b_triple == true){
        	//  Grab the first bullet we can from the pool
        	bullet3 = bullets3.getFirstExists(false);
        	if (bullet3){
        	   //  And fire it
	   			bullet3.reset(ship.x, ship.y);
				bullet3.scale.x = 4;
       			bullet3.angle = ship.angle;
       			this.game.physics.arcade.velocityFromRotation(ship.rotation, 400, bullet3.body.velocity);
	   			bullettime3 = this.game.time.now + 200;
 	   		}
	   	}
	},

	//bomb!
	bombbullet: function(){
		if (this.game.time.now >= bombtime){
        	//  Grab the first bomb we can from the pool
        	if(n_bombs > 0){	
				bomb = bombs.getFirstExists(false);
				n_bombs -= 1;
			}
			else{	
				n_bombs = 0;
			}
			tbomb.text = "bomb: " + n_bombs;
        	if (bomb){
        	   //  And fire it
	   			bomb.reset(ship.x, ship.y);
	   			bomb.scale.y = 15;
       			bomb.angle = ship.angle;
       			this.game.physics.arcade.velocityFromRotation(ship.rotation, 400, bomb.body.velocity);
	   			bombtime = this.game.time.now + 2000;
 	   		}
	   	}
	},

	//ship x pack double
	getdouble: function(_ship, _p_double) {
    	_p_double.kill();
    	n_double = 50;
    	n_doubletext.text = "double: " + n_double*2 + "%";
    	b_single = false;
    	b_double = true;
    	b_triple = false;
	},

	//ship x pack triple
	gettriple: function(_ship, _p_triple) {
    	_p_triple.kill();
    	n_triple = 50;
    	n_tripletext.text = "triple: " + n_triple*2 + "%";
    	b_single = false;
    	b_triple = true;
    	b_double = false;
	},

	//ship x pack shield
	getshield: function(_ship, _p_shield) {
    	_p_shield.kill();
    	n_shield = 50;
    	n_shieldtext.text = "shield: " + n_shield*2 + "%";
    	b_shield = true; // ativa a animação e o timer
	},

	/*setupInvader: function(a_1) {

    	a_1.anchor.x = 0.5;
    	a_1.anchor.y = 0.5;
    	a_1.animations.add('star');

	},*/

	//ship x asteroid1
	crash_asteroids: function(_ship, _asteroid_1) {
    	_asteroid_1.kill();

    	starfield.x = _asteroid_1.x;
    	starfield.y = _asteroid_1.y;
    	starfield.start(true, 2000, null, 25);
/*  	
		var _starfield = starfield.getFirstExists(false);
    	if(_starfield.tint != _asteroid_1.tint){
    		_starfield.tint = _asteroid_1.tint;
    	}
    	_starfield.reset(_asteroid_1.body.x, _asteroid_1.body.y);
    	_starfield.play('star', 30, false, true);
*/

    	if(shield_b == true){
    		hurt -= 0;
    	} else {
    		hurt -= 1;
    	}

		if(hurt > 0){
			n_energytext.text = "" + Math.round(((hurt/energy)*100)) + "%";
		} else {
			hurt = 0;
			n_energytext.text = "GAME OVER";
		}

		score += 7;
		n_scoretext.text = "" + score;
	},

	//bullet1 x asteroids
	bullet1asteroids: function(_bullet1, _asteroid_1){
		_bullet1.kill();

		starfield.x = _asteroid_1.x;
    	starfield.y = _asteroid_1.y;
    	

		a1_hurt -= 1;
		score += 5;
		n_scoretext.text = "" + score;
		scoretext.text = "" + a1_hurt;
		if(a1_hurt < 1){
			_asteroid_1.kill();
			score += 20;
			n_scoretext.text = "" + score;
			starfield.start(true, 2000, null, 30);
		} else {
			starfield.start(true, 2000, null, 5);
		}
	},

	//bullet2 x asteroids
	bullet2asteroids: function(_bullet2, _asteroid_1){
		_bullet2.kill();

		starfield.x = _asteroid_1.x;
    	starfield.y = _asteroid_1.y;

		a1_hurt -= 2;
		score += 10;
		n_scoretext.text = "" + score;
		scoretext.text = "" + a1_hurt;
		if(a1_hurt < 1){
			_asteroid_1.kill();
			score += 40;
			n_scoretext.text = "" + score;
			starfield.start(true, 2000, null, 30);
		} else {
			starfield.start(true, 2000, null, 10);
		}
	},

	//bullet3 x asteroids
	bullet3asteroids: function(_bullet3, _asteroid_1){
		_bullet3.kill();

		starfield.x = _asteroid_1.x;
    	starfield.y = _asteroid_1.y;

		a1_hurt -= 3;
		score += 20;
		n_scoretext.text = "" + score;
		scoretext.text = "" + a1_hurt;
		if(a1_hurt <= 0){
			_asteroid_1.kill();
			score += 40;
			n_scoretext.text = "" + score;
			starfield.start(true, 2000, null, 30);
		} 
	},

	//bombs x asteroids
	bombsasteroids: function(_bombs, _asteroid_1){
		a1_hurt -= 3;

		starfield.x = _asteroid_1.x;
    	starfield.y = _asteroid_1.y;

		score += 20;
		n_scoretext.text = "" + score;
		scoretext.text = "" + a1_hurt;
		if(a1_hurt <= 0){
			_asteroid_1.kill();
			score += 40;
			n_scoretext.text = "" + score;
			starfield.start(true, 2000, null, 30);
		}
	},

	//release manch - return to 0 point
	 fixLocation: function(manch) {
	    if (manch.x < base.x - 50) {
	        manch.x = base.x;
			manch.y = base.y;
	    }
	    else if (manch.x > base.x + 50) {
	        manch.x = base.x;
			manch.y = base.y;
	    }
	    else if (manch.y > base.y + 50) {
	        manch.x = base.x;
			manch.y = base.y;
	    }
		else if (manch.y < base.y - 50) {
	        manch.x = base.x;
			manch.y = base.y;
	    }
	},

	render: function() {
		//this.game.debug.body(ship);
    	//this.game.debug.body(p_bomb);
	}
};