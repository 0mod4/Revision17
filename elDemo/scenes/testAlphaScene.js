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

	var red_frag = 
		"void main() {"+
		"	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);"+
		"}";
		
		//precision mediump float;
		//uniform vec2 resolution;
		//uniform float time;
		//void main() {
		//	vec2 uv = gl_FragCoord.xy / resolution;
		//	float color = 0.0;
		//	// lifted from glslsandbox.com
		//	color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );
		//	color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );
		//	color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );
		//	color *= sin( time / 10.0 ) * 0.5;
		//	gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );
		//}

function TestAlphaScene ()
{
	Scene.call(this); 

	this.init = function (time)
	{
		this.camera.position = [0, 2, -5];
		this.camera.target = [0, 2, 0];

		this.alpha = true;

		//this.vegetation = new PointCloud("vegetation.ply", 20);
		//this.vegetation.setLeafSize([0.2, 0.1]);
		//this.vegetation.position[1] = 2;

		//this.bush = new Bush([8,8,8]);
		//this.bush.setVoxelSize(1.);
		//this.bush.setLeafSize([0.3, 4.]);
		//this.bush.setDisplacementScale([0.5, 0.1, 0.5]);
		//this.bush.setNoiseScale([0.5, 0.5, 0.5]);

		// var curveArray = curveToArray(assets["curve.3d"]);
		// var curve = twgl.createTexture(gl, { type: gl.FLOAT, min: gl.LINEAR, mag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE, width: Math.ceil(curveArray.length / 4.), height: 1, src: curveArray });

		// this.bamboo = new Bamboo(curve);

		// this.character = new Character();

		// this.hand = new Mesh({
		// 	meshName: "hand.ply",
		// 	textureSrc: [0,0,0,1],
		// 	vertexShader: "bone.vert",
		// 	pixelShader: "color.frag",
		// 	wired: true,
		// });
		// this.hand.displayType = gl.LINES;
		// this.hand.scaling(2);

		// this.moss = new Moss(createMesh(assets["hand.ply"]));
		// this.moss.setLeafSize([0.1, 0.5]);
		// this.moss.scaling(2);

		// this.grid = new Entity(createGrid(), assets["color.vert"], assets["color.frag"]);
		// this.grid.displayType = gl.LINES;

		// this.targetBush = new Entity(createWiredCube(), assets["color.vert"], assets["color.frag"]);
		// this.targetBush.displayType = gl.LINES;

		// this.targetBoids = new Entity(createWiredCube(), assets["color.vert"], assets["color.frag"]);
		// this.targetBoids.displayType = gl.LINES;

		// this.boidManager = new Butterflies();

		// this.video = new Video("assets/videos/dance1.mp4");
		// this.opticalFlow = new OpticalFlow();

		// // this.addEntity(this.vegetation);
		// // this.addEntity(this.bamboo);
		// // this.addEntity(this.character);
		// // this.addEntity(this.grid);
		// // this.addEntity(this.targetBush);
		// this.addEntity(this.moss);
		// this.addEntity(this.hand);
		// this.addEntity(this.targetBoids);
		// this.addEntity(this.bush);
		// this.addEntity(this.boidManager);

		var arrays = {
		  position: [-1,-1,0, 1,-1,0, -1,1,0, -1,1,0, 1,-1,0, 1,1,0],
		};

		var uniforms = {
			time: time * 0.001,
			resolution: [gl.canvas.width, gl.canvas.height],
		};
		this.testDrawable = new Drawable(arrays, vert, frag, uniforms);

		arrays = {
		  position: [-0.5,-0.5,0, 0.5,-0.5,0, -0.5,0.5,0],
		};
		uniforms = {};
		this.testAlphaDrawable = new Drawable(arrays, vert, red_frag, uniforms);
		
		this.addDrawable(this.testAlphaDrawable);
		this.addDrawable(this.testDrawable);
	};

	this.update = function ()
	{
		// target
		// var speed = 0.3;
		// var radius = 4.;
		// this.targetBush.position = [Math.cos(this.cooldown.elapsed * speed) * radius, Math.sin(this.cooldown.elapsed * 2. * speed), Math.sin(this.cooldown.elapsed * speed) * radius];
		// this.targetBoids.position = [Math.cos(this.cooldown.elapsed * speed + Math.PI) * 2, 1, Math.sin(this.cooldown.elapsed * speed + Math.PI) * 2];

		// camera
		this.camera.orbitControl();
		this.camera.position[1] = 1;

		// uniforms
		// this.bush.setUniform("u_target", this.targetBush.position);
		// this.vegetation.setTarget(this.target);

		// boids
		// this.boidManager.update();
		// this.boidManager.target = this.targetBoids.position;

		// planetVideo.update(this.cooldown.elapsed);

		this.draw();
		// this.opticalFlow.draw(planetVideo, this.camera);
	};
}

TestScene.prototype = Object.create(Scene.prototype);
TestScene.prototype.constructor = TestScene;