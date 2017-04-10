precision mediump float;
uniform vec2 resolution;
uniform float time;
//uniform float progress;

void main() {
	vec2 uv = (2.*gl_FragCoord.xy - resolution.xy) / min(resolution.x, resolution.y);

	float progress = mod(time/5., 1.);
	float color = 0.0;
	
	const vec2 left = vec2(-1,-0.1);
	const vec2 right = vec2(1,0.1);
	float width = right.x - left.x;
	float cur = left.x + progress * width;

	if (uv.x > left.x && uv.x < right.x) {
		if (uv.y > left.y && uv.y < right.y) {
			if (uv.x < cur) {
				color = 1.;
			}
		}
	}

	gl_FragColor = vec4(vec3(color), 1.);
}