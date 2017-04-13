#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float pi = atan(1.0)*4.;

float scale = 1e-2; // svg in range [0,100]x[0,56.25]

float epsilon = 1e-4;
float infinity = 1e6;

#define BRIGHTNESS 4e-3
#define THICKNESS  8e-4

float dfLine(vec2 start, vec2 end, vec2 uv) {
	start *= scale; end *= scale; // rescale

	vec2 line = end - start;
	float frac = dot(uv - start,line) / dot(line,line);
	return distance(start + line * clamp(frac, 0.0, 1.0), uv);
}

float dfArc(vec2 origin, float start, float sweep, float radius, vec2 uv) {
	origin *= scale; radius *= scale; // rescale
	uv -= origin; // move
	sweep = -sweep; // cw for svg
	uv *= mat2( // rotate to start
		 cos(start), sin(start),
		-sin(start), cos(start)
	);

	float offs = (sweep / 2.0 - pi);
        float ang = mod(atan(uv.y, uv.x) - offs, 2.*pi) + offs;
	ang = clamp(ang, min(0.0, sweep), max(0.0, sweep));

	return distance(radius * vec2(cos(ang), sin(ang)), uv);
}

float dfLogo(vec2 uv) {
	float dist = infinity;
	return dist;
}

float dfSG4(vec2 uv) {
	float dist = infinity;
	vec2 v, offset;
	
	// S
	offset = vec2(66.,27.);
	v = uv+offset*scale;
	dist = min(dist, dfArc(vec2(63.032,27.300), 1.403, 1.072, 12.000, v));
	dist = min(dist, dfArc(vec2(64.584,38.160), 3.586, 2.170, 1.000, v));
	dist = min(dist, dfLine(vec2(63.788,37.553), vec2(75.283,22.703), v));
	dist = min(dist, dfArc(vec2(74.338,21.966), 0.5, 2.771, 1.160, v));
	dist = min(dist, dfLine(vec2(60.956,37.061), vec2(73.388,21.228), v));
	dist = min(dist, dfArc(vec2(60.013,36.320), 3.62, 2.733, 1.160, v));
	dist = min(dist, dfLine(vec2(59.055,35.583), vec2(72.830,17.919), v));
	dist = min(dist, dfArc(vec2(71.871,17.206), 0.4, 2.571, 1.199, v));
	dist = min(dist, dfLine(vec2(58.794,32.129), vec2(70.939,16.432), v));
	dist = min(dist, dfArc(vec2(57.857,31.392), 3.522, 2.668, 1.160, v));
	dist = min(dist, dfLine(vec2(56.903,30.657), vec2(68.557,15.549), v));
	dist = min(dist, dfArc(vec2(67.764,14.936), 0.459, 2.233, 1.000, v));
	dist = min(dist, dfArc(vec2(68.503,26.884), -1.664, 0.736, 13.000, v));

	// G
	scale *= 1.02;
	offset = vec2(22.5,28.3);
	v = uv+offset*scale;
	
	dist = min(dist, dfLine(vec2(47.260,26.820), vec2(57.989,26.820), v));
	dist = min(dist, dfArc(vec2(58.304,26.009), 1.571, 1.565, 0.800, v));
	dist = min(dist, dfArc(vec2(46.779,27.768), -0.150, 1.527, 12.500, v));
	dist = min(dist, dfArc(vec2(45.413,15.932), -1.726, 1.403, 0.600, v));
	dist = min(dist, dfLine(vec2(44.786,37.151), vec2(44.786,15.929), v));	
	dist = min(dist, dfArc(vec2(45.393,37.132), 3.126, 1.403, 0.600, v));
	dist = min(dist, dfArc(vec2(46.918,28.354), 1.747, 1.037, 9.500, v));
	dist = min(dist, dfArc(vec2(55.014,35.338), 0.869, 3.169, 1.200, v));
	dist = min(dist, dfArc(vec2(46.844,28.280), 1.930, 1.221, 12.000, v));
	dist = min(dist, dfArc(vec2(42.693,38.862), 3.126, 1.403, 0.600, v));
	dist = min(dist, dfLine(vec2(42.057,38.800), vec2(42.057,17.332), v));
	dist = min(dist, dfArc(vec2(41.423,17.062), 0.0, 1.803, 0.600, v));
	dist = min(dist, dfArc(vec2(46.659,27.731), -2.030, 0.100, 12.500, v));
	dist = min(dist, dfArc(vec2(40.123,17.802), -2.000, 1.303, 0.600, v));
	dist = min(dist, dfLine(vec2(39.501,36.911), vec2(39.501,18.001), v));
	dist = min(dist, dfArc(vec2(38.923,36.742), 2.200, 1.703, 0.600, v));
	dist = min(dist, dfArc(vec2(46.659,27.731), -3.850, 0.150, 12.500, v));
	dist = min(dist, dfArc(vec2(37.595,35.312), 3.140, 0.6, 0.600, v));
	dist = min(dist, dfLine(vec2(36.975,35.040), vec2(36.975,22.290), v));
	dist = min(dist, dfArc(vec2(36.484,22.217), 0.000, 2.500, 0.500, v));
	dist = min(dist, dfArc(vec2(45.156,28.139), -2.554, 0.885, 11.000, v));

	// 4
	scale *= 1.08;
	offset = vec2(-12.5,28.4);
	v = uv+offset*scale;
	
	dist = min(dist, dfLine(vec2(29.270,21.828), vec2(24.879,21.828), v));
	dist = min(dist, dfArc(vec2(24.580,23.040), -1.57, 2.40, 1.2, v));
	dist = min(dist, dfLine(vec2(23.617,23.799), vec2(29.733,29.964), v));
	dist = min(dist, dfArc(vec2(30.270,29.470), 2.5, 2.50, 0.7, v));
	dist = min(dist, dfLine(vec2(30.989,29.266), vec2(30.989,17.892), v));
	dist = min(dist, dfArc(vec2(32.200,17.600), 0.0, 3.141, 1.2, v));
	dist = min(dist, dfLine(vec2(33.402,33.007), vec2(33.402,17.826), v));
	dist = min(dist, dfArc(vec2(34.680,33.250), 3.141, 3.141, 1.25, v));
	dist = min(dist, dfLine(vec2(35.950,33.230), vec2(35.950,17.926), v));
	dist = min(dist, dfArc(vec2(37.160,17.600), 0.0, 3.141, 1.2, v));
	dist = min(dist, dfLine(vec2(38.365,37.990), vec2(38.365,17.760), v));
	dist = min(dist, dfArc(vec2(39.570,38.180), 3.141, 3.141, 1.21, v));
	dist = min(dist, dfLine(vec2(40.812,38.000), vec2(40.812,22.820), v));
	dist = min(dist, dfArc(vec2(42.000,22.970), -1.57, 1.57, 1.2, v));
	dist = min(dist, dfLine(vec2(41.771,21.795), vec2(45.178,21.795), v));
	
	return dist;
}

