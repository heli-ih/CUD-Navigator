"use client";

import Image from "next/image";
import "@styles/globals.css";
import { FaCog, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { Profile } from "@components/Profile";
import { useEffect, useState } from "react";

export interface Faculty {
  id: number;
  name: string;
  position: string;
  roomName: string;
}

export default function Home() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);

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
    <main className="">
      {/* Navbar */}
      <div className="flex items-center w-full bg-gray-800 h-24 px-20">
        <div>
          <Image src="/CUDlogo.png" alt="CUDlogo" width={200} height={60} />
        </div>
      </div>
      {/* Search List */}
      <section className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-h-[50%] min-w-[30%]">
        {/* search bar */}
        <div className="flex justify-between mb-5 w-full ">
          <input
            className="p-1 text-xs rounded-md border border-gray-800 pr-20 "
            type="search"
            name=""
            id=""
            placeholder="Enter a name..."
          />
          <button className="p-1 text-xs rounded-md border border-gray-800 bg-red-400 text-white px-2">
            Search
          </button>
        </div>
        {/* result list */}
        <ul className=" bg-slate-50 rounded-md  border border-gray-800">
          {faculties.map((faculty) => (
            <a href={`/locations/${faculty.id}`}>
              <li className="flex flex-row items-center m-4 px-5 py-3 roun rounded-md bg-slate-200">
                {/* <Image
                  className="rounded-md"
                  src="/Dr.Said.png"
                  alt="Dr. Said"
                  width={60}
                  height={60}
                /> */}
                <FaUserCircle size="75px" />
                <div className="flex flex-col justify-between ml-4">
                  <h5 className="text-md font-bold">{faculty.name}</h5>
                  <p className="text-sm">{faculty.position}</p>
                  <p className="text-sm">{faculty.roomName}</p>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </section>
      {/* settings */}
      <div className="fixed buttom-0 right-0 ">
        <Link href="/administration">
          <button>
            <FaCog />
          </button>
        </Link>
      </div>
    </main>
  );
}
