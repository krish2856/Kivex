"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function ParticleField({ count = 200 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = seededRandom(i * 4 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 4 + 2) - 1);
      const r = 2.0 + seededRandom(i * 4 + 3) * 2.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }

    return { positions: pos, basePositions: base };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const breathe = Math.sin(t * 0.3 + i * 0.1) * 0.08;

      posAttr.array[i3] = basePositions[i3] + breathe;
      posAttr.array[i3 + 1] =
        basePositions[i3 + 1] + Math.sin(t * 0.2 + i * 0.15) * 0.06;
      posAttr.array[i3 + 2] =
        basePositions[i3 + 2] + Math.cos(t * 0.25 + i * 0.12) * 0.05;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#F5EFE5"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
