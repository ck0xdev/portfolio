import { useEffect, useRef } from 'react';

/**
 * Full-screen WebGL background shader.
 *
 * Renders an animated particle field with mouse-reactive parallax.
 * Gracefully degrades if WebGL is unavailable (renders nothing).
 */
const BackgroundShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;

    // --- Canvas sizing ---
    function syncSize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    window.addEventListener('resize', syncSize);
    syncSize();

    // --- WebGL context ---
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      if (import.meta.env.DEV) {
        console.warn('[BackgroundShader] WebGL is not supported on this device.');
      }
      return;
    }

    // --- Shader sources ---
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }`;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 mouse = (u_mouse.xy / u_resolution.xy) * 2.0 - 1.0;
        vec3 color = vec3(0.02, 0.02, 0.03);
        for(float i = 0.0; i < 40.0; i++) {
          float h = hash(vec2(i, 123.45));
          vec2 p = vec2(
            sin(u_time * 0.1 + h * 6.28),
            cos(u_time * 0.15 + h * 6.28)
          ) * (1.5 + h);
          p += mouse * 0.2 * h;
          float d = length(uv - p);
          float brightness = 0.002 / (d * d + 0.01);
          brightness *= 0.5 + 0.5 * sin(u_time + h * 10.0);
          vec3 col = mix(vec3(0.0, 0.95, 1.0), vec3(0.56, 0.0, 1.0), h);
          color += col * brightness;
        }
        color *= 0.9 + 0.1 * sin(gl_FragCoord.y * 2.0 + u_time * 5.0);
        gl_FragColor = vec4(color, 1.0);
      }`;

    // --- Compile a shader with error checking ---
    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        if (import.meta.env.DEV) {
          console.error('[BackgroundShader] Shader compilation error:', gl.getShaderInfoLog(shader));
        }
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // --- Link program ---
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (import.meta.env.DEV) {
        console.error('[BackgroundShader] Program link error:', gl.getProgramInfoLog(program));
      }
      return;
    }

    gl.useProgram(program);

    // --- Geometry (fullscreen quad) ---
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

    // --- Uniforms ---
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = canvas.height - event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Render loop ---
    function render(t) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render(0);

    // --- Cleanup: release all WebGL resources ---
    return () => {
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default BackgroundShader;
