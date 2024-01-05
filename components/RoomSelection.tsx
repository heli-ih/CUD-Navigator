import React from "react";
import { Faculty } from "@app/page";
import { Room } from "@app/administration/page";
import { useEffect, useState } from "react";
import "@styles/globals.css";

interface RoomSelectionProps {
  selectedFac: Faculty;

  room: Room[];
  setRoom: (room: Room[]) => void;
}

function RoomSelection({ selectedFac, room, setRoom }: RoomSelectionProps) {
  useEffect(() => {
    async function getRooms() {
      try {
        setRoom([]);

        const response = await fetch("/api/Room");
        const data = await response.json();

        setRoom(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    }
    // console.log(rooms);
    getRooms();
  }, []);

  async function handleOptionChange(newRoom: string, selectedFacId: number) {
    console.log("in handleOptionChange...");
    console.log(newRoom);
    const response = await fetch("api/Faculty", {
      method: "PATCH",
      body: JSON.stringify({ newRoom: newRoom, selectedFacId: selectedFacId }),
    });
  }

  return (
    <select
      name="office"
      id="room"
      onChange={(e) => {
        handleOptionChange(e.target.value, selectedFac.id);
      }}
    >
      {room.map((r: Room) =>
        r.name === selectedFac.roomName ? (
          <option key={r.id} value={r.name} selected>
            {r.name}
          </option>
        ) : (
          <option key={r.id} value={r.name}>
            {r.name}
          </option>
        )
      )}
    </select>
  );
}

export default RoomSelection;
