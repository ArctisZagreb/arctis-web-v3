"use client";
// src/components/GlobeAnimation.tsx
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RotatingGlobe = () => {
  const texture = useLoader(THREE.TextureLoader, "/earth-map.png"); // <<< PROMIJENI OVDJE

  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      {/* Materijal s teksturom Zemlje */}
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.1}
        transparent={true} // <<< DODAJ OVO da materijal poštuje alpha kanal teksture
        // Opcionalno: Možeš dodati i `alphaTest: 0.1` ako imaš problema s renderiranjem prozirnih dijelova
      />
    </mesh>
  );
};

// Glavna komponenta koja postavlja scenu
const GlobeAnimation = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        // Konfiguracija WebGLRenderer-a za prozirnu pozadinu
        gl={{ alpha: true }} // <<< DODAJ OVO
        // Opcionalno: Možeš eksplicitno postaviti scenu bez pozadine
        // onCreated={({ scene }) => { scene.background = null; }} // Ovo obično nije potrebno uz alpha: true
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RotatingGlobe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeAnimation;
