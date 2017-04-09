
function Shader (vert, frag, uniforms)
{
	console.log("createProgramFromSources");
	this.program = twgl.createProgramFromSources(gl, [vert, frag]);
	console.log("createProgramInfoFromProgram");
	this.info = twgl.createProgramInfoFromProgram(gl, this.program);
	console.log("Uniforms");
	this.uniforms = uniforms || {};
}