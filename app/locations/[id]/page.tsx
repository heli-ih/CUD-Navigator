"use client";

import { Line } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import React, { useState, useEffect } from "react";
import { Vector3 } from "three";

function Model() {
  const map = useGLTF("/HUB_GF_3D.glb");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <primitive object={map.scene} position={[-90, -2.9, 50]} />
    </mesh>
  );
}

function PathLine({ pathPoints }) {
  return <Line points={pathPoints} color="blue" lineWidth={5} />;
}

function Locations() {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    new Vector3(20, 100, 50)
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 0.01, 1));
    }, 20); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  const pathPoints = [
    new Vector3(17, -2.9, 35),
    new Vector3(18, -2.7, -48),
    new Vector3(-1, -2.7, -48),
    new Vector3(-1, -2.7, -58),
    // Add more points as needed
  ].slice(0, Math.floor(progress * 3) + 1);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Location Page</h1>
      {/* ... other components */}
      <Canvas
        frameloop="demand"
        className="mt-4"
        style={{ height: "80vh", width: "100vw" }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[1, 2, 2]} />
        <PerspectiveCamera
          makeDefault
          fov={70}
          near={10}
          position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        />
        <Model />

        {/* Draw Path */}
        <PathLine pathPoints={pathPoints} />
      </Canvas>
    </div>
  );
}

export default Locations;
