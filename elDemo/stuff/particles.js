function Particles (n, startpositions, vertexShader, fragmentShader, uniforms, texturepath, startsize, lifetime, getStartVec, applyGravity, maxSpeed, bounce, randgravity)
{
	//n: number of particles
	//startpositions: x,y,z coordinates of start positions, will be randomly chosen for newly created particles
	//startsize: particle start size 
	//lifetime (in ms): if 0, particles live forever, else size is going to be interpolated linearly between startsize and 0 over lifetime
	//getStartVec: function taking pos argument [x,y,z], returns [x,y,z] start vector (will be normalized)
	//applyGravity: change start vector on every update a little towards ground

	this.shader = new Shader(vertexShader, fragmentShader, uniforms);
	this.shader.uniforms.time = 0;
	this.shader.uniforms.resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
	this.shader.uniforms.view = m4.identity();
	this.shader.uniforms.world = m4.identity();
	this.shader.uniforms.cameraDirection = [0,0,1];

	this.displayType = gl.POINTS;
	this.position = [0, 0, 0];
	this.orientation = [0, 0, 0];
	this.scale = [1, 1, 1];
	this.anchor = [0, 0, 0];
	this.matrix = new Float32Array(16);

	this.alpha = true;

	if (texturepath === undefined)
		texturepath = null;

	if (lifetime === undefined)
		lifetime = 0;

	if (applyGravity === undefined)
		applyGravity = false;

	if (maxSpeed === undefined)
		maxSpeed = 1.0;

	if (bounce === undefined)
		bounce = false;

	if (randgravity === undefined)
		randgravity = false;

	this.initTex = function(texturepath, handle) { //timing problem using twgl function. this works.
		texture = gl.createTexture();
		image = new Image();
		image.onload = function() { handle(image, texture); };
		image.src = texturepath;
		return texture;
	};

	if (texturepath !== null)
	{
		this.spriteTexture = this.initTex(
			texturepath,
			function(image, texture) {
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.bindTexture(gl.TEXTURE_2D, null);
			}
		);
	}
	else
	{
		this.spriteTexture = null;
	}

	//-------particle stuff----------/
	this.lifetime = lifetime;
	this.startsize = startsize;
	this.numParticles = n;
	this.startPositions = startpositions;
	this.getStartVec = getStartVec;
	this.maxSpeed = maxSpeed;
	this.applyGravity = applyGravity;
	this.particles = new Array(this.numParticles).fill(null);
	this.buffer = null;
	this.bounce = bounce;
	this.randgravity = randgravity;

	this.createParticle = function(startpos){
		var pos;
		if (startpos.length > 3) //choose random start position
		{
			var randpos = Math.floor(Math.random()*startpos.length/3.0)*3;
			pos = [startpos[randpos], startpos[randpos+1], startpos[randpos+2]];
		}
		else 
		{
			pos = startpos;
		}

		var lifetime = (Math.random()+0.5)*this.lifetime;
		p = {pos: pos, 
			 lifetime: lifetime,
			 remlifetime: lifetime,
			 starttime: Date.now(),
			 vec: normalize(this.getStartVec(pos)),
			 speed: Math.random()*this.maxSpeed+0.001,
			};
		return p;
	};

	this.spawnParticles = function(n, startpos) {
		for (var i=0; i<this.particles.length && n>0; i++) {
			if (!this.particles[i]) {
				this.particles[i] = this.createParticle(startpos);
				n--;
			}
		}
	};

	this.updateParticles = function(particles){
		//pass by all particles
		var nAlive = 0;
		for (var i=0; i<particles.length; ++i)
		{
			if (particles[i] === null) continue; // skip dead particles
			if (particles[i].remlifetime <= 0) // kill particles
			{
				particles[i] = null;
				continue;
			}

			var age = Date.now()-particles[i].starttime;
			particles[i].remlifetime = particles[i].lifetime - age;
			var fac = particles[i].speed;
			particles[i].pos = [particles[i].pos[0]+particles[i].vec[0]*fac, particles[i].pos[1]+particles[i].vec[1]*fac, particles[i].pos[2]+particles[i].vec[2]*fac];
			if (this.applyGravity)
			{
				if(this.randgravity)
					particles[i].vec[1] += (2.0*Math.random()-1.05)*0.2;			
				else
					particles[i].vec[1] -= 0.098 * age/1000.0;
				if(particles[i].pos[1] < -1) {
					if(this.bounce)
						particles[i].vec[1] *= -0.75; // Allow particles to bounce off the floor
					particles[i].vec = normalize(particles[i].vec);
					particles[i].pos[1] = -1;
				}
			}
			nAlive++;
		}

		//fill buffer
		if (nAlive > 0) {
			this.buffer = twgl.createBufferInfoFromArrays(gl, this.createBufferArrayFromParticles(this.particles));
		}
	};

	this.createBufferArrayFromParticles = function(particles) {
		var position = [];
		var lifetime = [];
		for (var i=0; i<particles.length; ++i)
		{
			if (particles[i]) {
				position = position.concat(particles[i].pos);
				lifetime.push(particles[i].remlifetime);
			}
		}
		var bufferArray = {
				position: position,
				lifetime: { numComponents: 1, data: lifetime},
		};
		return bufferArray;
	};

	this.draw = function (camera, time)
	{
		if (this.shader.state == 1) {
			m4.translation(this.position, this.matrix);
			m4.rotateX(this.matrix, this.orientation[0], this.matrix);
			m4.rotateY(this.matrix, this.orientation[1], this.matrix);
			m4.rotateZ(this.matrix, this.orientation[2], this.matrix);
			m4.translate(this.matrix, this.anchor, this.matrix);
			m4.scale(this.matrix, this.scale, this.matrix);

			m4.multiply(this.matrix, camera.viewProjection, this.shader.uniforms.view);

			this.shader.uniforms.cameraDirection[0] = camera.target[0] - camera.position[0];
			this.shader.uniforms.cameraDirection[1] = camera.target[1] - camera.position[1];
			this.shader.uniforms.cameraDirection[2] = camera.target[2] - camera.position[2];

			this.shader.uniforms.time = time || 0;
			this.shader.uniforms.resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
			this.shader.uniforms.startsize = this.startsize;

			if (this.spriteTexture !== null)
				this.shader.uniforms.useTex = true;
			else
				this.shader.uniforms.useTex = false;

			gl.useProgram(this.shader.program);
			twgl.setUniforms(this.shader.info, this.shader.uniforms);

			//update particles
			this.updateParticles(this.particles);

			if (this.buffer) {
				twgl.setBuffersAndAttributes(gl, this.shader.info, this.buffer);
				//gl.enable(gl.PROGRAM_POINT_SIZE);//gl.POINT_SMOOTH);
				if (this.spriteTexture !== null)
				{
					gl.activeTexture(gl.TEXTURE0);
					gl.bindTexture(gl.TEXTURE_2D, this.spriteTexture);
					gl.uniform1i(this.shader.program.uSampler, 0);
				}

				twgl.drawBufferInfo(gl, this.buffer, this.displayType);
			}

			//gl.drawArrays(gl.POINTS, 0, 3);
			//gl.disable(gl.PROGRAM_POINT_SIZE);//gl.POINT_SMOOTH);

			// this.axis.matrix = this.matrix;
			// this.axis.draw(camera);
		}
	};

	this.translate = function (x, y, z)
	{
		this.position[0] += x;
		this.position[1] += y;
		this.position[2] += z;
	};

	this.translation = function (x, y, z)
	{
		this.position[0] = x;
		this.position[1] = y;
		this.position[2] = z;
	};

	this.rotate = function (x, y, z)
	{
		this.orientation[0] += x;
		this.orientation[1] += y;
		this.orientation[2] += z;
	};

	this.rotation = function (x, y, z)
	{
		this.orientation[0] = x;
		this.orientation[1] = y;
		this.orientation[2] = z;
	};

	this.scaling = function (x, y, z)
	{
		y = y || x;
		z = z || x;
		this.scale[0] = x;
		this.scale[1] = y;
		this.scale[2] = z;
	};

	this.setAnchor = function (x, y, z)
	{
		this.anchor[0] = x;
		this.anchor[1] = y;
		this.anchor[2] = z;
	};

	this.setUniform = function (uniformName, value)
	{
		this.shader.uniforms[uniformName] = value;
	};
}