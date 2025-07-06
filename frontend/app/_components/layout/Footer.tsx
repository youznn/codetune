"use client";

import { useTerminal } from "../terminal/TerminalContext";

export default function Footer() {
  const { isTerminalOpen } = useTerminal();

  if (isTerminalOpen) {
    return null;
  }

  return (
    <footer className="w-full h-8 bg-[#23272e] border-t border-[#22242a] flex items-center justify-between px-6 text-xs text-[#cccccc] font-mono z-40 shadow-[0_-2px_8px_0_rgba(0,0,0,0.15)] fixed bottom-0 left-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#007acc] mr-1" />
          Ln 1, Col 1
        </span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Prettier</span>
        <span>Git: main</span>
        <span>⚡️ Ready</span>
      </div>
    </footer>
  );
}
