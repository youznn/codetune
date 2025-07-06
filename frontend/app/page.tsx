"use client";

import { useState } from "react";
import LNB from "./_components/layout/LNB";
import Terminal from "./_components/terminal/Terminal";
import Footer from "./_components/layout/Footer";

interface Track {
  id: string;
  title: string;
}

function SongEditor({ track }: { track: Track }) {
  // 실제로는 곡 정보, 플레이어 등 추가 가능
  return (
    <div className="p-8 h-full w-full flex flex-col">
      <h2 className="text-2xl font-bold mb-2 text-[#cccccc]">{track.title}</h2>
      <div className="text-[#969696] mb-4">Track ID: {track.id}</div>
      <div className="bg-[#23272e] p-6 rounded-lg border border-[#3c3c3c] w-full max-w-2xl">
        <div className="mb-2 text-[#cccccc]">🎵 Music Player UI (Demo)</div>
        <div className="flex items-center gap-4">
          <button className="bg-[#007acc] hover:bg-[#005a9e] text-white px-4 py-2 rounded">
            Play
          </button>
          <span className="text-[#cccccc]">00:00 / 03:45</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openTabs, setOpenTabs] = useState<Track[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const handleTrackClick = (track: Track) => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === track.id)) return prev;
      return [...prev, track];
    });
    setActiveTabId(track.id);
  };

  const handleTabClick = (trackId: string) => {
    setActiveTabId(trackId);
  };

  const handleTabClose = (trackId: string) => {
    setOpenTabs((prev) => prev.filter((t) => t.id !== trackId));
    setTimeout(() => {
      setOpenTabs((prev) => {
        if (prev.length === 0) {
          setActiveTabId(null);
          return prev;
        }
        if (activeTabId === trackId) {
          // 닫은 탭이 현재 탭이면, 마지막 탭으로 포커스 이동
          setActiveTabId(prev[prev.length - 1].id);
        }
        return prev;
      });
    }, 0);
  };

  const activeTrack = openTabs.find((t) => t.id === activeTabId);

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-[#cccccc] font-mono">
      {/* LNB */}
      <LNB onTrackClick={handleTrackClick} />
      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#181a20]">
        {/* Editor Tabs */}
        <div className="flex items-center bg-[#23272e] border-b border-[#3c3c3c] h-10 px-2 gap-1 overflow-x-auto">
          {openTabs.map((track) => (
            <div
              key={track.id}
              className={`flex items-center px-3 py-1 rounded-t-md cursor-pointer select-none mr-1 h-9 text-sm font-medium border border-b-0 ${
                activeTabId === track.id
                  ? "bg-[#1e1e1e] border-[#3c3c3c] text-[#fff]"
                  : "bg-[#23272e] border-transparent text-[#cccccc] hover:bg-[#252526]"
              }`}
              onClick={() => handleTabClick(track.id)}
            >
              <span className="truncate max-w-[120px]">{track.title}</span>
              <button
                className="ml-2 text-[#969696] hover:text-[#fff]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClose(track.id);
                }}
                tabIndex={-1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {/* Editor Content */}
        <div className="flex-1 min-h-0 min-w-0 overflow-auto">
          {activeTrack ? (
            <SongEditor track={activeTrack} />
          ) : (
            <div className="flex items-center justify-center h-full text-[#969696] text-lg">
              Select a song from the Explorer to start playing
            </div>
          )}
        </div>
        {/* Terminal (푸터 위에 항상 보임) */}
        <div className="h-[300px] flex-shrink-0">
          <Terminal />
        </div>
        {/* Footer (항상 맨 아래) */}
        <div className="h-[32px] flex-shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
