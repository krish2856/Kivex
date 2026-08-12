"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  scrollProgress?: number;
}

const NODE_COUNT = 18;
const LINE_COLOR = "#F5EFE5";
const NODE_COLOR = "#E8B62A";
const STRUCTURE_COLOR = "#2D5FC7";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function generateNodes(count: number) {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = seededRandom(i * 3 + 1) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(i * 3 + 2) - 1);
    const r = 1.8 + seededRandom(i * 3 + 3) * 1.2;
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }
  return nodes;
}

function generateEdges(nodes: THREE.Vector3[], maxDist: number) {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        edges.push([nodes[i], nodes[j]]);
      }
    }
  }
  return edges;
}

export default function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);
  const edges = useMemo(() => generateEdges(nodes, 2.2), [nodes]);

  const nodeOffsets = useMemo(
    () =>
      nodes.map((_, i) => ({
        speed: 0.3 + seededRandom(i * 7 + 4) * 0.4,
        amplitude: 0.15 + seededRandom(i * 7 + 5) * 0.15,
        phase: seededRandom(i * 7 + 6) * Math.PI * 2,
      })),
    [nodes]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15;
      icoRef.current.rotation.y = t * 0.2;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }

    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y * 0.2 - mouseRef.current.y) * 0.05;

    state.camera.position.x = mouseRef.current.x;
    state.camera.position.y = mouseRef.current.y;
    state.camera.position.z = 5 - scrollProgress * 1.5;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color={STRUCTURE_COLOR}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {nodes.map((pos, i) => {
        const offset = nodeOffsets[i];
        return (
          <FloatingNode
            key={i}
            position={pos}
            speed={offset.speed}
            amplitude={offset.amplitude}
            phase={offset.phase}
          />
        );
      })}

      {edges.map(([start, end], i) => (
        <Line
          key={i}
          points={[start.toArray(), end.toArray()]}
          color={LINE_COLOR}
          lineWidth={0.8}
          transparent
          opacity={0.25}
        />
      ))}

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, -3, 2]} intensity={0.4} color="#E8B62A" />
    </group>
  );
}

function FloatingNode({
  position,
  speed,
  amplitude,
  phase,
}: {
  position: THREE.Vector3;
  speed: number;
  amplitude: number;
  phase: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.position.x =
        position.x + Math.sin(t * speed + phase) * amplitude;
      ref.current.position.y =
        position.y + Math.cos(t * speed * 0.7 + phase) * amplitude;
      ref.current.position.z =
        position.z +
        Math.sin(t * speed * 0.5 + phase * 2) * amplitude * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={NODE_COLOR}
        emissive={NODE_COLOR}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
