const MobileNavBar = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-3 px-6 bg-emerald-950/80 rounded-t-3xl backdrop-blur-lg shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">movie</span>
        <span className="text-[10px] uppercase tracking-widest mt-1">Home</span>
      </div>
      <div className="flex flex-col items-center justify-center text-emerald-400 active:scale-95 after:content-[''] after:w-1 after:h-1 after:bg-emerald-400 after:rounded-full after:mt-1  transition-transform">
        <span
          className="material-symbols-outlined"
          data-icon="search"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          search
        </span>
        <span className="text-[10px] uppercase tracking-widest mt-1">
          Explore
        </span>
      </div>
      <div className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">video_library</span>
        <span className="text-[10px] uppercase tracking-widest mt-1">
          Library
        </span>
      </div>
      <div className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] uppercase tracking-widest mt-1">
          Profile
        </span>
      </div>
    </nav>
  );
};

export default MobileNavBar;
