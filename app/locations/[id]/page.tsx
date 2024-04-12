"use client";

import { Vector3 } from "three";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";
import Map from "@components/Map";
import PathLine from "@components/PathLine";
import { Person, Location } from "@app/page";

function Locations({ params }: { params: { id: String } }) {
  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    new Vector3(-30, -800, 1500)
  );
  const [person, setPerson] = useState<Person>();
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResponse = await fetch("/api/Location");
        const locationData = await locationResponse.json();
        const selectedLocation = locationData.find(
          (l: Location) => l.id === Number(params.id)
        );
        setLocation(selectedLocation);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [params.id]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>
        Find <b>{location?.name}</b>
      </h1>

      <Canvas
        frameloop="demand"
        className="mt-4"
        style={{ height: "100vh", width: "100vw" }}
      >
        <OrbitControls />
        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.4} position={[0, 2, 1]} />
        <PerspectiveCamera
          makeDefault
          fov={16}
          near={10}
          position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
        />
        <Map />

        <PathLine id={params.id} />
        {/* <Cone id={params.id} /> */}
      </Canvas>
    </div>
  );
}

export default Locations;
