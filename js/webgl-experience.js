/**
 * LUSION-INSPIRED 3D WEBGL EXPERIENCE (Three.js & GLSL)
 * Organic fluid morphing entity, volumetric lighting, particle atmosphere,
 * real-time pointer physics, and scroll-linked spatial choreography.
 */

(function () {
  'use strict';

  // Wait for THREE to be defined
  function initWebGL() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded yet, retrying...');
      setTimeout(initWebGL, 100);
      return;
    }

    const container = document.getElementById('webgl-container');
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.id = 'webgl-canvas';
    container.appendChild(renderer.domElement);

    // --- GLSL Simplex Noise Shader Definition ---
    const noiseGLSL = `
      // Simplex 3D noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }
    `;

    // --- Custom Morphing Shader Material ---
    const customUniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.7 },
      uNoiseDensity: { value: 0.9 },
      uNoiseStrength: { value: 0.42 },
      uMouseStrength: { value: 0.0 },
      uColorPlum: { value: new THREE.Color(0x100D14) },
      uColorPurple: { value: new THREE.Color(0x5425D8) },
      uColorViolet: { value: new THREE.Color(0xB52DFF) },
      uColorMagenta: { value: new THREE.Color(0xF044C5) },
      uPresetMode: { value: 0 } // 0: Liquid Chrome, 1: Electric Violet, 2: Glass, 3: Cyber Wire
    };

    const vertexShader = `
      ${noiseGLSL}
      uniform float uTime;
      uniform float uSpeed;
      uniform float uNoiseDensity;
      uniform float uNoiseStrength;
      uniform float uMouseStrength;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        // Calculate dynamic organic wave
        float t = uTime * uSpeed;
        float displacement = snoise(position * uNoiseDensity + vec3(t * 0.4)) * (uNoiseStrength + uMouseStrength * 0.5);
        vDisplacement = displacement;

        vec3 newPosition = position + normal * displacement;
        vPosition = newPosition;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorPlum;
      uniform vec3 uColorPurple;
      uniform vec3 uColorViolet;
      uniform vec3 uColorMagenta;
      uniform int uPresetMode;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      varying vec2 vUv;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = vec3(0.0, 0.0, 1.0);

        // Fresnel calculation for rim glow
        float fresnel = dot(viewDir, normal);
        fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
        float rim = pow(fresnel, 2.5);

        vec3 finalColor = uColorPlum;

        if (uPresetMode == 0) {
          // LIQUID CHROME (Signature Lusion Metallic)
          vec3 baseChrome = mix(vec3(0.12, 0.1, 0.16), vec3(0.9, 0.88, 0.95), normal.y * 0.5 + 0.5);
          vec3 violetRim = mix(uColorPurple, uColorMagenta, vDisplacement * 2.0 + 0.5);
          finalColor = mix(baseChrome, violetRim, rim * 1.4);
          finalColor += uColorViolet * pow(rim, 4.0) * 0.8;
        } else if (uPresetMode == 1) {
          // ELECTRIC VIOLET (Brand Core Neon)
          finalColor = mix(uColorPurple, uColorViolet, normal.x * 0.5 + 0.5);
          finalColor = mix(finalColor, uColorMagenta, rim);
          finalColor += vec3(0.8, 0.6, 1.0) * pow(rim, 3.0);
        } else if (uPresetMode == 2) {
          // OBSIDIAN DEEP GLASS
          finalColor = mix(vec3(0.04, 0.03, 0.06), uColorPurple * 0.4, rim);
          finalColor += uColorMagenta * pow(rim, 2.0) * 0.7;
        } else {
          // CYBER MATRIX
          float grid = step(0.92, fract(vUv.x * 32.0)) + step(0.92, fract(vUv.y * 32.0));
          finalColor = mix(uColorPlum, uColorViolet, grid);
          finalColor += uColorMagenta * rim;
        }

        gl_FragColor = vec4(finalColor, 0.94);
      }
    `;

    const customMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: customUniforms,
      wireframe: false,
      transparent: true
    });

    // --- Main 3D Mesh ---
    const geometry = new THREE.IcosahedronGeometry(2.1, 64);
    const mainMesh = new THREE.Mesh(geometry, customMaterial);
    scene.add(mainMesh);

    // --- Floating Particle Atmosphere ---
    const particleCount = 650;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
      particleScales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xB52DFF,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x100D14, 2);
    scene.add(ambientLight);

    const lightPurple = new THREE.PointLight(0x5425D8, 4, 15);
    lightPurple.position.set(-4, 3, 3);
    scene.add(lightPurple);

    const lightMagenta = new THREE.PointLight(0xF044C5, 4, 15);
    lightMagenta.position.set(4, -3, 3);
    scene.add(lightMagenta);

    // --- Mouse & Touch Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let mouseImpact = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        mainMesh.rotation.y += deltaX * 0.008;
        mainMesh.rotation.x += deltaY * 0.008;
        mouseImpact = Math.min(mouseImpact + 0.08, 0.7);
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      isDragging = true;
      mouseImpact = 0.5;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      if (window.SoundEngine) window.SoundEngine.click();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    // --- Scroll Choreography ---
    let scrollProgress = 0;
    function updateScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }
    window.addEventListener('scroll', updateScroll, { passive: true });

    // --- Resize Handler ---
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      if (window.innerWidth < 768) {
        camera.position.z = 8.5;
      } else {
        camera.position.z = 7;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, { passive: true });
    onResize();

    // --- Preset Switcher Interface ---
    window.setShaderPreset = function (presetIndex) {
      customUniforms.uPresetMode.value = presetIndex;
      if (presetIndex === 3) {
        customMaterial.wireframe = true;
      } else {
        customMaterial.wireframe = false;
      }
      // Temporary impact ripple
      mouseImpact = 0.75;

      document.querySelectorAll('.shader-preset-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === presetIndex);
      });

      if (window.SoundEngine) window.SoundEngine.modeShift();
    };

    // --- Render Loop (Zero Garbage Collection) ---
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Dampen mouse impact ripple
      mouseImpact *= 0.95;

      // Update shader uniforms
      customUniforms.uTime.value = elapsedTime;
      customUniforms.uMouseStrength.value = mouseImpact;

      // Rotate particles slowly
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;

      // Cinematic Scroll-Linked Transformation:
      // Hero (scroll 0 - 0.25): Center, large, breathing
      // Work (scroll 0.25 - 0.55): Shifts to right side behind work cards
      // Services (scroll 0.55 - 0.75): Centers and scales down
      // Contact (scroll 0.75 - 1.0): Scales up and pulses in center
      if (!isDragging) {
        const targetRotY = mouse.x * 0.45 + elapsedTime * 0.15;
        const targetRotX = -mouse.y * 0.45;
        mainMesh.rotation.y += (targetRotY - mainMesh.rotation.y) * 0.05;
        mainMesh.rotation.x += (targetRotX - mainMesh.rotation.x) * 0.05;
      }

      // Responsive positioning based on scroll progress
      let targetPosX = 0;
      let targetPosY = 0;
      let targetScale = 1.0;

      if (window.innerWidth > 992) {
        if (scrollProgress < 0.18) {
          targetPosX = 3.1;
          targetPosY = 0.1;
          targetScale = 0.9;
        } else if (scrollProgress >= 0.18 && scrollProgress < 0.55) {
          targetPosX = -3.0;
          targetPosY = -0.2;
          targetScale = 0.8;
        } else if (scrollProgress >= 0.55 && scrollProgress < 0.8) {
          targetPosX = 3.0;
          targetPosY = 0.2;
          targetScale = 0.85;
        } else {
          targetPosX = 0.0;
          targetPosY = 0.0;
          targetScale = 1.15;
        }
      } else {
        targetPosX = 0;
        targetPosY = 0.6;
        targetScale = 0.65;
      }

      mainMesh.position.x += (targetPosX - mainMesh.position.x) * 0.04;
      mainMesh.position.y += (targetPosY - mainMesh.position.y) * 0.04;
      mainMesh.scale.setScalar(
        mainMesh.scale.x + (targetScale - mainMesh.scale.x) * 0.04
      );

      renderer.render(scene, camera);
    }

    animate();
  }

  // Trigger initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebGL);
  } else {
    initWebGL();
  }
})();