float dfFrame(vec2 uv, vec2 left, vec2 right) {
	float dist = infinity;
	float r = 1.5;	

	// Frame
	
	// bottom
	dist = min(dist, dfLine(vec2(left.x+r,left.y), vec2((right.x-left.x)/2.-r,left.y), uv));
	dist = min(dist, dfLine(vec2((right.x-left.x)/2.+r,left.y), vec2(right.x-r,left.y), uv));
	dist = min(dist, dfArc(vec2(right.x-r,left.y+r), 0., 1.57, r, uv));
	
	// right
	dist = min(dist, dfLine(vec2(right.x,left.y+r), vec2(right.x, right.y-r), uv));
	dist = min(dist, dfArc(vec2(right.x-r,right.y-r), 1.57, 1.57, r, uv));
	
	// top
	dist = min(dist, dfLine(vec2(right.x-r,right.y), vec2(left.x+r,right.y), uv));
	dist = min(dist, dfArc(vec2(left.x+r,right.y-r), -3.14, 1.57, r, uv));
	
	// left
	dist = min(dist, dfLine(vec2(left.x,right.y-r), vec2(left.x,left.y+r), uv));
	dist = min(dist, dfArc(vec2(left.x+r,left.y+r), -1.57, 1.57, r, uv));
	return dist;
}

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float flicker(float time) {
	return rand(vec2(time, 0.));
}

void main(void) {
	vec2 uv = (gl_FragCoord.xy) / max(resolution.x, resolution.y);

	float flicker_amount1 = pow(sin(time/2.11),2.)*0.03;
	float flicker_amount2 = pow(sin(time/1.33),2.)*0.03;
	float tf1 = (1.-flicker_amount1)+(flicker(time)*flicker_amount1);
	float tf2 = (1.-flicker_amount2)+(flicker(time+1337.)*flicker_amount2);
	float bright1 = BRIGHTNESS * min(1.0, 1.0 - sin(tf1 * pi * 50.0) / (tf1 * pi * 1.3));
	float bright2 = BRIGHTNESS * min(1.0, 1.0 - sin(tf2 * pi * 50.0) / (tf2 * pi * 1.3));

	vec2 pos;
	vec3 signColor;
	float dist, shade;
	
	vec3 color = vec3(0.);

	scale = 0.5e-2;
	pos = vec2(0.1,0.1); signColor = vec3(1., .2, .1);
	dist = dfSG4(uv - pos);
	shade = bright1 / max(epsilon, dist - THICKNESS);
	color += signColor * shade;
	
	pos = vec2(0.1,0.1); signColor = vec3(.05, .2, 1.);
	dist = dfFrame(uv - pos, vec2(-10.7,-14.), vec2(59.7,13.1));
	shade = bright2 / max(epsilon, dist - THICKNESS);
	color += signColor * shade;

	gl_FragColor = vec4(color, 1.);
}