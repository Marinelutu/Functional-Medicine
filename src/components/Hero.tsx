import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const goals = [
  { label: "Energy" },
  { label: "Weight" },
  { label: "Hormones" },
  { label: "Clarity" },
  { label: "Longevity" },
  { label: "Gut Health" },
];

/* ─── Botanical Particle System ─── */

function createLeafGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Teardrop / oval leaf silhouette
  shape.moveTo(0, -0.09);
  shape.bezierCurveTo(0.045, -0.06, 0.04, 0.06, 0, 0.09);
  shape.bezierCurveTo(-0.04, 0.06, -0.045, -0.06, 0, -0.09);

  const geom = new THREE.ShapeGeometry(shape, 12);
  return geom;
}

interface Particle {
  mesh: THREE.Mesh;
  speed: number;
  sineFreq: number;
  sineAmp: number;
  baseX: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  phase: number;
}

function initParticles(
  scene: THREE.Scene,
  count: number,
  isMobile: boolean
): { particles: Particle[]; materials: THREE.MeshBasicMaterial[] } {
  const leafGeom = createLeafGeometry();
  const sageMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#2D4A3E"),
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const goldMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#C9A84C"),
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mobileSpeedFactor = isMobile ? 0.6 : 1;
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const isSage = i < Math.round(count * 0.67);
    const mat = isSage ? sageMat : goldMat;
    const mesh = new THREE.Mesh(leafGeom, mat);

    // Random scale variation
    const scale = 0.6 + Math.random() * 0.8;
    mesh.scale.set(scale, scale, scale);

    const baseX = (Math.random() - 0.5) * 2.4;
    const startY = -1.5 - Math.random() * 1.5;
    mesh.position.set(baseX, startY, (Math.random() - 0.5) * 0.5);
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    scene.add(mesh);

    particles.push({
      mesh,
      speed: (0.0003 + Math.random() * 0.0005) * mobileSpeedFactor,
      sineFreq: 0.5 + Math.random() * 1.5,
      sineAmp: 0.15,
      baseX,
      rotSpeedX: (0.001 + Math.random() * 0.003) * mobileSpeedFactor,
      rotSpeedY: (0.001 + Math.random() * 0.003) * mobileSpeedFactor,
      rotSpeedZ: (0.001 + Math.random() * 0.003) * mobileSpeedFactor,
      phase: Math.random() * Math.PI * 2,
    });
  }

  return { particles, materials: [sageMat, goldMat] };
}

const Hero = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const toggleGoal = (label: string) => {
    setSelectedGoals((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 18;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      rect.width / rect.height,
      0.1,
      100
    );
    camera.position.z = 2;

    // Create particles
    const { particles, materials } = initParticles(
      scene,
      particleCount,
      isMobile
    );

    // Animation
    let animationId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const now = performance.now();
      // Cap delta to prevent large jumps (e.g. tab was hidden)
      const delta = Math.min(now - lastTime, 33.33); // cap at ~30fps equivalent
      lastTime = now;

      const timeFactor = delta / 16.67; // normalize to ~60fps

      for (const p of particles) {
        p.mesh.position.y += p.speed * timeFactor;
        p.phase += 0.01 * timeFactor;
        p.mesh.position.x =
          p.baseX + Math.sin(p.phase * p.sineFreq) * p.sineAmp;

        p.mesh.rotation.x += p.rotSpeedX * timeFactor;
        p.mesh.rotation.y += p.rotSpeedY * timeFactor;
        p.mesh.rotation.z += p.rotSpeedZ * timeFactor;

        // Reset when exiting top
        if (p.mesh.position.y > 1.8) {
          p.mesh.position.y = -1.5 - Math.random() * 0.5;
          p.baseX = (Math.random() - 0.5) * 2.4;
          p.mesh.position.x = p.baseX;
          p.phase = Math.random() * Math.PI * 2;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const r = container.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      materials.forEach((m) => m.dispose());
      particles.forEach((p) => p.mesh.geometry.dispose());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Left Panel */}
      <div className="hero-left-panel" ref={leftPanelRef}>
        {/* Three.js canvas container */}
        <div className="hero-particles-canvas" ref={canvasContainerRef} />

        {/* Content (above particles) */}
        <div className="hero-left-content">
          <div className="hero-brand-block">
            <h2 className="hero-wordmark">VELARA</h2>
            <p className="hero-subtitle">Functional Medicine, Reimagined</p>
          </div>

          <div className="hero-headline-block">
            <h1 className="hero-headline">
              You've tried everything.{" "}
              <span className="hero-headline-accent">
                You still don't feel like yourself.
              </span>
            </h1>
            <p className="hero-description">
              VELARA combines advanced diagnostics with personalized protocols to
              help you reclaim the energy, clarity, and vitality you deserve.
            </p>
          </div>

          {/* Goal tiles */}
          <div className="hero-goals">
            <p className="hero-goals-label">What's your #1 goal?</p>
            <div className="hero-goals-grid">
              {goals.map((g) => (
                <button
                  key={g.label}
                  onClick={() => toggleGoal(g.label)}
                  className={`hero-goal-tile ${selectedGoals.includes(g.label)
                      ? "hero-goal-tile--active"
                      : ""
                    }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <a href="/book" className="hero-cta-primary">
              Start Free Assessment
            </a>
            <a href="/services" className="hero-cta-secondary">
              Explore Services
            </a>
          </div>

          {/* Trust bar */}
          <div className="hero-trust-bar">
            <p className="hero-trust-text">4,200+ lives transformed</p>
            <div className="hero-trust-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="hero-star">
                  ★
                </span>
              ))}
              <span className="hero-rating-label">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — hero image */}
      <div className="hero-right-panel">
        <div className="hero-image-gradient" />
        <img
          src="/images/hero_image_1772491701279.png"
          alt="Real person in natural wellness setting"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
