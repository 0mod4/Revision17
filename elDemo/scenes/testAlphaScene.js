function TestAlphaScene ()
{
	Scene.call(this); 

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
		this.testDrawable = new Drawable(arrays, "test.vert", "test.frag", uniforms);

		arrays = {
		  position: [-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0],
		};
		uniforms = {};
		this.testAlphaDrawable = new Drawable(arrays, "test.vert", "red.frag", uniforms);
		
		this.addDrawable(this.testAlphaDrawable);
		this.addDrawable(this.testDrawable);
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