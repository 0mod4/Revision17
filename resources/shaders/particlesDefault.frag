precision mediump float;

varying float v_lifetime;

uniform vec2 resolution;
uniform float time;
uniform bool useTex;
uniform bool changecol;
uniform float lifespan;
uniform vec4 startcol;
uniform vec4 endcol;

uniform sampler2D uSampler;

void main() {
	//vec2 uv = gl_FragCoord.xy / resolution;
	if(useTex)
	{
    	vec4 texColor = texture2D(uSampler, gl_PointCoord);
	//gl_FragColor = vec4(1.,0.,0., 1.);
		if (changecol)
		{
    		float a = min(1.0, v_lifetime/lifespan);
    		vec4 mixcol = mix(endcol, startcol, a);
   			vec4 col = vec4(texColor.r*mixcol.r, texColor.g*mixcol.g, texColor.b*mixcol.b, texColor.a*mixcol.a);
    		gl_FragColor = col;
		}
    	else
    		gl_FragColor = vec4(texColor.rgb, texColor.a);
    }
    else
    {
    	if(changecol)
    	{
    		float a = min(1.0, v_lifetime/lifespan);
    		gl_FragColor = mix(startcol, endcol, a);//startcol*intpval+endcol*(1-intpval);
    	}
    	else
    		gl_FragColor = vec4(1., 0., 0., 1.);
    }
}