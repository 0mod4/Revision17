function TreeScene ()
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
		  position: [-1,-1,0, 1,-1,0, -1,1,0, -1,1,0, 1,-1,0, 1,1,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
		};
		this.treeDrawable = new Drawable(arrays, "default.vert", "tree.frag", uniforms);

		var n = 1000;
		this.startpositions = [0.2,-0.5,0, -0.25,0,0, 0.2,0,0, -0.2,0.1,0, 0.15,0.1,0, -0.15,0.3,0, -0.08,0.4,0, 0.1,0.3,0, 0,0.5,0, 0.2,-0.2,0, -0.28,-0.2,0];//-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0, 0.5,0.5,0];

		var spritePath = "../../resources/textures/flower.png";
		var startsize = 3;
		var lifetime = 8000;
		var applyGravity = true;
		var maxSpeed = 0.001;

		this.getStartVec = function(pos){
			return [2*Math.random(), Math.random()-1, 2*Math.random()-1];
		};
		this.particles = new Particles(n, this.startpositions, "particlesDefault.vert", "particlesDefault.frag", uniforms, spritePath, startsize, lifetime, this.getStartVec, applyGravity, maxSpeed, false, true);

		this.addDrawable(this.particles);
		this.addDrawable(this.treeDrawable);
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