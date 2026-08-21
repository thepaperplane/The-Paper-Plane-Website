import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { ArrowRight, PhoneCall, Sparkles, Code2, Cpu, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onExploreServices: () => void;
  onContactClick: () => void;
}

export const PaperPlaneHero3D: React.FC<HeroProps> = ({
  onExploreServices,
  onContactClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let handleMouseMove: (event: MouseEvent) => void;
    let handleResize: () => void;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      // Three.js Scene Setup with Deep Liquid Fog
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030712, 0.04);

      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      camera.position.set(0, 1.2, 7.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "default" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Multi-Spectrum Liquid Ambient Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const cyanSpot = new THREE.PointLight(0x06b6d4, 8, 35);
      cyanSpot.position.set(6, 6, 6);
      scene.add(cyanSpot);

      const indigoSpot = new THREE.PointLight(0x6366f1, 9, 35);
      indigoSpot.position.set(-6, -4, 4);
      scene.add(indigoSpot);

      const purpleSpot = new THREE.PointLight(0xa855f7, 6, 30);
      purpleSpot.position.set(0, 8, -4);
      scene.add(purpleSpot);

      // 3D Liquid Glass Paper Plane Group
      const planeGroup = new THREE.Group();

      // Origami Folded Paper Plane Geometry
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        // Upper Right Wing
        0, 0, -2.8,
        2.4, 0.4, 1.6,
        0, 0.6, 1.0,

        // Upper Left Wing
        0, 0, -2.8,
        0, 0.6, 1.0,
        -2.4, 0.4, 1.6,

        // Lower Keel Right
        0, 0, -2.8,
        0, -0.6, 1.3,
        2.4, 0.4, 1.6,

        // Lower Keel Left
        0, 0, -2.8,
        -2.4, 0.4, 1.6,
        0, -0.6, 1.3,

        // Top Spine Fill
        0, 0, -2.8,
        0, 0.6, 1.0,
        0, -0.6, 1.3,
      ]);

      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();

      // Physical Liquid Glass Material
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.92,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        metalness: 0.15,
        ior: 1.5,
        thickness: 1.2,
        specularIntensity: 2.5,
        specularColor: new THREE.Color(0x38bdf8),
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
        flatShading: true,
      });

      const planeMesh = new THREE.Mesh(geometry, glassMaterial);
      planeGroup.add(planeMesh);

      // Glowing Neon Wireframe Lines Accent
      const wireGeo = new THREE.WireframeGeometry(geometry);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        opacity: 0.8,
        transparent: true,
        linewidth: 1.5,
      });
      const wireframe = new THREE.LineSegments(wireGeo, wireMat);
      planeGroup.add(wireframe);

      scene.add(planeGroup);

      // Floating Translucent Glass Code & Document Panels
      const docGroup = new THREE.Group();
      const docGeo = new THREE.PlaneGeometry(0.7, 1.0);
      const docMat = new THREE.MeshPhysicalMaterial({
        color: 0x6366f1,
        transmission: 0.85,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        metalness: 0.3,
        side: THREE.DoubleSide,
      });

      const docMeshes: THREE.Mesh[] = [];
      for (let i = 0; i < 22; i++) {
        const doc = new THREE.Mesh(docGeo, docMat);
        doc.position.set(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 14
        );
        doc.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        docGroup.add(doc);
        docMeshes.push(doc);
      }
      scene.add(docGroup);

      // Liquid Glowing Dust Particles
      const particleCount = 280;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 35;
      }
      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: 0.07,
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.65,
      });
      const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particlesMesh);

      // Mouse Movement Parallax Event Handler
      handleMouseMove = (event: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseRef.current.targetX = (event.clientX / innerWidth - 0.5) * 2;
        mouseRef.current.targetY = (event.clientY / innerHeight - 0.5) * 2;
      };

      if (!prefersReducedMotion) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      // Handle Resize
      handleResize = () => {
        if (!mountRef.current || !renderer) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse interpolation (lerp)
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        // Paper Plane Parallax & Floating Oscillation
        planeGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.35 - mouseRef.current.y * 0.4;
        planeGroup.position.x = mouseRef.current.x * 0.5;

        planeGroup.rotation.z = Math.sin(elapsedTime * 1.1) * 0.15 - mouseRef.current.x * 0.4;
        planeGroup.rotation.y = Math.cos(elapsedTime * 0.8) * 0.25 + mouseRef.current.x * 0.6;
        planeGroup.rotation.x = Math.sin(elapsedTime * 1.0) * 0.12 - mouseRef.current.y * 0.4;

        // Orbit point lights slightly
        cyanSpot.position.x = Math.sin(elapsedTime * 0.6) * 8;
        cyanSpot.position.z = Math.cos(elapsedTime * 0.6) * 8;

        indigoSpot.position.x = Math.cos(elapsedTime * 0.7) * -8;
        indigoSpot.position.z = Math.sin(elapsedTime * 0.7) * 8;

        // Float glass documents
        docMeshes.forEach((d, idx) => {
          d.rotation.x += 0.004;
          d.rotation.y += 0.006;
          d.position.y += Math.sin(elapsedTime * 1.2 + idx) * 0.003;
        });

        if (renderer) {
          renderer.render(scene, camera);
        }
        animId = requestAnimationFrame(animate);
      };

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      } else {
        animate();
      }
    } catch (err) {
      console.warn("WebGL is not supported or context creation failed. Falling back gracefully:", err);
      setWebGLAvailable(false);
    }

    return () => {
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      if (handleResize) window.removeEventListener("resize", handleResize);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) {
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90" />

      {/* CSS Glass Paper Plane Graphic Fallback (When WebGL unavailable) */}
      {!webGLAvailable && (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-30">
          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-96 h-96 relative"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <path
                d="M10,100 L190,20 L110,180 L85,115 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-80"
              />
              <path
                d="M190,20 L85,115 L10,100"
                fill="currentColor"
                fillOpacity="0.1"
              />
              <path
                d="M190,20 L110,180"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Atmospheric Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[160px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        {/* Liquid Glass Agency Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass border border-white/15 text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-extrabold mb-8 shadow-2xl backdrop-blur-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Tech-Enabled Business & Digital Agency • Coimbatore</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans leading-[1.08] max-w-4xl mb-8 uppercase text-white"
        >
          We handle the papers.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
            You handle the Takeoff.
          </span>
        </motion.h1>

        {/* Value Proposition Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-l-2 border-cyan-500/40 pl-6 text-left max-w-2xl mb-12"
        >
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-sans leading-relaxed font-medium">
            Architecting next-gen web applications, automated business workflows, MCA Fast-Track incorporations, and Section 148 Tax Scrutiny Defense inside custom liquid glass interfaces.
          </p>
        </motion.div>

        {/* Primary Liquid Glass CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-explore-services-btn"
            onClick={onExploreServices}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <span>Explore Bento Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-contact-btn"
            onClick={onContactClick}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full liquid-glass border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp (+91 90255 65526)</span>
          </button>
        </motion.div>

        {/* 4 Core Pillars Bento Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full text-left"
        >
          <div className="p-5 rounded-2xl liquid-glass-card hover:border-cyan-400/50 group">
            <Code2 className="w-5 h-5 text-cyan-400 mb-2.5 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Web Development</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">React, Vite & 3D WebGL Architectures</p>
          </div>

          <div className="p-5 rounded-2xl liquid-glass-card hover:border-indigo-400/50 group">
            <Cpu className="w-5 h-5 text-indigo-400 mb-2.5 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automated Workflows</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">AI Document & CRM Integration</p>
          </div>

          <div className="p-5 rounded-2xl liquid-glass-card hover:border-emerald-400/50 group">
            <Zap className="w-5 h-5 text-emerald-400 mb-2.5 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast-Track MCA</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">48-Hr Pvt Ltd & LLP Setup</p>
          </div>

          <div className="p-5 rounded-2xl liquid-glass-card hover:border-purple-400/50 group">
            <ShieldCheck className="w-5 h-5 text-purple-400 mb-2.5 group-hover:scale-110 transition-transform" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sec 148 Scrutiny</h4>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">High-Stakes Tax Defense Desk</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
