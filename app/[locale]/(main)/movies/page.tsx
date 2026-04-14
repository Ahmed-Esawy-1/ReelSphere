"use client";
import { useEffect, useRef, useState } from "react";
import { moviesData } from "../data/moviesData";
import { moviesTypes } from "../data/movieTypes";
import MovieCard from "../components/MovieCard";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const page = () => {
  const [visible, setVisible] = useState<number>(20);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function loadMore() {
    setLoading(true);
    setTimeout(
      () => {
        setVisible((prev) => prev + 10);
        setLoading(false);
      },
      Math.random() * 2000 + 500,
    );
  }

  function handleSelectedType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  const filterdMovies =
    selectedTypes.length === 0
      ? moviesData
      : moviesData.filter((movie) =>
          movie.type.some((type) => selectedTypes.includes(type)),
        );

  useEffect(() => {
    setVisible(20);
  }, [selectedTypes]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 md:px-12">
      {/* <!-- Header Section --> */}
      <header className="mb-16">
        <h1 className="text-on-surface text-6xl md:text-8xl font-bold tracking-tight mb-3">
          The Archive
        </h1>
        <p className="max-w-2xl text-text text-lg leading-relaxed mb-8">
          A curated journey through the lens of history. Explore the definitive
          collection of Egyptian cinema's golden eras, preserved for the modern
          connoisseur.
        </p>

        {/* <!-- Filter System --> */}
        <div
          ref={dropdownRef}
          className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-surface-container-low p-6 rounded-xl"
        >
          <div className="relative flex-1 max-w-2xl">
            <SearchIcon className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              className="w-full py-4 pl-12 pr-4 bg-surface-container-low text-on-surface text-lg outline-none border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-all"
              placeholder="Search the cinematic heritage..."
              type="text"
            />
          </div>
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="text-outline text-xs uppercase tracking-widest ltr:mr-2 rtl:ml-2">
              Filter By:
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              className="px-4 py-1.5 bg-surface-container-low text-xs font-semibold border border-outline-variant/20 rounded-md hover:border-primary/50 transition-all"
            >
              Genre
            </button>
            <button className="ml-4 p-2 text-primary hover:bg-primary-container/10 rounded-full transition-all">
              <TuneIcon />
            </button>
          </div>
          {open && (
            <ul className="absolute top-full left-full -translate-x-full w-80 p-3 bg-surface-container-low z-10">
              {moviesTypes.map((type: string) => (
                <li key={type}>
                  <label className="flex items-center gap-3 text-emerald-100/60 hover:text-emerald-50 transition-colors cursor-pointer">
                    <input
                      className="rounded-none"
                      type="checkbox"
                      name="price"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleSelectedType(type)}
                    />
                    {type}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      {/* <!-- Movies --> */}
      {filterdMovies.length === 0 ? (
        <div className="text-4xl font-bold w-full text-center">
          There are no movies to watch
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filterdMovies.slice(0, visible).map((movie) => (
            <MovieCard
              id={movie.id}
              title={movie.title}
              type={movie.type}
              actors={movie.actors}
              year={movie.year}
              imgSrc={movie.imgSrc}
              key={movie.id}
            />
          ))}
        </div>
      )}

      {/* <!-- Load More --> */}
      {visible < filterdMovies.length && (
        <div className="mt-20 flex justify-center">
          <button
            disabled={isLoading}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold tracking-wide hover:scale-105 transition-transform"
            onClick={loadMore}
          >
            {isLoading ? "Loading..." : "Load More Movies"}
          </button>
        </div>
      )}
    </main>
  );
};

export default page;
