import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import React, { useState, useEffect } from "react";
import { Room } from "@app/administration/page";

interface PathLineProps {
  roomId: String;
}

export default function PathLine({ roomId }: PathLineProps) {
  const [progress, setProgress] = useState(0);
  const [coordinations, setCoordinations] = useState<String[]>([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/api/Room");
        const data = await response.json();
        const selectedRoom =
          data.find((r: Room) => r.id === Number(roomId))?.path || [];

        setCoordinations(JSON.parse(selectedRoom));
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => Math.min(prevProgress + 0.01, 1));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!coordinations || coordinations.length === 0) {
    return null;
  }

  const pathPoints = coordinations.map(
    (c) => new Vector3(Number(c[0]), Number(c[1]), Number(c[2]))
  );

  const slicedPathPoints = pathPoints.slice(0, Math.floor(progress * 4) + 1);

  return <Line points={slicedPathPoints} color="blue" lineWidth={3} />;
}
