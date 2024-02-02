"use client";
import { useEffect, useState } from "react";
import "@styles/globals.css";
import { Profile } from "@components/Profile";
import { FaUserCircle } from "react-icons/fa";
import { Faculty } from "@app/page";
import RoomSelection from "@components/RoomSelection";

export interface Room {
  id: number;
  name: string;
  path: string;
}

export default function administration() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [room, setRoom] = useState<Room[]>([]);
  const [selectedId, setSelectedId] = useState<Number>(0);
  const [selectedFac, setSelectedFac] = useState<Faculty | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchFaculties() {
      try {
        setFaculties([]);
        const response = await fetch("/api/Faculty");
        const data = await response.json();

        setFaculties(data);
      } catch (error) {
        console.error("Error fetching faculties data:", error);
      }
    }

    fetchFaculties();
  }, []);

  useEffect(() => {
    const currentSelectedFac = faculties.find((fac) => fac.id === selectedId);
    setSelectedFac(currentSelectedFac);
  }, [selectedId, faculties]);

  return (
    <section className="">
      <div className="flex flex-row justify-around mt-20">
        {/* List of Faculties */}
        <ul className="w-[40%]  bg-white rounded-lg py-4 px-3 ">
          {faculties.map((faculty) => (
            <li key={faculty.id}>
              <button
                onClick={(e) => {
                  setSelectedId(faculty.id);
                }}
                className="flex flex-col justify-between rounded-lg items-start w-full p-2 mb-3 bg-slate-50"
              >
                <Profile selectedFac={faculty}>
                  <p className="text-sm">{faculty.roomName}</p>
                </Profile>
              </button>
            </li>
          ))}
        </ul>

        {/* Faculty Profile*/}
        <div className="w-[40%] flex items-center justify-center bg-white rounded-lg">
          <div className="flex flex-col items-center m-6 px-10 py-5 w-[50%] bg-slate-50 rounded-lg ">
            <FaUserCircle size="125px" />
            {!selectedFac && <div>Select a profile!</div>}
            {selectedFac && (
              <Profile selectedFac={selectedFac}>
                <RoomSelection
                  selectedFac={selectedFac}
                  room={room}
                  setRoom={setRoom}
                />
              </Profile>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
