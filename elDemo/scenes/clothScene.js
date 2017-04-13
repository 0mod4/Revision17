function ClothScene ()
{
	Scene.call(this); 
	this.startpositions = null;

	this.init = function (duration, time)
	{
		this.camera.position = [0, 2, -5];
		this.camera.target = [0, 2, 0];
		this.duration = duration;

		this.alpha = true;

		var arrays = {
		  position: [-0.8,-0.2,0, -0.5,-0.2,0, -0.8,0.2,0, -0.8,0.2,0, -0.5,-0.2,0, -0.5,0.2,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
		};
		this.clothDrawable = new Drawable(arrays, "default.vert", "cloth.frag", uniforms, "../../resources/textures/testTex.png");

		var n = 3000;
		this.startpositions = [-0.7,0,0, -0.7,-0.05,0, -0.7,-0.1,0];//-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0, 0.5,0.5,0];

		var startcol = [0.98, 0.84, 0.69, 1.0];
		var endcol = [0.98, 0.84, 0.69, 0.0];
		var lifetime = 6000;
		uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
			startcol: startcol,
			endcol: endcol,
			lifespan: lifetime,
			changecol: true,
		};
		var spritePath = "../../resources/textures/tdot2.png";
		var startsize = 3;
		var applyGravity = false;
		var maxSpeed = 0.001;

		this.getStartVec = function(pos){
			return [2*Math.random(), Math.random()-1, 2*Math.random()-1];
		};
		this.particles = new Particles(n, this.startpositions, "particlesDefault.vert", "particlesDefault.frag", uniforms, spritePath, startsize, lifetime, this.getStartVec, applyGravity, maxSpeed, false, true, startcol, endcol);

		this.addDrawable(this.particles);
		this.addDrawable(this.clothDrawable);
	};

	this.update = function ()
	{
		if (audioPlayer.dataArray[1] > -33.0) {
			this.particles.spawnParticles(10, this.startpositions);//this.getStartVec([1,1,1]));
			this.particles.createBufferArrayFromParticles(this.particles.particles);
		}

		// camera
		this.camera.orbitControl();
		this.camera.position[1] = 1;

		this.draw();
	};
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;