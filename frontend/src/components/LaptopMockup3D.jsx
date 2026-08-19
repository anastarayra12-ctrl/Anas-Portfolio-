import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const DecorativeBox = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.2, 2, 0.2]} />
      <meshStandardMaterial color="#2563EB" wireframe transparent opacity={0.4} />
    </mesh>
  );
};

export const LaptopMockup3D = () => {
  return (
    <div style={{ width: '100%', height: '220px', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <DecorativeBox />
      </Canvas>
    </div>
  );
};

export default LaptopMockup3D;
