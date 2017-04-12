
var engine = {};

var State = {Begin: 0, Progressbar: 1, Scene1: 2, End: 3};
engine.state = State.Begin;
engine.isReady = false;

var stats;
var Progressbar, Scene1;
var gl, m4 = twgl.m4;
var planetVideo;

var programInfo;
var bufferInfo;

var audioPlayer;

engine.init = function ()
{
	audioPlayer = new AudioPlayer();

	stats = new Stats();
	stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(stats.dom);

	gl = twgl.getWebGLContext(document.getElementById("c"), { premultipliedAlpha: false, alpha: true });
	gl.getExtension("OES_texture_float");
	gl.getExtension("OES_texture_float_linear");

	Progressbar = new Progressbar();
	Progressbar.init(7000);

	Scene1 = new TreeScene();
	Scene1.init(50000);

	Progressbar.run();
	requestAnimationFrame(render);
};

function render(time) {
	stats.begin();
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	switch (engine.state)
	{
		case State.Begin: {
			console.log("Begin.");
			engine.state = State.Progressbar;
			console.log("Next: Progressbar");
			break;
		}
		case State.Progressbar: {
			Progressbar.update();
			if(Progressbar.isOver())
			{
				console.log("Progressbar is over");
				engine.state = State.Scene1;
				Scene1.run();
				console.log("Next: Scene 1");
			}
			break;
		}
		case State.Scene1: {
			Scene1.update();
			if(Scene1.isOver())
			{
				console.log("Scene 1 over");
				engine.state = State.End;
				console.log("End.");
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
