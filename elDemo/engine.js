
var engine = {};

var State = { Progressbar: 0, Scene1: 1, Scene2: 2, End: 3};
engine.state = State.Progressbar;
engine.isReady = false;

var stats;
var Progressbar, Scene1, Scene2;
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

		Progressbar = new Progressbar();
		Progressbar.init(2000);

		Scene1 = new TestScene();
		Scene1.init(5000);

		Scene2 = new TestScene2();
		Scene2.init(5000);

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
		case State.Progressbar: {
			Progressbar.update();
			if(Progressbar.isOver())
			{
				console.log("Progressbar is over");
				engine.state = State.Scene1;
				Progressbar.run();
			}
		}
		case State.Scene1: {
			Scene1.update();
			if(Scene1.isOver())
			{
				console.log("Scene 1 over");
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
				engine.state = State.End;
				Scene3.run();
			}
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
