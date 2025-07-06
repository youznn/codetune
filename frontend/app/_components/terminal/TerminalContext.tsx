"use client";

import React, { createContext, useContext, useState } from "react";

interface TerminalContextType {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <TerminalContext.Provider value={{ isTerminalOpen, setIsTerminalOpen }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
