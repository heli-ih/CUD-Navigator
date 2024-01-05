import { Faculty } from "@app/page";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "@styles/globals.css";
import RoomSelection from "./RoomSelection";
import { Room } from "@app/administration/page";

interface ProfileProps {
  selectedId: Number;
  faculties: Faculty[];
  room: Room[];
  setRoom: (room: Room[]) => void;
}

export function Profile({
  selectedId,
  faculties,
  room,
  setRoom,
}: ProfileProps) {
  const [selectedFac, setSelectedFac] = useState<Faculty | undefined>(
    undefined
  );

  useEffect(() => {
    const currentSelectedFac = faculties.find((fac) => fac.id === selectedId);
    setSelectedFac(currentSelectedFac);
  }, [selectedId, faculties]);

  if (!selectedFac) {
    return <div>Select a profile!</div>;
  }

  return (
    <div className="flex flex-col justify-between  items-start w-full p-2 mb-3">
      <h5 className="text-md font-bold">{selectedFac.name}</h5>
      <p className="text-sm">{selectedFac.position}</p>
      <RoomSelection selectedFac={selectedFac} room={room} setRoom={setRoom} />
    </div>
  );
}
