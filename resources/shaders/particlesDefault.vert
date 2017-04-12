attribute vec3 position;
attribute float lifetime;

uniform float startsize;

void main() {
	gl_Position = vec4(position.xyz, 1.);
	gl_PointSize = startsize*lifetime/1000.;
}