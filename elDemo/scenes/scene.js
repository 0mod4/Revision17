function Scene ()
{
	this.start = 0;
	this.time = 0;
	this.duration = 0; //in ms

	this.camera = new Camera();
	this.drawables = [];

	this.alpha = false;

	this.init = function ()
	{
	};

	this.update = function ()
	{
		this.draw();
	};

	this.draw = function ()
	{
		gl.enable(gl.DEPTH_TEST);

		if (this.alpha) {
			gl.enable(gl.BLEND);
			//gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);	

			//gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			gl.blendEquation(gl.FUNC_ADD);
			gl.disable(gl.DEPTH_TEST);
		}

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		this.time = (Date.now() - this.start) / 1000;
		this.camera.update();

		for (var i = 0; i < this.drawables.length; ++i) {
			this.drawables[i].draw(this.camera, this.time, audioPlayer.getFFTtexture());
		}

	};

	this.addDrawable = function (drawable)
	{
		this.drawables.push(drawable);
	};

	this.isOver = function ()
	{
		if (Date.now()-this.start > this.duration)
		{
			return true;
		}
		else
			return false;
	};

	this.run = function ()
	{
		this.start = Date.now();
	};
}