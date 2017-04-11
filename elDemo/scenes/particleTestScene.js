function ParticleTestScene ()
{
	Scene.call(this); 

	this.init = function (duration, time)
	{
		this.camera.position = [0, 2, -5];
		this.camera.target = [0, 2, 0];
		this.duration = duration;

		this.alpha = true;

		var arrays = {
		  position: [-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0, -0.5,0.5,0, 0.5,-0.5,0, 0.5,0.5,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
		};
		this.particles = new Particles(arrays, "default.vert", "red.frag", uniforms);

		this.addDrawable(this.particles);
	};

	this.update = function ()
	{
		// camera
		this.camera.orbitControl();
		this.camera.position[1] = 1;

		this.draw();
	};
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;