function TestScene ()
{
	Scene.call(this); 

	this.init = function (duration, time)
	{
		this.camera.position = [0, 0, -1];
		this.camera.target = [0, 0, 0];
		this.duration = duration;

		var arrays = {
		  position: [-1,-1,0, 1,-1,0, -1,1,0, -1,1,0, 1,-1,0, 1,1,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
			music: audioPlayer.getFFTtexture()
		};

		this.testDrawable = new Drawable(arrays, "default.vert", "test.frag", uniforms);
		this.addDrawable(this.testDrawable);
	};

	this.update = function ()
	{
		this.draw();
	};
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;