"use client";

import { useState } from "react";
import {
  RiFolderFill,
  RiFolderOpenFill,
  RiMusic2Fill,
  RiPlayListFill,
} from "react-icons/ri";
import { CgSearch } from "react-icons/cg";

interface Track {
  id: string;
  title: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

const samplePlaylists: Playlist[] = [
  {
    id: "1",
    name: "Favorites",
    tracks: [
      { id: "1", title: "Bohemian Rhapsody" },
      { id: "2", title: "Hotel California" },
      { id: "3", title: "Stairway to Heaven" },
    ],
  },
  {
    id: "2",
    name: "Chill Vibes",
    tracks: [
      { id: "4", title: "Imagine" },
      { id: "5", title: "Yesterday" },
    ],
  },
  {
    id: "3",
    name: "Rock Classics",
    tracks: [
      { id: "6", title: "Sweet Child O' Mine" },
      { id: "7", title: "Back In Black" },
    ],
  },
];

interface LNBProps {
  onTrackClick?: (track: Track) => void;
}

export default function LNB({ onTrackClick }: LNBProps) {
  const [openFolders, setOpenFolders] = useState<string[]>([
    samplePlaylists[0].id,
  ]);
  const [activeTab, setActiveTab] = useState<"playlist" | "search">("playlist");
  const [search, setSearch] = useState("");

  const toggleFolder = (playlistId: string) => {
    setOpenFolders((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  return (
    <nav className="flex flex-col bg-[#252526] w-64 h-full border-r border-[#3c3c3c] select-none">
      {/* 상단 아이콘 탭 */}
      <div className="flex items-center gap-2 px-2 py-2 border-b border-[#3c3c3c] bg-[#23272e]">
        <button
          className={`p-2 rounded hover:bg-[#31363b] ${
            activeTab === "playlist"
              ? "bg-[#1e1e1e] text-[#007acc]"
              : "text-[#cccccc]"
          }`}
          onClick={() => setActiveTab("playlist")}
          title="Playlists"
        >
          <RiPlayListFill className="w-5 h-5" />
        </button>
        <button
          className={`p-2 rounded hover:bg-[#31363b] ${
            activeTab === "search"
              ? "bg-[#1e1e1e] text-[#007acc]"
              : "text-[#cccccc]"
          }`}
          onClick={() => setActiveTab("search")}
          title="Search"
        >
          <CgSearch className="w-5 h-5" />
        </button>
      </div>
      {/* 탭별 내용 */}
      {activeTab === "playlist" && (
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="text-xs text-[#cccccc] font-semibold tracking-wide mb-2 ml-1">
            EXPLORER
          </div>
          {samplePlaylists.map((playlist) => {
            const isOpen = openFolders.includes(playlist.id);
            return (
              <div key={playlist.id} className="mb-1">
                <button
                  className={`flex items-center gap-2 w-full px-1 py-1 rounded hover:bg-[#2a2d2e] text-left ${
                    isOpen ? "bg-[#23272e]" : ""
                  }`}
                  onClick={() => toggleFolder(playlist.id)}
                >
                  {isOpen ? (
                    <RiFolderOpenFill className="w-4 h-4 text-[#e7c787]" />
                  ) : (
                    <RiFolderFill className="w-4 h-4 text-[#e7c787]" />
                  )}
                  <span className="font-medium text-sm text-[#cccccc] truncate">
                    {playlist.name}
                  </span>
                </button>
                {isOpen && (
                  <div className="ml-6 mt-1">
                    {playlist.tracks.map((track) => (
                      <button
                        key={track.id}
                        className="flex items-center gap-2 w-full px-1 py-1 rounded hover:bg-[#31363b] text-left group"
                        onClick={() => onTrackClick?.(track)}
                      >
                        <RiMusic2Fill className="w-3 h-3 text-[#6a9955] opacity-80 group-hover:opacity-100" />
                        <span className="text-xs text-[#cccccc] truncate group-hover:text-[#fff]">
                          {track.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {activeTab === "search" && (
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for songs, artists..."
            className="w-full px-3 py-2 bg-[#3c3c3c] border border-[#5a5a5a] rounded text-[#cccccc] placeholder-[#969696] focus:outline-none focus:border-[#007acc]"
          />
          <div className="mt-4 text-sm text-[#969696]">
            {search ? (
              <div>검색 결과가 여기에 표시됩니다</div>
            ) : (
              <div>Type to search for songs or artists</div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
