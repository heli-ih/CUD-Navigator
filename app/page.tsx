"use client";

import Image from "next/image";
import "@styles/globals.css";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Link from "next/link";
import { Profile } from "@components/Profile";
import { useEffect, useState } from "react";

import { JsonArray } from "@prisma/client/runtime/library";

export interface Person {
  id: number;
  name: string;
  position: string;
  LocationTag: string;
  location: Location;
  photo: string;
}
export interface Location {
  id: number;
  name: string;
  persons: Person[];
  path: JsonArray;
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLocations([]);
        const locationsResponse = await fetch("/api/Location");
        const locationsData = await locationsResponse.json();
        setLocations(locationsData);

        setPersons([]);
        const personsResponse = await fetch("/api/Person");
        const personsData = await personsResponse.json();
        setPersons(personsData);
      } catch (error) {
        console.error("Error fetching persons data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSearchInput = async (value: string) => {
    try {
      const locationResponse = await fetch(`/api/Location`);
      const locationData = await locationResponse.json();
      const locationSearchTerm = value.toLowerCase().trim();

      // Filter locations based on persons' names and location name
      const locationSearchResults = locationData.filter(
        (location: Location) => {
          // Check if location has persons
          if (location.persons.length > 0) {
            return location.persons.some((person: Person) =>
              person.name.toLowerCase().includes(locationSearchTerm)
            );
          } else {
            // If no persons, check location name
            return location.name.toLowerCase().includes(locationSearchTerm);
          }
        }
      );

      // Update state with results
      setLocations(locationSearchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <main className="">
      {/* Navbar */}
      <div className="flex items-center w-full bg-gray-800 h-24 px-20">
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/cud-nav.appspot.com/o/CUDlogo.png?alt=media&token=de003185-8ef8-4aaa-962d-4b3b9bb6d1af"
            alt="CUDlogo"
            width={200}
            height={60}
          />
        </div>
      </div>
      {/* Search List */}
      <section className="flex flex-col items-center justify-center  mt-5">
        <div>
          {/* search bar */}
          <div className="flex justify-between mb-5 max-w-[35vw] min-w-[35vw]">
            <input
              className="p-1 text-xs rounded-md border border-gray-800 w-full  mr-4"
              type="search"
              name=""
              id=""
              placeholder="Enter a name..."
              onChange={(e) => handleSearchInput(e.target.value)}
            />
            <button className="p-1 text-xs rounded-md border border-gray-800 bg-red-400 text-white px-2">
              Search
            </button>
          </div>
          {/* result list */}
          <ul className=" bg-slate-50  overflow-y-scroll max-h-[70vh] max-w-[35vw] min-w-[35vw] rounded-md  border border-gray-800">
            {locations.map((loc) => (
              <div key={loc.id}>
                {loc.persons && loc.persons.length > 0 ? (
                  loc.persons.map((person) => (
                    <a href={`/locations/${loc.id}`} key={person.id}>
                      <li className="flex flex-row items-center justify-center m-4 px-5 py-3 rounded-md bg-slate-200">
                        {/* <FaUserCircle size="75px" /> */}
                        <img
                          src={person.photo}
                          alt="photo"
                          width={70}
                          height={70}
                          className="rounded-full border-2 border-black"
                        />
                        <div className="flex flex-col items-start w-full p-2 ml-2">
                          <h5 className="text-md font-bold">{person.name}</h5>
                          <p className="text-sm">{person.position}</p>
                          <p className="text-sm">{person.LocationTag}</p>
                        </div>
                      </li>
                    </a>
                  ))
                ) : (
                  <a href={`/locations/${loc.id}`}>
                    <li className="flex flex-row items-center justify-center m-4 px-5 py-3 rounded-md bg-slate-200">
                      <MdPlace size="75px" />
                      <div className="flex flex-col justify-between items-start w-full p-2 ml-2">
                        <h5 className="text-md font-bold">{loc.name}</h5>
                      </div>
                    </li>
                  </a>
                )}
              </div>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
