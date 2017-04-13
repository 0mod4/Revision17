precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform bool useTex;
uniform sampler2D uSampler;

void main() {
	if (useTex)
	{
		vec2 uv = vec2(0.2,0.2);//gl_FragCoord.xy / resolution;
    	vec4 texColor = texture2D(uSampler, uv);
    	if (texColor.b == 0.) //texture is 0,0,0,1 -> why??
    		gl_FragColor = vec4(1., 0., 1., 1.);
    	else
    		gl_FragColor = vec4(texColor.rgb, texColor.a);
	}
	else
	{
		gl_FragColor = vec4(1.,0.,0., 1.);
	}
}