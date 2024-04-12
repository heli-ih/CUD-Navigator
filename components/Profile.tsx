import { Person } from "@app/page";
import { ReactNode, useEffect, useState } from "react";
import "@styles/globals.css";

interface ProfileProps {
  selectedPerson: Person;
  children: ReactNode;
}

export function Profile({ selectedPerson, children }: ProfileProps) {
  return (
    <div className="flex flex-col justify-between  items-start w-full p-2 ml-2">
      <h5 className="text-md font-bold">{selectedPerson.name}</h5>
      <p className="text-sm">{selectedPerson.position}</p>
      {children}
    </div>
  );
}
