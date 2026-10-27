"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";


// export default function MagneticFieldBackground() {
//   const mountRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     const currentMount = mountRef.current;
//     if (!currentMount) return;
//
//     // 1. Setup Scene & Camera
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000); // Pitch black
//
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 20;
//
//     // 2. Setup Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     currentMount.appendChild(renderer.domElement);
//
//     // 3. Create the Arrow Geometry and Material
//     const geometry = new THREE.ConeGeometry(0.15, 0.5, 3);
//     geometry.rotateX(Math.PI / 2); // Point along the Z-axis
//
//     const material = new THREE.MeshBasicMaterial({
//       color: 0x555555, // More grey
//       transparent: true,
//       opacity: 0.6,
//     });
//
//     // 4. Generate the Fixed Grid of Arrows
//     const arrows: THREE.Mesh[] = [];
//     const gridSize = 40; // Total rows and columns (oversized to cover ultra-wides)
//     const spacing = 1.2;
//     const offset = (gridSize * spacing) / 2;
//
//     for (let x = 0; x < gridSize; x++) {
//       for (let y = 0; y < gridSize; y++) {
//         const arrow = new THREE.Mesh(geometry, material);
//
//         // Calculate grid position centered on the screen
//         const posX = x * spacing - offset;
//         const posY = y * spacing - offset;
//
//         arrow.position.set(posX, posY, 0);
//
//         scene.add(arrow);
//         arrows.push(arrow);
//       }
//     }
//
//     // 5. Setup Raycasting for Mouse Tracking
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2(0, 0);
//     const target = new THREE.Vector3(0, 0, 0);
//     const projectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
//
//     const onMouseMove = (event: MouseEvent) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//
//     const onTouchMove = (event: TouchEvent) => {
//       if (event.touches.length > 0) {
//         mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
//       }
//     };
//
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("touchmove", onTouchMove, { passive: false });
//
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", onWindowResize);
//
//     // Dummy object used to calculate the smooth rotation targeting
//     const dummyTarget = new THREE.Object3D();
//
//     // 6. Animation Loop
//     let animationFrameId: number;
//
//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);
//
//       // Find exactly where the mouse is in the 3D space
//       raycaster.setFromCamera(mouse, camera);
//       raycaster.ray.intersectPlane(projectionPlane, target);
//
//       // Update all arrows to point at the target
//       for (let i = 0; i < arrows.length; i++) {
//         const arrow = arrows[i];
//
//         // Temporarily point the invisible dummy object at the mouse
//         dummyTarget.position.copy(arrow.position);
//         dummyTarget.lookAt(target);
//
//         // Smoothly interpolate the real arrow's rotation toward the dummy's target rotation (0.1 = speed)
//         arrow.quaternion.slerp(dummyTarget.quaternion, 0.1);
//       }
//
//       renderer.render(scene, camera);
//     };
//
//     animate();
//
//     // 7. Cleanup Function
//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("resize", onWindowResize);
//       cancelAnimationFrame(animationFrameId);
//
//       if (currentMount) {
//         currentMount.removeChild(renderer.domElement);
//       }
//
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//       scene.clear();
//     };
//   }, []);
//
//   return (
//     <div
//       ref={mountRef}
//       className="absolute inset-0 -z-10 h-screen w-full overflow-hidden bg-black"
//     />
//   );
// }





    // export default function ParticleBackground() {
    //   const mountRef = useRef<HTMLDivElement>(null);
    //
    //   useEffect(() => {
    //     const currentMount = mountRef.current;
    //     if (!currentMount) return;
    //
    //     let mouseX = 0;
    //     let mouseY = 0;
    //     let targetX = 0;
    //     let targetY = 0;
    //     let windowHalfX = window.innerWidth / 2;
    //     let windowHalfY = window.innerHeight / 2;
    //
    //     const scene = new THREE.Scene();
    //     scene.fog = new THREE.FogExp2(0x030308, 0.001);
    //
    //     const camera = new THREE.PerspectiveCamera(
    //       75,
    //       window.innerWidth / window.innerHeight,
    //       1,
    //       3000
    //     );
    //     camera.position.z = 1000;
    //
    //     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //     renderer.setClearColor(0x030308, 0);
    //
    //     // 1. Clear any ghost/frozen canvases from React Strict Mode or HMR
    //     currentMount.replaceChildren(renderer.domElement);
    //
    //     const canvas = document.createElement("canvas");
    //     canvas.width = 128;
    //     canvas.height = 128;
    //     const context = canvas.getContext("2d");
    //     if (context) {
    //       const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    //       gradient.addColorStop(0, "rgba(255,255,255,1)");
    //       gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    //       gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
    //       gradient.addColorStop(1, "rgba(0,0,0,0)");
    //       context.fillStyle = gradient;
    //       context.fillRect(0, 0, 128, 128);
    //     }
    //     const texture = new THREE.CanvasTexture(canvas);
    //
    //     const geometry = new THREE.BufferGeometry();
    //     const particleCount = 15000;
    //     const positions = new Float32Array(particleCount * 3);
    //     const colors = new Float32Array(particleCount * 3);
    //
    //     const color1 = new THREE.Color(0x00f0ff);
    //     const color2 = new THREE.Color(0x8a2be2);
    //     const color3 = new THREE.Color(0xff00ff);
    //
    //     for (let i = 0; i < particleCount; i++) {
    //       const t = Math.random() * Math.PI * 2;
    //       const p = Math.random() * Math.PI * 2;
    //       const r = 400 + Math.random() * 200 + Math.sin(t * 4) * 100;
    //
    //       positions[i * 3] = r * Math.cos(t) * Math.cos(p);
    //       positions[i * 3 + 1] = r * Math.sin(t) * Math.cos(p);
    //       positions[i * 3 + 2] = r * Math.sin(p) + Math.sin(t * 3) * 200;
    //
    //       const mixedColor = color1.clone();
    //       const mixRatio = (Math.sin(t) + 1) / 2;
    //
    //       if (Math.random() > 0.5) {
    //         mixedColor.lerp(color2, mixRatio + Math.random() * 0.2);
    //       } else {
    //         mixedColor.lerp(color3, mixRatio + Math.random() * 0.2);
    //       }
    //
    //       colors[i * 3] = mixedColor.r;
    //       colors[i * 3 + 1] = mixedColor.g;
    //       colors[i * 3 + 2] = mixedColor.b;
    //     }
    //
    //     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    //     geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    //
    //     const material = new THREE.PointsMaterial({
    //       size: 8,
    //       map: texture,
    //       vertexColors: true,
    //       blending: THREE.AdditiveBlending,
    //       depthWrite: false,
    //       transparent: true,
    //       opacity: 0.8,
    //     });
    //
    //     const particles = new THREE.Points(geometry, material);
    //     particles.rotation.x = Math.PI / 4;
    //     scene.add(particles);
    //
    //     const onDocumentMouseMove = (event: MouseEvent) => {
    //       mouseX = (event.clientX - windowHalfX) * 0.5;
    //       mouseY = (event.clientY - windowHalfY) * 0.5;
    //     };
    //
    //     const onDocumentTouchMove = (event: TouchEvent) => {
    //       if (event.touches.length === 1) {
    //         mouseX = (event.touches[0].pageX - windowHalfX) * 0.5;
    //         mouseY = (event.touches[0].pageY - windowHalfY) * 0.5;
    //       }
    //     };
    //
    //     document.addEventListener("mousemove", onDocumentMouseMove, false);
    //     document.addEventListener("touchmove", onDocumentTouchMove, false);
    //
    //     const handleResize = () => {
    //       windowHalfX = window.innerWidth / 2;
    //       windowHalfY = window.innerHeight / 2;
    //       camera.aspect = window.innerWidth / window.innerHeight;
    //       camera.updateProjectionMatrix();
    //       renderer.setSize(window.innerWidth, window.innerHeight);
    //     };
    //     window.addEventListener("resize", handleResize);
    //
    //     const clock = new THREE.Clock();
    //     let animationFrameId: number;
    //
    //     const animate = () => {
    //       animationFrameId = requestAnimationFrame(animate);
    //
    //       const delta = clock.getDelta();
    //
    //       // 2. Visible, frame-rate independent rotation
    //       particles.rotation.y += delta * 0.15;
    //       particles.rotation.z += delta * 0.08;
    //
    //       // 3. Smooth, responsive mouse parallax
    //       targetX = mouseX * 0.5;
    //       targetY = mouseY * 0.5;
    //
    //       camera.position.x += (targetX - camera.position.x) * 0.05;
    //       camera.position.y += (-targetY - camera.position.y) * 0.05;
    //       camera.lookAt(scene.position);
    //
    //       renderer.render(scene, camera);
    //     };
    //
    //     animate();
    //
    //     return () => {
    //       window.removeEventListener("resize", handleResize);
    //       document.removeEventListener("mousemove", onDocumentMouseMove);
    //       document.removeEventListener("touchmove", onDocumentTouchMove);
    //
    //       cancelAnimationFrame(animationFrameId);
    //
    //       // Clean up DOM safely
    //       if (currentMount) {
    //         currentMount.replaceChildren();
    //       }
    //
    //       geometry.dispose();
    //       material.dispose();
    //       texture.dispose();
    //       renderer.dispose();
    //       scene.clear();
    //     };
    //   }, []);
    //
    //   return (
    //     <div
    //       ref={mountRef}
    //       className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#030308]"
    //     />
    //   );
    // }



