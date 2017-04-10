function Shader (vertName, fragName, uniforms)
{
	this.create_program = function (err, shaderFiles) {
		this.program = twgl.createProgramFromSources(gl, [shaderFiles[vertName], shaderFiles[fragName]]);
		this.info = twgl.createProgramInfoFromProgram(gl, this.program);
		this.state = 1;
		console.log("Shaders loaded!");
	}

	this.load_progress = function (progress) {
		// do something
	}

	this.state = 0; // 0: loading, 1: ready
	this.uniforms = uniforms || {};
	this.program = {};
	this.info = {};
	loadFiles(["/resources/shaders/".concat(vertName), "/resources/shaders/".concat(fragName)], this.create_program, this.load_progress);
}