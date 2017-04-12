precision mediump float;
uniform vec2 resolution;
uniform float time;

uniform sampler2D uSampler;

void main() {
	//vec2 uv = gl_FragCoord.xy / resolution;
    vec4 texColor = texture2D(uSampler, gl_PointCoord);
	//gl_FragColor = vec4(1.,0.,0., 1.);
    gl_FragColor = vec4(texColor.rgb, texColor.a);// * vLifespan);
}