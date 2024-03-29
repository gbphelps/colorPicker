precision mediump float;
varying vec2 v_pos;
uniform vec2 u_res;
uniform vec3 u_color;
uniform float u_side;
uniform float u_margin;

float distToLine(vec2 slope, vec2 linePoint, vec2 point) {
  vec2 n = slope/length(slope);
  vec2 dir = linePoint - point;
  return length(dir - dot(dir,n)*n);
}

vec2 mapToLine(vec2 slope, vec2 linePoint, vec2 point) {
  vec2 n = slope/length(slope);
  vec2 dir = point - linePoint;
  return linePoint + dot(dir, n)*n;
}


vec3 tri(vec2 point, vec3 color){
  vec3 black = vec3(0.0, 0.0, 0.0);
  vec3 white = vec3(1.0, 1.0, 1.0);

  float sq3 = 1.732050807568877;
  float ratio = sq3/2.0;
  vec2 y0 = vec2(0.0, ratio);
  vec2 slope1 = vec2(1.0,sq3);
  vec2 slope2 = vec2(-1.0,sq3);

  float top = point.y/ratio;
  float left = distToLine(slope1,y0,point)/ratio;
  float right = distToLine(slope2,y0,point)/ratio;

  return top*color + left*white + right*black;
}

void main() {
  float sq3 = 1.732050807568877;
  float ratio = sq3/2.0;

  vec2 slope1 = vec2(1.0,sq3);
  vec2 slope2 = vec2(-1.0,sq3);
  vec2 y0 = vec2(0.0, ratio);

  float xm = u_margin/u_res.x;
  float ym = u_margin/u_res.y;

  float x = (v_pos.x/(1.0-2.0*xm))/2.0;
  float y = (((1.0 - v_pos.y)/2.0) - ym)/(1.0-2.0*ym)*ratio;
  
  vec2 point = vec2(x, y);

   if (y < 0.0){
    point = mapToLine(vec2(1,0),vec2(0,0),point);
   } else if (y > (x + .5)*sq3 && y > (.5 - x)*sq3) {
     // above both sides of triangle.
     // max this out at the color so we don't get channel overflow.
     gl_FragColor = vec4(u_color,1);
     return;
   } else if (y > (x + .5)*sq3) {
    point = mapToLine(slope1,y0,point);
   } else if (y > (.5 - x)*sq3) {
    point = mapToLine(slope2,y0,point);
   }

  gl_FragColor = vec4(
    tri(point, u_color),
    1.0
  );
   

   	// if (y < sq3*x && y < (x-u_side)*-sq3 && y > 0.0){
    //   gl_FragColor = vec4(top*u_color + left*white + right*black, 1.0);
    // } else if (y <= 0.0) {
    //   gl_FragColor = vec4(1,0,0,1);
 	  //   // gl_FragColor = vec4(x/u_side*white + (1.0-x/u_side)*black, 1.0);
    // } else if (x > u_side/2.0 && y > 0.0){
    //   gl_FragColor = vec4(1,0,0,1);
    //   // float w = min((-(x-u_side)/2.0 + ratio*y)/u_side,1.0);
    //   // gl_FragColor = vec4((1.0-w)*white + w*u_color, 1.0);
    // } else {
    //   gl_FragColor = vec4(1,0,0,1);
    //   // float w = min((x/2.0 + ratio*y)/u_side, 1.0);
    //   // gl_FragColor = vec4((1.0-w)*black + w*u_color, 1);
    // }
}

