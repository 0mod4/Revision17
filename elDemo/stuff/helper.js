function normalize(vec)
{
	var len = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
	vec.x/=len;
	vec.y/=len;
	vec.z/=len;
	return vec; 
}

function initTex(texturepath, handle) { //timing problem using twgl function. this works.
	texture = gl.createTexture();
	image = new Image();
	image.onload = function() { handle(image, texture); };
	image.src = texturepath;
	return texture;
}