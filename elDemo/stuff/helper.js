function normalize(vec)
{
	var len = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
	vec.x/=len;
	vec.y/=len;
	vec.z/=len;
	return vec; 
}