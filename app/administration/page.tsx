"use client";
import { useEffect, useState } from "react";
import "@styles/globals.css";
import { Profile } from "@components/Profile";
import { FaUserCircle } from "react-icons/fa";
import { Faculty } from "@app/page";

export interface Room {
  id: number;
  name: string;
}

export default function administration() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [visible, setVisible] = useState(true);
  const [room, setRoom] = useState<Room[]>([]);

  const [selectedId, setSelectedId] = useState<Number>(0);

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

  return (
    <section className="">
      <div className="flex flex-row justify-around mt-20">
        {/* List of Faculties */}
        <ul className="w-[40%]  bg-white rounded-lg py-4 px-3 ">
          {faculties.map((fac) => (
            <li key={fac.id}>
              <button
                onClick={(e) => {
                  setVisible(true);
                  setSelectedId(fac.id);
                }}
                className="flex flex-col justify-between rounded-lg items-start w-full p-2 mb-3 bg-slate-50"
              >
                {
                  <>
                    <h5 className="text-md font-bold">{fac.name}</h5>
                    <p className="text-sm">{fac.position}</p>
                    <p className="text-sm">{fac.roomName}</p>
                  </>
                }
              </button>
            </li>
          ))}
        </ul>

        {/* Faculty Profile*/}
        <div className="w-[40%] flex items-center justify-center bg-white rounded-lg">
          {visible && (
            <div className="flex flex-col items-center m-6 px-10 py-5 w-[50%] bg-slate-50 rounded-lg ">
              <FaUserCircle size="125px" />
              <Profile
                selectedId={selectedId}
                faculties={faculties}
                room={room}
                setRoom={setRoom}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
