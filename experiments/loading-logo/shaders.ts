export const CRYSTAL_VERTEX = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aParticle;
uniform float uTime;
uniform float uMotion;
out vec3 vNormal;
mat3 rotateX(float a) { float c=cos(a), s=sin(a); return mat3(1,0,0, 0,c,s, 0,-s,c); }
mat3 rotateY(float a) { float c=cos(a), s=sin(a); return mat3(c,0,-s, 0,1,0, s,0,c); }
mat3 rotateZ(float a) { float c=cos(a), s=sin(a); return mat3(c,s,0, -s,c,0, 0,0,1); }
void main() {
  float phase=aParticle.z;
  float t=uTime*0.32;
  mat3 rotation=rotateZ(phase)*rotateY(0.30+uMotion*0.12*sin(t+phase))*rotateX(0.28+uMotion*0.10*cos(t*0.83+phase));
  vec2 drift=uMotion*0.0007*vec2(sin(t+phase),cos(t*0.79+phase*1.7));
  vec2 center=(aParticle.xy+drift-0.5)*vec2(1.68,-1.68);
  vec3 vertex=rotation*aPosition;
  vNormal=rotation*aNormal;
  gl_Position=vec4(center+vertex.xy*(0.014*aParticle.w),-vertex.z*0.02,1.0);
}
`;

export const CRYSTAL_FRAGMENT = `#version 300 es
precision highp float;
in vec3 vNormal;
uniform vec2 uPointer;
out vec4 outColor;
void main() {
  vec3 n=normalize(vNormal);
  vec3 light=normalize(vec3(-0.55+uPointer.x*0.35,0.75-uPointer.y*0.35,1.35));
  vec3 fill=normalize(vec3(0.6,-0.4,0.8));
  float diffuse=0.20+0.58*max(dot(n,light),0.0)+0.15*max(dot(n,fill),0.0);
  vec3 halfway=normalize(light+vec3(0,0,1));
  float specular=0.82*pow(max(dot(n,halfway),0.0),28.0);
  outColor=vec4(vec3(diffuse+specular),1.0);
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
  outColor=vec4(c*smoothstep(0.68,0.96,luminance),1.0);
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
out vec4 outColor;
void main() {
  vec3 scene=texture(uScene,vUv).rgb;
  vec3 bloom=texture(uBloom,vUv).rgb;
  vec3 background=vec3(16.0/255.0);
  outColor=vec4(min(vec3(1.0),background+scene*(1.0-background)+bloom*0.14),1.0);
}
`;
