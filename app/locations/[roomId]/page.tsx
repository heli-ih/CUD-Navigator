"use client";

import { Vector3 } from "three";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Map from "@components/Map";
import PathLine from "@components/PathLine";
import { Faculty } from "@app/page";

function Locations({ params }: { params: { roomId: String } }) {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    new Vector3(0, -1000, 1700)
  );
  const [faculty, setFaculty] = useState<Faculty>();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("/api/Faculty");
        const data = await response.json();
        const selectedFac = data.find(
          (f: Faculty) => f.room?.id === Number(params.roomId)
        );

        setFaculty(selectedFac);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFaculty();
  }, [params.roomId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        Location Page of <b>{faculty?.name}</b>
      </h1>

      <Canvas
        frameloop="demand"
        className="mt-4"
        style={{ height: "100vh", width: "100vw" }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[1, 2, 2]} />
        <PerspectiveCamera
          makeDefault
          fov={15}
          near={10}
          position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        />
        <Map />

        <PathLine roomId={params.roomId} />
      </Canvas>
    </div>
  );
}

export default Locations;
