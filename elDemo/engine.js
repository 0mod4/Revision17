
var engine = {};

var State = { Scene1: 0, Scene2: 1, Scene3: 2, End: 3 };
engine.state = State.Scene1;
engine.isReady = false;

var stats;
var Scene1, Scene2, Scene3;
var gl, m4 = twgl.m4;
var planetVideo;

var programInfo;
var bufferInfo;
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

		Scene1 = new TestScene();
		Scene1.init(500);

		Scene2 = new TestAlphaScene();
		Scene2.init(3000);

		Scene3 = new TestScene();
		Scene3.init(3000);

		//music = document.getElementById("music");
		//music.oncanplaythrough = function() {
		//	musicIsReady = true;
		//};
		//music.load();

		//if (gl.getError() !== 0)
		//	console.log(gl.getError());

		requestAnimationFrame(render);
};

function render(time) {
	stats.begin();
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	switch (engine.state)
	{
		case State.Scene1: {
			Scene1.update();
			if(Scene1.isOver())
			{
				engine.state = State.Scene2;
				Scene2.run();
			}
			break;
		}
		case State.Scene2: {
			Scene2.update();
			if(Scene2.isOver())
			{
				console.log("Scene 2 over");
				engine.state = State.Scene3;
				Scene3.run();
			}
			break;
		}
		case State.Scene3: {
			Scene3.update();
			if(Scene3.isOver())
				engine.state = State.End;
			break;
		}
		default: {
			break;
		}
	}
	//if (gl.getError() !== 0)
	//	console.log(gl.getError());
	stats.end();

	requestAnimationFrame(render);
}
