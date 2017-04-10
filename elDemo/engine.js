
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

		testAlphaScene = new TestAlphaScene();
		testAlphaScene.init();

		//blender.init();
		//music = document.getElementById("music");
		//music.oncanplaythrough = function() {
		//	musicIsReady = true;
		//};
		//music.load();

		if (gl.getError() !== 0)
			console.log(gl.getError());

		requestAnimationFrame(render);
};

function render(time) {
	stats.begin();
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	//testScene.update();
	testAlphaScene.update();
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