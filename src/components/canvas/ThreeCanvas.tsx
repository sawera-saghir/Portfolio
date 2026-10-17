'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export type ShaderPreset = 'liquid-chrome' | 'violet-neon' | 'obsidian' | 'cyber-wire';

interface FluidMeshProps {
  preset: ShaderPreset;
}

function FluidMesh({ preset }: FluidMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    meshRef.current.rotation.y = t * 0.25;
  });

  const getMaterialProps = () => {
    switch (preset) {
      case 'liquid-chrome':
        return {
          color: '#e2e8f0',
          metalness: 0.95,
          roughness: 0.05,
          distort: 0.45,
          speed: 2.2,
          wireframe: false,
        };
      case 'violet-neon':
        return {
          color: '#B52DFF',
          emissive: '#5425D8',
          emissiveIntensity: 0.6,
          metalness: 0.6,
          roughness: 0.2,
          distort: 0.55,
          speed: 3.0,
          wireframe: false,
        };
      case 'obsidian':
        return {
          color: '#17121E',
          metalness: 0.8,
          roughness: 0.15,
          distort: 0.35,
          speed: 1.5,
          wireframe: false,
        };
      case 'cyber-wire':
        return {
          color: '#F044C5',
          emissive: '#B52DFF',
          emissiveIntensity: 0.8,
          metalness: 0.2,
          roughness: 0.5,
          distort: 0.4,
          speed: 2.5,
          wireframe: true,
        };
    }
  };

  const matProps = getMaterialProps();

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={matProps.color}
          emissive={matProps.emissive ? new THREE.Color(matProps.emissive) : undefined}
          emissiveIntensity={matProps.emissiveIntensity}
          metalness={matProps.metalness}
          roughness={matProps.roughness}
          distort={matProps.distort}
          speed={matProps.speed}
          wireframe={matProps.wireframe}
        />
      </mesh>
    </Float>
  );
}

interface ThreeCanvasProps {
  preset: ShaderPreset;
}

export function ThreeCanvas({ preset }: ThreeCanvasProps) {
  return (
    <div className="absolute inset-0 pointer-events-auto h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F7F5FA" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#B52DFF" />
        <pointLight position={[5, -5, 5]} intensity={1.5} color="#F044C5" />
        <Suspense fallback={null}>
          <FluidMesh preset={preset} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