export function BinaryPortalBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Setup Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Changed to pure black to make the orange pop

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Generate the Binary Text Texture
    const createBinaryTexture = () => {
      const canvas = document.createElement("canvas");
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const step = 20;
        for (let x = 0; x < size; x += step) {
          for (let y = 0; y < size; y += step) {
            const chars = "0101010189ABCDEF";
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, x + step / 2, y + step / 2);
          }
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      return texture;
    };

    const textTexture = createBinaryTexture();

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTexture: { value: textTexture },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform float uAspect;
      uniform vec2 uResolution;
      uniform sampler2D uTexture;

      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec2 centered = uv - 0.5;
        centered.x *= uAspect;

        float dist = length(centered);
        float angle = atan(centered.y, centered.x);

        float distortion = sin(angle * 3.0 + uTime) * 0.08
                         + cos(angle * 5.0 - uTime * 1.5) * 0.04
                         + sin(angle * 2.0 + uTime * 0.8) * 0.05;

        float distortedDist = dist + distortion;

        float speed = 0.3;
        float waveTime = fract(uTime * speed);
        float waveRadius = waveTime * 1.5;

        float thickness = 0.08 + (waveTime * 0.08);
        float ring = smoothstep(thickness, 0.0, abs(distortedDist - waveRadius));

        float edgeFade = smoothstep(1.3, 0.6, waveRadius);
        float startFade = smoothstep(0.0, 0.1, waveTime);
        ring *= edgeFade * startFade;

        float borderThickness = 0.015;
        float borderX = smoothstep(0.0, borderThickness, uv.x) * smoothstep(1.0, 1.0 - borderThickness, uv.x);
        float borderY = smoothstep(0.0, borderThickness, uv.y) * smoothstep(1.0, 1.0 - borderThickness, uv.y);
        float border = 1.0 - (borderX * borderY);

        float mask = clamp(ring + border * 0.6, 0.0, 1.0);

        vec2 tileUv = uv * (uResolution / 350.0);
        vec4 texColor = texture2D(uTexture, tileUv);
        float textIntensity = texColor.r;

        // Exact hex color #FF3902 converted to RGB normalized values
        vec3 targetColor = vec3(0.173, 0.298, 0.992);

        // Apply color directly to the text intensity
        vec3 finalColor = targetColor * (textIntensity * 1.5 + 0.2);

        // Apply the requested slight opacity/translucency reduction to the mask
        float maxOpacity = 0.85;

        gl_FragColor = vec4(finalColor * mask, mask * maxOpacity);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      uniforms.uAspect.value = width / height;
      uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      textTexture.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
      <div
          ref={mountRef}
          className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#030308] pointer-events-none"
      />
  );
}
