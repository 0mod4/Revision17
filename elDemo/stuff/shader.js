function Shader (vertName, fragName, uniforms)
{
	loadFile("/resources/shaders/".concat(vertName), function (error, content) { 
		this.vert = content;
	});

	loadFile("/resources/shaders/".concat(fragName), function (error, content) {
		this.frag = content;
	});

	this.program = twgl.createProgramFromSources(gl, [vert, frag]);
	this.info = twgl.createProgramInfoFromProgram(gl, this.program);
	this.uniforms = uniforms || {};
}