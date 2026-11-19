import { LOGO_DOTS } from '../../loadingOverlay/assets/logoDots.generated';
import { placeParticles, type PreviewRenderer } from './previewRuntime';
import { CRYSTAL_VERTEX, CRYSTAL_FRAGMENT, SCREEN_VERTEX, EXTRACT_FRAGMENT, BLUR_FRAGMENT, COMPOSITE_FRAGMENT } from './shaders';

function required<T>(value: T | null, name: string): T {
  if (value === null) throw new Error(`WebGL allocation failed: ${name}`);
  return value;
}

export function createCrystalRenderer(canvas: HTMLCanvasElement): PreviewRenderer {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: true, powerPreference: 'low-power', preserveDrawingBuffer: false });
  if (!gl) throw new Error('WebGL2 unavailable. Showing Canvas2D.');
  const buffers: WebGLBuffer[] = [];
  const arrays: WebGLVertexArrayObject[] = [];
  const textures: WebGLTexture[] = [];
  const framebuffers: WebGLFramebuffer[] = [];
  const depthBuffers: WebGLRenderbuffer[] = [];
  const programs: WebGLProgram[] = [];
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    for (const p of programs) gl.deleteProgram(p);
    for (const b of buffers) gl.deleteBuffer(b);
    for (const v of arrays) gl.deleteVertexArray(v);
    for (const t of textures) gl.deleteTexture(t);
    for (const f of framebuffers) gl.deleteFramebuffer(f);
    for (const d of depthBuffers) gl.deleteRenderbuffer(d);
  };
  const makeProgram = (vertex: string, fragment: string) => {
    const program = required(gl.createProgram(), 'program');
    programs.push(program);
    const shaders: WebGLShader[] = [];
    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]] satisfies [number, string][]) {
        const shader = required(gl.createShader(type), 'shader');
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || 'Shader compile failed');
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Shader link failed');
      return program;
    } finally { for (const s of shaders) gl.deleteShader(s); }
  };
  const location = (program: WebGLProgram, name: string) => required(gl.getUniformLocation(program, name), name);
  try {
    const sceneProgram = makeProgram(CRYSTAL_VERTEX, CRYSTAL_FRAGMENT);
    const extractProgram = makeProgram(SCREEN_VERTEX, EXTRACT_FRAGMENT);
    const blurProgram = makeProgram(SCREEN_VERTEX, BLUR_FRAGMENT);
    const compositeProgram = makeProgram(SCREEN_VERTEX, COMPOSITE_FRAGMENT);
    const extractScene = location(extractProgram, 'uScene');
    const blurInput = location(blurProgram, 'uInput');
    const blurStep = location(blurProgram, 'uStep');
    const compositeScene = location(compositeProgram, 'uScene');
    const compositeBloom = location(compositeProgram, 'uBloom');
    const compositeTime = location(compositeProgram, 'uTime');
    const compositeMotion = location(compositeProgram, 'uMotion');
    const sceneTime = location(sceneProgram, 'uTime');
    const sceneMotion = location(sceneProgram, 'uMotion');
    const screenArray = required(gl.createVertexArray(), 'screen array'); arrays.push(screenArray);
    const billboardArray = required(gl.createVertexArray(), 'billboard array'); arrays.push(billboardArray);
    const unit = (index: number, salt: number) => {
      const n = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    const homes = LOGO_DOTS;
    const count = homes.length;
    const particles = new Float32Array(count * 4);
    homes.forEach(([x, y], i) => {
      const depth = unit(i, 11);
      const size = 0.0066 + depth * 0.0024;
      particles.set([x, y, depth, size], i * 4);
    });
    const instanceBuffer = required(gl.createBuffer(), 'instance buffer'); buffers.push(instanceBuffer);
    gl.bindVertexArray(billboardArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particles, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 16, 0); gl.vertexAttribDivisor(2, 1);
    const target = (withDepth: boolean) => {
      const texture = required(gl.createTexture(), 'color texture'); textures.push(texture);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const framebuffer = required(gl.createFramebuffer(), 'framebuffer'); framebuffers.push(framebuffer);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const depth = withDepth ? required(gl.createRenderbuffer(), 'depth buffer') : null;
      if (depth) { depthBuffers.push(depth); gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depth); }
      return { texture, framebuffer, depth, width: 0, height: 0 };
    };
    const scene = target(true), bright = target(false), blurred = target(false);
    const resizeTarget = (t: ReturnType<typeof target>, width: number, height: number) => {
      if (width === t.width && height === t.height) return;
      t.width = width; t.height = height;
      gl.bindTexture(gl.TEXTURE_2D, t.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      if (t.depth) { gl.bindRenderbuffer(gl.RENDERBUFFER, t.depth); gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height); }
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.framebuffer);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('Incomplete WebGL framebuffer');
    };
    const dotX = Float32Array.from(homes, (dot) => dot[0]);
    const dotY = Float32Array.from(homes, (dot) => dot[1]);
    const dotSpeed = Float32Array.from({ length: count }, (_, i) => 0.8 + unit(i, 12) * 0.4);
    const formed = new Float32Array(count);
    const baseScale = Float32Array.from({ length: count }, (_, i) => particles[i * 4 + 3]);
    let previous = 0;
    const bindTexture = (texture: WebGLTexture, unit: number, uniform: WebGLUniformLocation) => {
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texture); gl.uniform1i(uniform, unit);
    };
    const pass = (framebuffer: WebGLFramebuffer | null, width: number, height: number, program: WebGLProgram) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); gl.viewport(0, 0, width, height); gl.useProgram(program); gl.bindVertexArray(screenArray);
    };
    return {
      resize(width, height) {
        resizeTarget(scene, width, height);
        resizeTarget(bright, width, height);
        resizeTarget(blurred, bright.width, bright.height);
      },
      draw(time, pointer, motion) {
        if (disposed || gl.isContextLost()) throw new Error('WebGL context unavailable. Replay retries.');
        const dt = previous ? Math.min(Math.max(time - previous, 0), 0.1) : 1 / 60;
        previous = time;
        placeParticles(homes, dotX, dotY, dotSpeed, formed, pointer, motion, time, dt);
        for (let i = 0; i < count; i++) {
          particles[i * 4] = dotX[i];
          particles[i * 4 + 1] = dotY[i];
          particles[i * 4 + 3] = baseScale[i] * (0.45 + 0.55 * formed[i]);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, particles);
        gl.bindFramebuffer(gl.FRAMEBUFFER, scene.framebuffer); gl.viewport(0, 0, scene.width, scene.height);
        gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
        gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(sceneProgram); gl.bindVertexArray(billboardArray);
        gl.uniform1f(sceneTime, time); gl.uniform1f(sceneMotion, motion ? 1 : 0);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, count);
        gl.disable(gl.BLEND);
        pass(bright.framebuffer, bright.width, bright.height, extractProgram); bindTexture(scene.texture, 0, extractScene); gl.drawArrays(gl.TRIANGLES, 0, 3);
        const glow = 5.2;
        pass(blurred.framebuffer, bright.width, bright.height, blurProgram); bindTexture(bright.texture, 0, blurInput); gl.uniform2f(blurStep, glow / bright.width, 0); gl.drawArrays(gl.TRIANGLES, 0, 3);
        pass(bright.framebuffer, bright.width, bright.height, blurProgram); bindTexture(blurred.texture, 0, blurInput); gl.uniform2f(blurStep, 0, glow / bright.height); gl.drawArrays(gl.TRIANGLES, 0, 3);
        pass(null, scene.width, scene.height, compositeProgram); bindTexture(scene.texture, 0, compositeScene); bindTexture(bright.texture, 1, compositeBloom); gl.uniform1f(compositeTime, time); gl.uniform1f(compositeMotion, motion ? 1 : 0); gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
      dispose,
    };
  } catch (error: unknown) { dispose(); throw error; }
}
