precision mediump float;
uniform vec2 resolution;
uniform float time;

void main() {
	vec2 uv = (2.*gl_FragCoord.xy - resolution) / resolution;

	float color = 0.0;
	const float duration = 5.;
	
	const vec2 left  = vec2(-1., -0.1);
	const vec2 right = vec2( 1.,  0.1);
	float width = right.x - left.x;
	float cur = left.x + time/(duration - 1.) * width;

	if (uv.x > left.x && uv.x < right.x) {
		if (uv.y > left.y && uv.y < right.y) {
			if (uv.x < cur) {
				color = 1.;
			}
		}
	}

	color = pow(20.*(uv.x+uv.y), 2.);
	gl_FragColor = vec4(vec3(color), 1.);
}