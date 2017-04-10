
var engine = {};

var State = { Test: 0 };
engine.state = State.Test;
engine.isReady = false;

var stats;
var testScene;
var gl, m4 = twgl.m4;
var planetVideo;

var programInfo;
var bufferInfo;
//var assetsIsLoaded = true;
//var music;
//var musicIsReady = false;

var vert =
	"attribute vec4 position;"+
	"void main() {"+
	"	gl_Position = position;"+
	"}";

var frag = //caution! have a problem with comments in this format
	"precision mediump float;"+
	"uniform vec2 resolution;"+
	"uniform float time;"+
	"void main() {"+
	"	vec2 uv = gl_FragCoord.xy / resolution;"+
	"	float color = 0.0;"+
	"	color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );"+
	"	color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );"+
	"	color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );"+
	"	color *= sin( time / 10.0 ) * 0.5;"+
	"	gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );"+
	"}";


engine.init = function ()
{
		stats = new Stats();
		stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild(stats.dom);

		gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: false });
		gl.getExtension("OES_texture_float");
		gl.getExtension("OES_texture_float_linear");

		testScene = new TestScene();
		testScene.init();

		//blender.init();
		//music = document.getElementById("music");
		//music.oncanplaythrough = function() {
		//	musicIsReady = true;
		//};
		//music.load();

//		programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
		// var program = twgl.createProgramFromSources(gl, [vert, frag]);
		// programInfo = twgl.createProgramInfoFromProgram(gl, program);

		// var arrays = {
		// 	position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
		// };
		// bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

		if (gl.getError() !== 0)
			console.log(gl.getError());

		requestAnimationFrame(render);
};

function render(time) {
	stats.begin();
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	// var uniforms = {
	// 	time: time * 0.001,
	// 	resolution: [gl.canvas.width, gl.canvas.height],
	// };
	// gl.useProgram(programInfo.program);
	// twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
	// twgl.setUniforms(programInfo, uniforms);
	// twgl.drawBufferInfo(gl, bufferInfo);
	testScene.update();
	if (gl.getError() !== 0)
		console.log(gl.getError());
	stats.end();

	requestAnimationFrame(render);
}
// engine.init = function ()
// {
// 	console.log("engine.init");
// 	gl = twgl.getWebGLContext(document.getElementById("view"), { premultipliedAlpha: false, alpha: false });
// 	gl.getExtension("OES_texture_float");
// 	gl.getExtension("OES_texture_float_linear");
// 	twgl.setDefaults({attribPrefix: "a_"});

// 	testScene = new TestScene();
// 	testScene.init();
// 	//blender.init();

// 	//music = document.getElementById("music");
// 	//music.oncanplaythrough = function() {
// 	//	musicIsReady = true;
// 	//};
// 	//music.load();

// 	requestAnimationFrame(render);

// 	console.log("Finished engine.init");

// 	//loadAssets();
// };

// function render (time) 
// {
// 	requestAnimationFrame(render);

// 	if (!engine.isReady)// && assetsIsLoaded && musicIsReady) 
// 	{
// 		engine.isReady = true;
// 		//addHeaderToShaders();
// 		//testScene.loaded();
// 	}

// 	twgl.resizeCanvasToDisplaySize(gl.canvas);
// 	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

// 	//mouse.update();

// 	testScene.update();

// 	// switch (engine.state)
// 	// {
// 	// 	case State.Loading: {
// 	// 		loadingScene.update();

// 	// 		if (engine.isReady && loadingScene.cooldown.isOver()) {
// 	// 			loadingScene = null;
// 	// 			// introScene.init();
// 	// 			// engine.state = State.Intro;
// 	// 			// testScene.init();
// 	// 			// engine.state = State.Test;
// 	// 			music.play();
// 	// 			mainScene.init();
// 	// 			engine.state = State.Main;
// 	// 			// audioAnalyser = new AudioAnalyser();
// 	// 		}
// 	// 		break;
// 	// 	}
// 	// 	case State.Intro: {
// 	// 		introScene.update();

// 	// 		if (introScene.cooldownSplash.isOver()) {
// 	// 			introScene = null;
// 	// 			testScene.init();
// 	// 			engine.state = State.Test;
// 	// 		}
// 	// 		break;
// 	// 	}
// 	// 	case State.Test: {
// 	// 		testScene.update();
// 	// 		break;
// 	// 	}
// 	// 	case State.Main: {
// 	// 		mainScene.update();
// 	// 		break;
// 	// 	}
// 	// }
// }