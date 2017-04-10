function Shader (vertName, fragName, uniforms)
{
	var state = 0;
	this.create_program = function (err, shaderFiles, target) {
		if (target !== 0)
		{
			target.program = twgl.createProgramFromSources(gl, [shaderFiles[vertName], shaderFiles[fragName]]);
			target.info = twgl.createProgramInfoFromProgram(gl, target.program);
			target.state = 1;
			console.log("Shaders loaded!");
		}
		else
		{
			console.log("No target given in callback dings");
		}
	};

	this.load_progress = function (progress) {
		// do something
	};

	this.state = 0; // 0: loading, 1: ready
	this.uniforms = uniforms || {};
	this.program = {};
	this.info = {};
	console.log(vertName+fragName);
	loadFiles(["/resources/shaders/".concat(vertName), "/resources/shaders/".concat(fragName)], this.create_program, this.load_progress, this);
}