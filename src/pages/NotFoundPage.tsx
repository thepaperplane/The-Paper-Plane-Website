import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Home, Compass } from "lucide-react";

interface NotFoundPageProps {
  onReturnHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x020617, 0.05);

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 0, 7);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const light = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(light);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      // Lost Paper Plane Mesh
      const geometry = new THREE.ConeGeometry(1, 2.5, 3);
      const material = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        roughness: 0.2,
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = Math.PI / 3;
      scene.add(plane);

      // Cloud Fog Particles
      const cloudGeo = new THREE.SphereGeometry(0.8, 8, 8);
      const cloudMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.3,
      });

      const cloudsGroup = new THREE.Group();
      for (let i = 0; i < 25; i++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        );
        cloudsGroup.add(cloud);
      }
      scene.add(cloudsGroup);

      const clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        plane.rotation.z = Math.sin(elapsedTime * 1.5) * 0.4;
        plane.rotation.y = elapsedTime * 0.5;
        cloudsGroup.rotation.y = elapsedTime * 0.1;

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
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* 3D Canvas Background */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Glow (also serves as the WebGL-unavailable fallback backdrop) */}
      {!webGLAvailable && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />
      )}

      {/* 404 Overlay Content */}
      <div className="relative z-10 max-w-md mx-auto text-center space-y-6 liquid-glass-card p-8 sm:p-10 rounded-2xl border border-white/10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mx-auto">
          <Compass className="w-8 h-8 motion-safe:animate-spin" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold block">
            Flight Path Deviation • 404
          </span>
          <h1 className="text-3xl font-extrabold text-white uppercase tracking-tight">
            Paper Plane Lost in Clouds
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested compliance route or coordinates could not be located on our radar.
          </p>
        </div>

        <button
          id="return-to-base-btn"
          onClick={onReturnHome}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Base (Home)</span>
        </button>
      </div>
    </div>
  );
};
