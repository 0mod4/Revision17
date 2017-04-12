precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D music; // in [-100, -20]

void main() {
	vec2 uv = gl_FragCoord.xy / resolution;

	const float minDec = -100.;
	const float maxDec = -20.;
	float fft = (texture2D(music, vec2(0, uv.x)).x - minDec)/(maxDec-minDec);

	vec3 color = vec3(0.);
	if (uv.y < fft) {
		color = vec3(fft, .3, .3);
	}
	gl_FragColor = vec4(color, 1.);
}