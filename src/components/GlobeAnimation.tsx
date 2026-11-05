"use client";
// src/components/GlobeAnimation.tsx
//
// Točkasti 3D globus: kontinenti su generirani iz alpha kanala /earth-map.png
// (kopno = neprozirno), uz atmosferski sjaj i animirane lukove iz Zagreba.
// Renderiranje se pauzira kad globus nije vidljiv (IntersectionObserver) i
// poštuje "prefers-reduced-motion".

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2;
const DOT_COUNT = 18000;
const MAP_URL = "/earth-map.png";

const HUB = { lat: 45.815, lon: 15.982 }; // Zagreb
const DESTINATIONS = [
  { lat: 51.507, lon: -0.128 }, // London
  { lat: 48.208, lon: 16.373 }, // Vienna
  { lat: 52.52, lon: 13.405 }, // Berlin
  { lat: 44.787, lon: 20.457 }, // Belgrade
  { lat: 42.36, lon: -71.058 }, // Boston
  { lat: 40.713, lon: -74.006 }, // New York
  { lat: 25.204, lon: 55.27 }, // Dubai
  { lat: 24.713, lon: 46.675 }, // Riyadh
  { lat: 30.593, lon: 114.305 }, // Wuhan
  { lat: 1.352, lon: 103.82 }, // Singapore
  { lat: -33.869, lon: 151.209 }, // Sydney
  { lat: -23.55, lon: -46.633 }, // São Paulo
];

const COLORS = {
  dotA: new THREE.Color("#7db7ff"),
  dotB: new THREE.Color("#22d3ee"),
  globeBase: new THREE.Color("#07112b"),
  globeRim: new THREE.Color("#1e3a8a"),
  atmosphere: new THREE.Color("#3b82f6"),
  arc: new THREE.Color("#67e8f9"),
  marker: new THREE.Color("#a5f3fc"),
};

function latLonToVec3(lat: number, lon: number, r = RADIUS) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function vec3ToLatLon(v: THREE.Vector3) {
  const n = v.clone().normalize();
  const lat = 90 - (Math.acos(n.y) * 180) / Math.PI;
  let lon = (Math.atan2(n.z, -n.x) * 180) / Math.PI - 180;
  if (lon < -180) lon += 360;
  return { lat, lon };
}

// ----------------------------------------------------------------------------
// Uzorkovanje kopna iz teksture → pozicije točaka (Fibonacci sfera)
// ----------------------------------------------------------------------------
function useLandDots() {
  const [data, setData] = useState<{
    positions: Float32Array;
    randoms: Float32Array;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = MAP_URL;
    img.onload = () => {
      if (cancelled) return;
      const w = 720;
      const h = 360;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const pixels = ctx.getImageData(0, 0, w, h).data;

      const positions: number[] = [];
      const randoms: number[] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      const v = new THREE.Vector3();

      for (let i = 0; i < DOT_COUNT; i++) {
        const y = 1 - (2 * (i + 0.5)) / DOT_COUNT;
        const r = Math.sqrt(1 - y * y);
        const t = golden * i;
        v.set(Math.cos(t) * r, y, Math.sin(t) * r);
        const { lat, lon } = vec3ToLatLon(v);
        const px = Math.min(w - 1, Math.floor(((lon + 180) / 360) * w));
        const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h));
        const alpha = pixels[(py * w + px) * 4 + 3];
        if (alpha > 128) {
          v.multiplyScalar(RADIUS * 1.002);
          positions.push(v.x, v.y, v.z);
          randoms.push(Math.random());
        }
      }

      setData({
        positions: new Float32Array(positions),
        randoms: new Float32Array(randoms),
      });
    };
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

// ----------------------------------------------------------------------------
// Shaderi
// ----------------------------------------------------------------------------
const dotsVertex = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vRandom;
  varying float vFacing;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normalize(position));
    vFacing = dot(n, normalize(-mv.xyz));
    vRandom = aRandom;
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const dotsFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying float vRandom;
  varying float vFacing;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.3, d);
    float twinkle = 0.8 + 0.2 * sin(uTime * 1.2 + vRandom * 6.2831);
    float edge = smoothstep(0.0, 0.45, vFacing);
    vec3 col = mix(uColorA, uColorB, smoothstep(0.6, 1.0, vRandom));
    gl_FragColor = vec4(col, alpha * edge * twinkle);
  }
`;

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const globeFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = 1.0 - max(dot(vNormal, vView), 0.0);
    vec3 col = mix(uBase, uRim, pow(f, 2.2));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Stražnje plohe veće sfere: -dot ide od ~0.5 (rub globusa) do 0 (vanjski rub)
    float intensity = pow(clamp(-dot(vNormal, vView), 0.0, 1.0), 2.2) * 1.8;
    gl_FragColor = vec4(uColor * intensity, intensity);
  }
`;

const arcVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float head = fract(uTime * 0.18 + uOffset) * 1.6 - 0.2;
    float tail = 0.35;
    float trail = smoothstep(head - tail, head, vUv.x) * step(vUv.x, head);
    float alpha = max(trail, 0.14);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

