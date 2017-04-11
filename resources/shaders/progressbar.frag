precision mediump float;
uniform vec2 resolution;
uniform float time;

bool rectangle(vec2 uv, vec2 center, vec2 size) {
	vec2 bounds = abs(uv - center);
	if (bounds.x < size.x/2. && bounds.y < size.y/2.) {
		return true;
	}
	return false;
}

void main() {
	vec2 uv = (2.*gl_FragCoord.xy - resolution) / max(resolution.x, resolution.y);

	const float duration = 7.;
	const float frameThickness = 0.015;
	const float frameMargin = 0.015;
	const float fadeoutTime = 1.;
	
	vec2 barSize  = vec2(0.8, 0.1);

	float color = 0.0;
	// Frame
	if (rectangle(uv, vec2(0., -barSize.y/2.-frameMargin-frameThickness/2.), vec2(barSize.x+2.*(frameMargin+frameThickness), frameThickness)) ||
		rectangle(uv, vec2(0., barSize.y/2.+frameMargin+frameThickness/2.), vec2(barSize.x+2.*(frameMargin+frameThickness), frameThickness)) ||
		rectangle(uv, vec2(-barSize.x/2.-frameMargin-frameThickness/2., 0.), vec2(frameThickness, barSize.y+2.*(frameMargin+frameThickness))) ||
		rectangle(uv, vec2(barSize.x/2.+frameMargin+frameThickness/2., 0.), vec2(frameThickness, barSize.y+2.*(frameMargin+frameThickness)))
	) {
		color = 1.;
	}

	// Progressbar
	if (rectangle(uv, vec2(0.,0.), barSize)) {
		float cur = -barSize.x + time/(duration - fadeoutTime - 2.) * barSize.x;
		if (uv.x < cur) {
			color = 1.;
		}
	}

	// fade out
	color *= duration - time;

	gl_FragColor = vec4(vec3(color), 1.);
}