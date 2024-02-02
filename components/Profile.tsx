import { Faculty } from "@app/page";
import { ReactNode, useEffect, useState } from "react";
import "@styles/globals.css";

interface ProfileProps {
  selectedFac: Faculty;
  children: ReactNode;
}

export function Profile({ selectedFac, children }: ProfileProps) {
  return (
    <div className="flex flex-col justify-between  items-start w-full p-2 mb-3">
      <h5 className="text-md font-bold">{selectedFac.name}</h5>
      <p className="text-sm">{selectedFac.position}</p>
      {children}
    </div>
  );
}