// ----------------------------------------------------------------------------
// Komponente scene
// ----------------------------------------------------------------------------
function LandDots({ reducedMotion }: { reducedMotion: boolean }) {
  const data = useLandDots();
  const { gl } = useThree();

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dotsVertex,
        fragmentShader: dotsFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uSize: { value: 20 },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
          uTime: { value: 0 },
          uColorA: { value: COLORS.dotA },
          uColorB: { value: COLORS.dotB },
        },
      }),
    [gl],
  );

  const geometry = useMemo(() => {
    if (!data) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(data.randoms, 1));
    return g;
  }, [data]);

  useEffect(
    () => () => {
      geometry?.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    if (!reducedMotion) material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  if (!geometry) return null;
  return <points geometry={geometry} material={material} />;
}

function Arcs({ reducedMotion }: { reducedMotion: boolean }) {
  const arcs = useMemo(() => {
    const start = latLonToVec3(HUB.lat, HUB.lon);
    return DESTINATIONS.map((dest, i) => {
      const end = latLonToVec3(dest.lat, dest.lon);
      const dist = start.distanceTo(end);
      const altitude = RADIUS + 0.08 + dist * 0.28;
      const c1 = start.clone().lerp(end, 0.25).normalize().multiplyScalar(altitude);
      const c2 = start.clone().lerp(end, 0.75).normalize().multiplyScalar(altitude);
      const curve = new THREE.CubicBezierCurve3(start, c1, c2, end);
      const geometry = new THREE.TubeGeometry(curve, 96, 0.009, 8, false);
      const material = new THREE.ShaderMaterial({
        vertexShader: arcVertex,
        fragmentShader: arcFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uOffset: { value: (i * 0.37) % 1 },
          uColor: { value: COLORS.arc },
        },
      });
      return { geometry, material, end };
    });
  }, []);

  useEffect(
    () => () =>
      arcs.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      }),
    [arcs],
  );

  useFrame((state) => {
    const t = reducedMotion ? 2.5 : state.clock.elapsedTime;
    arcs.forEach(({ material }) => (material.uniforms.uTime.value = t));
  });

  return (
    <group>
      {arcs.map(({ geometry, material, end }, i) => (
        <group key={i}>
          <mesh geometry={geometry} material={material} />
          <mesh position={end}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color={COLORS.marker} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HubMarker({ reducedMotion }: { reducedMotion: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const position = useMemo(() => latLonToVec3(HUB.lat, HUB.lon, RADIUS * 1.003), []);
  const lookTarget = useMemo(() => position.clone().multiplyScalar(2), [position]);

  useEffect(() => {
    ringRef.current?.lookAt(lookTarget);
  }, [lookTarget]);

  useFrame((state) => {
    const ring = ringRef.current;
    if (!ring) return;
    const t = reducedMotion ? 0.4 : (state.clock.elapsedTime * 0.6) % 1;
    const s = 1 + t * 3;
    ring.scale.set(s, s, s);
    (ring.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - t);
  });

  return (
    <group>
      <mesh position={position}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={ringRef} position={position}>
        <ringGeometry args={[0.05, 0.065, 48]} />
        <meshBasicMaterial
          color={COLORS.marker}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Globe({ reducedMotion }: { reducedMotion: boolean }) {
  const spinRef = useRef<THREE.Group>(null);

  // Početna orijentacija: Europa (Zagreb) okrenuta prema kameri
  const initialYaw = useMemo(() => {
    const hub = latLonToVec3(HUB.lat, HUB.lon);
    return Math.atan2(-hub.x, hub.z) + 0.35;
  }, []);

  const globeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fresnelVertex,
        fragmentShader: globeFragment,
        uniforms: {
          uBase: { value: COLORS.globeBase },
          uRim: { value: COLORS.globeRim },
        },
      }),
    [],
  );

  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fresnelVertex,
        fragmentShader: atmosphereFragment,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: COLORS.atmosphere } },
      }),
    [],
  );

  useEffect(
    () => () => {
      globeMaterial.dispose();
      atmosphereMaterial.dispose();
    },
    [globeMaterial, atmosphereMaterial],
  );

  useFrame((_, delta) => {
    if (spinRef.current && !reducedMotion) {
      spinRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group rotation={[0.38, 0, 0]}>
      <mesh material={atmosphereMaterial} scale={1.18}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
      </mesh>
      <group ref={spinRef} rotation={[0, initialYaw, 0]}>
        <mesh material={globeMaterial}>
          <sphereGeometry args={[RADIUS * 0.995, 64, 64]} />
        </mesh>
        <LandDots reducedMotion={reducedMotion} />
        <Arcs reducedMotion={reducedMotion} />
        <HubMarker reducedMotion={reducedMotion} />
      </group>
    </group>
  );
}

// ----------------------------------------------------------------------------
// Glavna komponenta
// ----------------------------------------------------------------------------
const GlobeAnimation = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Na touch uređajima ne hvatamo drag — inače bi globus blokirao scroll stranice
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={
        isTouch ? "w-full h-full" : "w-full h-full cursor-grab active:cursor-grabbing"
      }
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Globe reducedMotion={reducedMotion} />
        {!isTouch && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.45}
            minPolarAngle={Math.PI / 2 - 0.6}
            maxPolarAngle={Math.PI / 2 + 0.6}
          />
        )}
      </Canvas>
    </div>
  );
};

export default GlobeAnimation;
