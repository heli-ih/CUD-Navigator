import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import React, { useState, useEffect } from "react";
import { Location } from "@app/page";

import { useSpring, animated } from "@react-spring/web";

interface PathLineProps {
  id: String;
}

export default function PathLine({ id }: PathLineProps) {
  const [progress, setProgress] = useState(0);
  const [coordinations, setCoordinations] = useState<String[]>([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("/api/Location");
        const data = await response.json();

        const selectedLocation =
          data.find((r: Location) => r.id === Number(id))?.path || [];

        setCoordinations(selectedLocation);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 0.01, 5));
    }, 5);

    return () => clearInterval(interval);
  }, []);

  if (!coordinations || coordinations.length === 0) {
    return null;
  }

  const pathPoints = coordinations.map(
    (c) => new Vector3(Number(c[0]), Number(c[1]), Number(c[2]))
  );

  const slicedPathPoints = pathPoints.slice(
    0,
    Math.floor(progress * pathPoints.length) + 1
  );

  return <Line points={slicedPathPoints} color="blue" lineWidth={3} />;
}

// const pathPoints = [
//   new Vector3(9.2, -665, 1188),
//   new Vector3(8.7, -633, 1178.7),
//   new Vector3(-31, -605, 1170.8),
//   new Vector3(-31, -602, 1170.7),
// ];
