function NeonScene ()
{
	Scene.call(this); 

	this.init = function (duration, time)
	{
		this.duration = duration;

		var arrays = {
		  position: [-1,-1,0, 1,-1,0, -1,1,0, -1,1,0, 1,-1,0, 1,1,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
			music: audioPlayer.getFFTtexture()
		};

		this.testDrawable = new Drawable(arrays, "default.vert", "neon.frag", uniforms);
		this.addDrawable(this.testDrawable);
	};

	this.update = function ()
	{
		this.draw();
	};
}

NeonScene.prototype = Object.create(Scene.prototype);
NeonScene.prototype.constructor = NeonScene;