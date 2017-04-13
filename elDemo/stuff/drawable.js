function Drawable (bufferArray, vertexShader, fragmentShader, uniforms, texturepath)
{
	this.buffer = twgl.createBufferInfoFromArrays(gl, bufferArray);

	this.shader = new Shader(vertexShader, fragmentShader, uniforms);
	this.shader.uniforms.time = 0;
	this.shader.uniforms.resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
	this.shader.uniforms.view = m4.identity();
	this.shader.uniforms.world = m4.identity();
	this.shader.uniforms.cameraDirection = [0,0,1];

	this.displayType = gl.TRIANGLES;
	this.position = [0, 0, 0];
	this.orientation = [0, 0, 0];
	this.scale = [1, 1, 1];
	this.anchor = [0, 0, 0];
	this.matrix = new Float32Array(16);

	if (texturepath !== undefined)
	{
		this.texture = initTex(
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
		this.shader.uniforms.useTex = true;
	}
	else
	{
		this.texture = null;
		this.shader.uniforms.useTex = false;
	}

	// this.axis = new Dummy(createAxis());

	this.draw = function (camera, time, music)
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

			gl.useProgram(this.shader.program);
			this.shader.uniforms.time = time || 0;
			this.shader.uniforms.resolution = [gl.drawingBufferWidth, gl.drawingBufferHeight];
			this.shader.uniforms.music = music;

			twgl.setUniforms(this.shader.info, this.shader.uniforms);
			twgl.setBuffersAndAttributes(gl, this.shader.info, this.buffer);

			if (this.texture !== null)
			{
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.uniform1i(this.shader.program.uSampler, 0);
			}
			else
				this.shader.uniforms.useTex = false;

			//twgl.drawBufferInfo(gl, this.displayType, this.buffer);
			twgl.drawBufferInfo(gl, this.buffer, this.displayType);

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