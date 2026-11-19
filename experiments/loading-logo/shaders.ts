export const CRYSTAL_VERTEX = `#version 300 es
precision highp float;
layout(location=2) in vec4 aParticle;
out vec2 vCoord;
out float vDepth;
uniform float uTime;
uniform float uMotion;
void main() {
  int corner = gl_VertexID % 6;
  vec2 p = vec2(1.0, 1.0);
  if (corner == 0) p = vec2(-1.0, -1.0);
  else if (corner == 1 || corner == 4) p = vec2(1.0, -1.0);
  else if (corner == 2 || corner == 3) p = vec2(-1.0, 1.0);
  float drift = uTime * 0.7;
  vec2 flow = uMotion * vec2(sin(aParticle.y * 16.0 + drift), cos(aParticle.x * 14.0 - drift * 0.85)) * 0.007;
  vec2 center = (aParticle.xy + flow - 0.5) * vec2(1.44, -1.44);
  vec2 extent = p * aParticle.w * 1.85 * vec2(1.44, 1.44);
  vCoord = p;
  vDepth = aParticle.z;
  gl_Position = vec4(center + extent, 0.0, 1.0);
}
`;

export const CRYSTAL_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vCoord;
in float vDepth;
out vec4 outColor;
void main() {
  float radius = length(vCoord);
  if (radius > 1.0) discard;
  float body = exp(-radius * radius * 1.35);
  float shade = 0.64 + 0.36 * vDepth;
  outColor = vec4(vec3(shade * body), 1.0);
}
`;

export const SCREEN_VERTEX = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));
  vUv=p;
  gl_Position=vec4(p*2.0-1.0,0.0,1.0);
}
`;

export const EXTRACT_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
out vec4 outColor;
void main() {
  vec3 c=texture(uScene,vUv).rgb;
  float luminance=dot(c,vec3(0.2126,0.7152,0.0722));
  outColor=vec4(c*smoothstep(0.22,0.7,luminance),1.0);
}
`;

export const BLUR_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uInput;
uniform vec2 uStep;
out vec4 outColor;
void main() {
  vec3 c=texture(uInput,vUv).rgb*0.227027;
  c+=(texture(uInput,vUv+uStep).rgb+texture(uInput,vUv-uStep).rgb)*0.1945946;
  c+=(texture(uInput,vUv+uStep*2.0).rgb+texture(uInput,vUv-uStep*2.0).rgb)*0.1216216;
  c+=(texture(uInput,vUv+uStep*3.0).rgb+texture(uInput,vUv-uStep*3.0).rgb)*0.054054;
  c+=(texture(uInput,vUv+uStep*4.0).rgb+texture(uInput,vUv-uStep*4.0).rgb)*0.016216;
  outColor=vec4(c,1.0);
}
`;

export const COMPOSITE_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uTime;
uniform float uMotion;
out vec4 outColor;
void main() {
  vec3 scene=texture(uScene,vUv).rgb;
  vec3 bloom=texture(uBloom,vUv).rgb;
  vec3 background=vec3(16.0/255.0);
  float travel=fract(vUv.x*0.85+vUv.y*0.55-uTime*0.16);
  float band=uMotion*exp(-pow(travel-0.5,2.0)*48.0);
  float body=smoothstep(0.18,0.42,max(scene.r,max(scene.g,scene.b)));
  vec3 lit=min(vec3(1.0),background+scene);
  vec3 core=min(vec3(1.0),lit*0.94+band*0.18);
  vec3 glow=background+bloom*(0.95+band*0.25);
  outColor=vec4(mix(glow,core,body),1.0);
}
`;
