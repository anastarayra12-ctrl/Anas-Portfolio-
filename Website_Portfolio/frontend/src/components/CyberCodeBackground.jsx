import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Wireframe } from '@react-three/drei';
import useAppStore from '../store/useAppStore';
import * as THREE from 'three';

const Shape = ({ position, rotation, type, color, reducedMotion }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!reducedMotion && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={reducedMotion ? 0 : 1} floatIntensity={reducedMotion ? 0 : 1.5} floatingRange={[-0.5, 0.5]}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {type === 'torus' && <torusGeometry args={[0.8, 0.2, 16, 32]} />}
        {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {type === 'cone' && <coneGeometry args={[0.7, 1.4, 4]} />}
        {type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} wireframe={type !== 'torus' && type !== 'box'} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
};

const Scene = ({ reducedMotion }) => {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';
  const color1 = isDark ? '#185FA5' : '#85B7EB';
  const color2 = isDark ? '#38BDF8' : '#042C53';

  const shapes = useMemo(() => [
    { type: 'icosahedron', position: [-4, 2, -5], color: color1 },
    { type: 'torus', position: [5, -2, -8], color: color2 },
    { type: 'octahedron', position: [3, 4, -6], color: color1 },
    { type: 'icosahedron', position: [-5, -3, -4], color: color2 },
    { type: 'box', position: [6, 2, -5], color: color1 },
    { type: 'cone', position: [-2, -4, -6], color: color2 },
    { type: 'tetrahedron', position: [0, 5, -7], color: color1 },
    { type: 'torus', position: [-6, 0, -6], color: color1 },
  ], [color1, color2]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {shapes.map((props, i) => (
        <Shape key={i} {...props} reducedMotion={reducedMotion} />
      ))}
    </>
  );
};

export const CyberCodeBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowTier, setIsLowTier] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);

    // Basic heuristic for low-tier device
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      setIsLowTier(true);
    }
    if (window.innerWidth < 768) {
      // Mobile devices might benefit from less complex backgrounds or no 3D
      // We will still render it but it's very lightweight
    }

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // If extremely low tier, we can fallback to nothing or CSS background, 
  // but R3F with 4 simple wireframe shapes is exceptionally lightweight.
  // frameloop="demand" only renders when something changes.
  // Since we have continuous animation (Float), we use frameloop="always" 
  // BUT R3F pauses automatically when tab is not visible!

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} 
        gl={{ antialias: false, alpha: true }}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
