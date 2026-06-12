import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStorm(canvas: HTMLCanvasElement): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    canvas.style.background = 'radial-gradient(ellipse at 50% 40%, #1a0306, #0A0A0A 70%)';
    return () => {};
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0A0A0A, 0.0023);

  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const RED = 0xE8001C;
  const DRED = 0x7d000f;
  const WHT = 0xF4F1EA;

  /* shards: irregular triangle geometries */
  const shards: THREE.Mesh[] = [];
  const shardCount = window.innerWidth < 860 ? 36 : 64;

  function makeShardGeo(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    const s = 3 + Math.random() * 9;
    const verts = new Float32Array([
      0, s * (0.8 + Math.random() * 0.6), 0,
      -s * (0.5 + Math.random() * 0.5), -s * 0.5, 0,
      s * (0.5 + Math.random() * 0.5), -s * (0.3 + Math.random() * 0.5), 0
    ]);
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    g.computeVertexNormals();
    return g;
  }

  const materialsToDispose: THREE.Material[] = [];
  const geometriesToDispose: THREE.BufferGeometry[] = [];

  for (let i = 0; i < shardCount; i++) {
    const r = Math.random();
    const mat = new THREE.MeshBasicMaterial({
      color: r < 0.72 ? RED : (r < 0.9 ? DRED : WHT),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: r < 0.9 ? 0.92 : 0.85
    });
    materialsToDispose.push(mat);

    const geo = makeShardGeo();
    geometriesToDispose.push(geo);

    const m = new THREE.Mesh(geo, mat);

    // distribute in ring to leave center clear for text
    const ang = Math.random() * Math.PI * 2;
    const rad = 55 + Math.random() * 120;
    m.position.set(Math.cos(ang) * rad, (Math.random() - 0.5) * 110, -40 - Math.random() * 180);
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

    m.userData = {
      baseX: m.position.x,
      baseY: m.position.y,
      spinX: (Math.random() - 0.5) * 0.02,
      spinY: (Math.random() - 0.5) * 0.02,
      spinZ: (Math.random() - 0.5) * 0.03,
      bobAmp: 4 + Math.random() * 10,
      bobSpd: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      drift: 0.08 + Math.random() * 0.25
    };

    scene.add(m);
    shards.push(m);
  }

  /* rising embers points */
  function makeSprite(): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, 'rgba(255,80,90,1)');
      g.addColorStop(0.4, 'rgba(232,0,28,0.5)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(c);
    return texture;
  }

  const pN = window.innerWidth < 860 ? 220 : 420;
  const pGeo = new THREE.BufferGeometry();
  geometriesToDispose.push(pGeo);

  const pPos = new Float32Array(pN * 3);
  const pSpd = new Float32Array(pN);

  for (let i = 0; i < pN; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 420;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 260;
    pPos[i * 3 + 2] = -30 - Math.random() * 200;
    pSpd[i] = 0.12 + Math.random() * 0.3;
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

  const spriteTexture = makeSprite();
  const pMat = new THREE.PointsMaterial({
    size: 2.6,
    map: spriteTexture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xff2238
  });
  materialsToDispose.push(pMat);

  const embers = new THREE.Points(pGeo, pMat);
  scene.add(embers);

  /* Mouse Parallax + Scroll acceleration */
  let mx = 0, my = 0, tx = 0, ty = 0, stormBoost = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  const trigger = ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      stormBoost = self.progress;
    }
  });

  let heroVisible = true;
  let rafId: number | null = null;
  let elapsed = 0;
  const clock = new THREE.Clock();

  function tick() {
    rafId = null;
    if (!heroVisible) return;

    const dt = Math.min(clock.getDelta() || 0.016, 0.05);
    elapsed += dt;
    const t = elapsed;
    const boost = 1 + stormBoost * 3;

    tx += (mx - tx) * 0.05;
    ty += (my - ty) * 0.05;
    camera.position.x = tx * 26;
    camera.position.y = -ty * 18;
    camera.lookAt(0, 0, -60);

    shards.forEach((s) => {
      const u = s.userData;
      s.rotation.x += u.spinX * boost;
      s.rotation.y += u.spinY * boost;
      s.rotation.z += u.spinZ * boost;
      s.position.y = u.baseY + Math.sin(t * u.bobSpd + u.phase) * u.bobAmp;
      s.position.x = u.baseX + Math.cos(t * u.bobSpd * 0.7 + u.phase) * u.bobAmp * 0.5;
    });

    const p = embers.geometry.attributes.position as THREE.BufferAttribute;
    const array = p.array as Float32Array;
    for (let i = 0; i < pN; i++) {
      array[i * 3 + 1] += pSpd[i] * boost; // embers rise
      array[i * 3] += Math.sin(t + i) * 0.02;
      if (array[i * 3 + 1] > 140) array[i * 3 + 1] = -140;
    }
    p.needsUpdate = true;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }

  // IntersectionObserver to pause rendering when hero is off-screen
  const observer = new IntersectionObserver((entries) => {
    heroVisible = entries[0].isIntersecting;
    if (heroVisible && !rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });

  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }

  rafId = requestAnimationFrame(tick);

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);

  // Return complete cleanup function for React
  return () => {
    heroVisible = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    observer.disconnect();
    trigger.kill();

    // Clean up ThreeJS resources
    geometriesToDispose.forEach((g) => g.dispose());
    materialsToDispose.forEach((m) => m.dispose());
    spriteTexture.dispose();
    renderer.dispose();
  };
}
