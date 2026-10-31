import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { cn } from "@/lib/utils";
import { Song } from "@/types";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/songs/search", {
          params: { q: trimmed },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error searching songs:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current || containerRef.current.contains(event.target as Node)) return;

      setResults([]);
      if (!query.trim()) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  const handleOpen = () => {
    setIsOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleSelect = (song: Song) => {
    setCurrentSong(song);
    handleClose();
  };

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative flex flex-1 justify-center min-w-0 mx-1 sm:mx-4">
      <div
        className={cn(
          "flex h-9 items-center gap-2 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800/80 transition-all duration-200 ease-out",
          isOpen ? "w-full px-3" : "w-9 px-0",
          "sm:w-full sm:max-w-md sm:px-3"
        )}
      >
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Buscar canciones"
          className="flex size-5 shrink-0 items-center justify-center text-zinc-400 sm:cursor-default"
        >
          <Search className="size-4" />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
          placeholder="Buscar canciones o artistas..."
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none",
            isOpen ? "block" : "hidden",
            "sm:block"
          )}
        />

        {query && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Limpiar búsqueda"
            className="flex size-5 shrink-0 items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-1 right-1 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg sm:left-0 sm:right-0">
          {isSearching ? (
            <div className="p-3 text-sm text-zinc-400">Buscando...</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-zinc-400">No se encontraron resultados</div>
          ) : (
            results.map((song) => (
              <button
                key={song._id}
                type="button"
                onClick={() => handleSelect(song)}
                className="flex w-full items-center gap-3 p-2 text-left hover:bg-zinc-800"
              >
                <img src={song.imageUrl} alt={song.title} className="size-10 shrink-0 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{song.title}</p>
                  <p className="truncate text-xs text-zinc-400">{song.artist}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
