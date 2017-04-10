function Shader (vertName, fragName, uniforms)
{
	loadFile("/elDemo/shader/".concat(vertName), function (error, content) { 
		this.vert = content;
	});

	loadFile("/elDemo/shader/".concat(fragName), function (error, content) {
		this.frag = content;
	});

	this.program = twgl.createProgramFromSources(gl, [vert, frag]);
	this.info = twgl.createProgramInfoFromProgram(gl, this.program);
	this.uniforms = uniforms || {};
}