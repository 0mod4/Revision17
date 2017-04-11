// Inspired by Max Sills work (MIT licence)
precision mediump float;

#define kDepth 7
#define kBranches 3
#define kMaxDepth 2187 // branches ^ depth

uniform vec2 resolution;
uniform float time;

//--------------------------------------------------------------------------

mat3 matRotate(float angle)
{
    float c = cos(angle);
    float s = sin(angle);
    return mat3( c, s, 0, -s, c, 0, 0, 0, 1);
}

mat3 matTranslate( float x, float y )
{
    return mat3( 1, 0, 0, 0, 1, 0, -x, -y, 1 );
}

float sdBranch( vec2 p, float w1, float w2, float l )
{
    float h = clamp( p.y/l, 0.0, 1.0 );
	float d = length( p - vec2(0.0,l*h) );
    return d - mix( w1, w2, h );
}

//--------------------------------------------------------------------------

float map( vec2 pos )
{
    const float len = 2.0;
    const float wid = 0.4;
    const float lenf = 0.63;
    const float widf = 0.3;
    
    float d = sdBranch( pos, wid, wid*widf, len );
    
    int c = 0;
    for( int count=0; count < kMaxDepth; count++ )
    {
        int off = kMaxDepth;
    	vec2 pt_n = pos;
        
        float l = len;
        float w = wid;
        
      	for( int i=1; i<=kDepth; i++ )
      	{
            l *= lenf;
            w *= widf;

            off /= kBranches; 
            int dec = c / off;
        	int path = dec - kBranches*(dec/kBranches); //  dec % kBranches
          
            mat3 mx;
            float angle;
	    	if( path == 0 )
           	{
                angle = 0.75 + 0.05*sin(time-1.0);
		  		mx = matRotate(angle) * matTranslate( 0.0,0.4*l/lenf);
	    	}
        	else if( path == 1 )
            {
                angle = -0.6 + 0.05*sin(time);
          		mx = matRotate(angle) * matTranslate(0.0,0.6*l/lenf);
	    	}
	    	else
            {
                angle = 0.05*sin(time+1.0);
          		mx = matRotate(angle) * matTranslate(0.0,1.0*l/lenf);
	    	}
            pt_n = (mx * vec3(pt_n,1)).xy;
            
        
        	// bounding sphere test
            float y = length( pt_n - vec2(0.0, l) );
       		if( y-1.4*l > 0.0 ) { c += off-1; break; }
            
            d = min( d, sdBranch( pt_n, w, w*widf, l ) );
     	}
        
    	c++;
    	if( c > kMaxDepth ) break;
	}
    
   	return d;
}


void main( )
{
    //frame
    float width = resolution.x/500.;;
    float height = resolution.y/500.;
    vec2 midp = vec2(sin(time/20.)*resolution.x/800., cos(time/20.)*resolution.y/800.+height*2.0);

    float minx = midp.x-width/2.0;
    float maxx = midp.x+width/2.0;
    float miny = midp.y-height/2.0;
    float maxy = midp.y+height/2.0;
    
    // coordinate system
    vec2  uv = vec2((gl_FragCoord.x/resolution.x)*width+minx, (gl_FragCoord.y/resolution.y)*height+miny);//    (-iResolution.xy + 2.0*fragCoord.xy) / iResolution.y;
   
    // compute
    float d = map( uv );
    
    // shape
    float stepval = 0.01;
    float smoothw = 0.01;
    vec4 col = vec4( smoothstep( stepval-smoothw, stepval, d ) );
    
    gl_FragColor = col;
}