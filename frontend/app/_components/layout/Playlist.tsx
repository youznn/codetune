import { useState } from "react";
import { RiPlayFill, RiPauseFill, RiMoreLine } from "react-icons/ri";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isPlaying?: boolean;
}

const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    isPlaying: true,
  },
  {
    id: "2",
    title: "Hotel California",
    artist: "Eagles",
    duration: "6:30",
  },
  {
    id: "3",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: "8:02",
  },
  {
    id: "4",
    title: "Imagine",
    artist: "John Lennon",
    duration: "3:03",
  },
  {
    id: "5",
    title: "Yesterday",
    artist: "The Beatles",
    duration: "2:05",
  },
];

const samplePlaylists = [
  { id: "1", name: "Favorites", trackCount: 127 },
  { id: "2", name: "Recently Added", trackCount: 23 },
  { id: "3", name: "Workout Mix", trackCount: 45 },
  { id: "4", name: "Chill Vibes", trackCount: 89 },
  { id: "5", name: "Rock Classics", trackCount: 156 },
];

export default function Playlist() {
  const [selectedPlaylist, setSelectedPlaylist] = useState("1");
  const [tracks] = useState<Track[]>(sampleTracks);

  return (
    <div className="h-full flex flex-col">
      {/* Playlist Header */}
      <div className="p-4 border-b border-[#3c3c3c]">
        <h2 className="text-lg font-semibold text-[#cccccc] mb-3">Playlists</h2>
        <div className="space-y-1">
          {samplePlaylists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist.id)}
              className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                selectedPlaylist === playlist.id
                  ? "bg-[#37373d] text-[#007acc]"
                  : "text-[#cccccc] hover:bg-[#2a2d2e]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate">{playlist.name}</span>
                <span className="text-xs text-[#969696]">
                  {playlist.trackCount}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tracks List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-md font-medium text-[#cccccc] mb-3">
            {samplePlaylists.find((p) => p.id === selectedPlaylist)?.name} -
            Tracks
          </h3>
          <div className="space-y-1">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2a2d2e] transition-colors group"
              >
                <button className="text-[#969696] hover:text-[#007acc] transition-colors">
                  {track.isPlaying ? (
                    <RiPauseFill className="w-4 h-4" />
                  ) : (
                    <RiPlayFill className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[#cccccc] truncate">
                    {track.title}
                  </div>
                  <div className="text-xs text-[#969696] truncate">
                    {track.artist}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#969696]">
                    {track.duration}
                  </span>
                  <button className="text-[#969696] hover:text-[#cccccc] transition-colors opacity-0 group-hover:opacity-100">
                    <RiMoreLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Now Playing Bar */}
      <div className="p-4 border-t border-[#3c3c3c] bg-[#252526]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3c3c3c] rounded flex items-center justify-center">
            <RiPlayFill className="w-5 h-5 text-[#969696]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[#cccccc] truncate">
              Bohemian Rhapsody
            </div>
            <div className="text-xs text-[#969696] truncate">Queen</div>
          </div>
          <div className="text-xs text-[#969696]">2:34 / 5:55</div>
        </div>
        <div className="mt-2">
          <div className="w-full bg-[#3c3c3c] rounded-full h-1">
            <div
              className="bg-[#007acc] h-1 rounded-full"
              style={{ width: "42%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
