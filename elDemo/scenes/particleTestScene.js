function ParticleTestScene ()
{
	Scene.call(this); 

	this.getStartVec = function(startpos){
		if (startpos[0] == -0.5)
			return [1.0,0.0,0.0];
		else
			return [2.0*Math.random()-1.0, 2.0*Math.random()-1.0, 2.0*Math.random()-1.0];
	};

	this.init = function (duration, time)
	{
		this.camera.position = [0, 2, -5];
		this.camera.target = [0, 2, 0];
		this.duration = duration;

		this.alpha = true;

		var n = 1000;
		var startpositions = [-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0, 0.5,0.5,0];

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
		};
		var spritePath = "../../resources/textures/testSprite.png";
		var startsize = 50;
		var lifetime = 1000;
		var applyGravity = true;
		var maxSpeed = 0.01;
		this.particles = new Particles(n, startpositions, "particlesDefault.vert", "particlesDefault.frag", uniforms, spritePath, startsize, lifetime, this.getStartVec, applyGravity, maxSpeed);

		this.addDrawable(this.particles);
	};

	this.update = function ()
	{
		if (audioPlayer.dataArray[1] > -33.) {
			this.particles.spawnParticles(10, this.getStartVec([1,1,1]));
			this.particles.createBufferArrayFromParticles(this.particles.particles);
		}
		this.draw();
	};
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;