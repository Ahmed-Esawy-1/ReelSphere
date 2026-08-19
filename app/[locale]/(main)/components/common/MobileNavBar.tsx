"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import dynamic from "next/dynamic";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";

const SearchResults = dynamic(() => import("./SearchResults"), {
    ssr: false,
});

const MobileNavBar = () => {
    const locale = useLocale();
    const t = useTranslations("common.Header");

    // ---- SCROLL VISIBILITY ----
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    // ---- SEARCH OVERLAY ----
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // ---- HANDLE NAV APPEAR --------------------------------------------------------
    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const diff = currentScrollY - lastScrollY.current;

            if (currentScrollY < 60) {
                setVisible(true);
            } else if (diff > 8) {
                setVisible(false);
            } else if (diff < -8) {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        const handleTap = () => {
            if (mobileSearchOpen) return; // don't fight the overlay
            setVisible(true);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("touchstart", handleTap, { passive: true });
        window.addEventListener("click", handleTap);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchstart", handleTap);
            window.removeEventListener("click", handleTap);
        };
    }, [mobileSearchOpen]);

    // ---- OPEN SEARCH ----------------------------------------------------------
    function openSearch() {
        setMobileSearchOpen(true);
        setVisible(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    // ---- CLOSE SEARCH (after select item) ---------------------------------------------------------------------------
    function closeSearch() {
        setMobileSearchOpen(false);
        setSearchQuery("");
    }

    return (
        <>
            <nav
                className={`md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-3 px-6 bg-emerald-950/80 rounded-t-3xl backdrop-blur-lg shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out ${
                    visible ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <Link
                    href={`/`}
                    className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform"
                >
                    <HomeIcon />
                    <span className="text-[10px] uppercase tracking-widest mt-1">
                        {t("home")}
                    </span>
                </Link>

                <Link
                    href={`/${locale}/series`}
                    className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform"
                >
                    <VideoLibraryIcon />
                    <span className="text-[10px] uppercase tracking-widest mt-1">
                        {t("series")}
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        openSearch();
                    }}
                    className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform"
                >
                    <SearchIcon />
                    <span className="text-[10px] uppercase tracking-widest mt-1">
                        {t("search")}
                    </span>
                </button>

                <Link
                    href={`/${locale}/myList`}
                    className="flex flex-col items-center justify-center text-emerald-100/40 hover:text-emerald-200 active:scale-95 transition-transform"
                >
                    <BookmarkIcon />
                    <span className="text-[10px] uppercase tracking-widest mt-1">
                        {t("myList")}
                    </span>
                </Link>
            </nav>

            {/* MOBILE SEARCH OVERLAY */}
            {mobileSearchOpen && (
                <div className="md:hidden fixed inset-0 z-[70] bg-emerald-950/95 backdrop-blur-xl flex flex-col">
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-emerald-100/10">
                        <SearchIcon className="text-emerald-100/50" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("searchPlaceholder")}
                            className="flex-1 bg-transparent text-emerald-50 placeholder:text-emerald-100/40 focus:outline-none text-base"
                        />
                        <button onClick={closeSearch} aria-label="close search">
                            <CloseIcon className="text-emerald-100/70" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 py-2">
                        <SearchResults
                            query={searchQuery}
                            locale={locale}
                            onSelect={closeSearch}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNavBar;
