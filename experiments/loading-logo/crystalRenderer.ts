import { LOGO_DOTS } from '../../loadingOverlay/assets/logoDots.generated';
import type { PreviewRenderer } from './previewRuntime';
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
    const sceneUniforms = { time: location(sceneProgram, 'uTime'), motion: location(sceneProgram, 'uMotion'), pointer: location(sceneProgram, 'uPointer') };
    const extractScene = location(extractProgram, 'uScene');
    const blurInput = location(blurProgram, 'uInput');
    const blurStep = location(blurProgram, 'uStep');
    const compositeScene = location(compositeProgram, 'uScene');
    const compositeBloom = location(compositeProgram, 'uBloom');
    const meshArray = required(gl.createVertexArray(), 'mesh array'); arrays.push(meshArray);
    const screenArray = required(gl.createVertexArray(), 'screen array'); arrays.push(screenArray);
    gl.bindVertexArray(meshArray);
    const top = [0, 0, 1], bottom = [0, 0, -1];
    const ring = [[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]];
    const vertices: number[] = [];
    for (let i = 0; i < 4; i++) {
      const a = ring[i], b = ring[(i + 1) % 4];
      for (const apex of [top, bottom]) {
        const nx = a[0] + b[0], ny = a[1] + b[1], nz = apex[2];
        const length = Math.hypot(nx, ny, nz);
        for (const vertex of [apex, a, b]) vertices.push(...vertex, nx / length, ny / length, nz / length);
      }
    }
    const vertexBuffer = required(gl.createBuffer(), 'mesh buffer'); buffers.push(vertexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
    const particles = new Float32Array(LOGO_DOTS.length * 4);
    LOGO_DOTS.forEach(([x, y], i) => {
      particles.set([x, y, ((i * 0.61803398875) % 1) * Math.PI * 2, 0.9 + ((i * 0.754877666) % 1) * 0.2], i * 4);
    });
    const instanceBuffer = required(gl.createBuffer(), 'instance buffer'); buffers.push(instanceBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particles, gl.STATIC_DRAW);
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
    const bindTexture = (texture: WebGLTexture, unit: number, uniform: WebGLUniformLocation) => {
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, texture); gl.uniform1i(uniform, unit);
    };
    const pass = (framebuffer: WebGLFramebuffer | null, width: number, height: number, program: WebGLProgram) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer); gl.viewport(0, 0, width, height); gl.useProgram(program); gl.bindVertexArray(screenArray);
    };
    return {
      resize(width, height) {
        resizeTarget(scene, width, height);
        resizeTarget(bright, Math.max(1, Math.ceil(width / 2)), Math.max(1, Math.ceil(height / 2)));
        resizeTarget(blurred, bright.width, bright.height);
      },
      draw(time, pointer, motion) {
        if (disposed || gl.isContextLost()) throw new Error('WebGL context unavailable. Replay retries.');
        gl.bindFramebuffer(gl.FRAMEBUFFER, scene.framebuffer); gl.viewport(0, 0, scene.width, scene.height);
        gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL); gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(sceneProgram); gl.bindVertexArray(meshArray);
        gl.uniform1f(sceneUniforms.time, time); gl.uniform1f(sceneUniforms.motion, motion ? 1 : 0); gl.uniform2f(sceneUniforms.pointer, pointer[0], pointer[1]);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, 24, LOGO_DOTS.length);
        gl.disable(gl.DEPTH_TEST);
        pass(bright.framebuffer, bright.width, bright.height, extractProgram); bindTexture(scene.texture, 0, extractScene); gl.drawArrays(gl.TRIANGLES, 0, 3);
        pass(blurred.framebuffer, bright.width, bright.height, blurProgram); bindTexture(bright.texture, 0, blurInput); gl.uniform2f(blurStep, 0.65 / bright.width, 0); gl.drawArrays(gl.TRIANGLES, 0, 3);
        pass(bright.framebuffer, bright.width, bright.height, blurProgram); bindTexture(blurred.texture, 0, blurInput); gl.uniform2f(blurStep, 0, 0.65 / bright.height); gl.drawArrays(gl.TRIANGLES, 0, 3);
        pass(null, scene.width, scene.height, compositeProgram); bindTexture(scene.texture, 0, compositeScene); bindTexture(bright.texture, 1, compositeBloom); gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
      dispose,
    };
  } catch (error: unknown) { dispose(); throw error; }
}
