import React from "react";
import { Person } from "@app/page";
import { Location } from "@app/page";
import { useEffect, useState } from "react";
import "@styles/globals.css";

interface LocationSelectionProps {
  selectedPerson: Person;
  location: Location[];
  setLocation: (location: Location[]) => void;
}

function LocationSelection({
  selectedPerson,
  location,
  setLocation,
}: LocationSelectionProps) {
  useEffect(() => {
    async function getLocations() {
      try {
        setLocation([]);

        const response = await fetch("/api/Location");
        const data = await response.json();

        setLocation(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
    // console.log(locations);
    getLocations();
  }, []);

  async function handleOptionChange(
    newLocation: string,
    selectedPersonId: number
  ) {
    console.log("in handleOptionChange...");
    console.log(newLocation);
    const response = await fetch("api/Person", {
      method: "PATCH",
      body: JSON.stringify({
        newLocation: newLocation,
        selectedPersonId: selectedPersonId,
      }),
    });

    window.location.reload();
  }

  return (
    <select
      name="location"
      id="location"
      onChange={(e) => {
        handleOptionChange(e.target.value, selectedPerson.id);
      }}
    >
      {location.map((r: Location) =>
        r.name === selectedPerson.LocationTag ? (
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

export default LocationSelection;
