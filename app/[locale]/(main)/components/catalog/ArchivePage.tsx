"use client";

import { useLocale, useTranslations } from "next-intl";
import CardLoading from "../loading/CardLoading";
import MediaCard from "../MediaCard";
import { genres } from "@/data/genres";
import { toGenreOptions } from "@/utils/toGenreOptions";
import { useMediaFilter } from "@/hooks/useMediaFilter";

import SearchIcon from "@mui/icons-material/Search";
import { Card } from "@/types/Card";

const genreOptions = toGenreOptions(genres);

interface ArchivePageProps {
    data: Card[];
    category?: string;
    genre?: string;
}

export default function ArchivePage({
    data,
    category,
    genre,
}: ArchivePageProps) {
    const locale = useLocale();
    const t = useTranslations("catalog");

    const section = data[0]?.section;

    const {
        visible,
        open,
        setOpen,
        filterLoading,
        isLoading,
        selectedTypes,
        search,
        setSearch,
        dropdownRef,
        handleSelectedType,
        loadMore,
        filtered,
    } = useMediaFilter({ data, category, genre });

    return (
        <main className="pt-32 pb-24 px-6 md:px-12">
            <div className="mb-16">
                <h1 className="text-on-surface text-6xl md:text-8xl font-bold tracking-tight mb-3">
                    {t("title")}
                </h1>
                <p className="max-w-2xl text-text text-lg leading-relaxed mb-8">
                    {t("description")}
                </p>

                {/* FILTER */}
                <div
                    ref={dropdownRef}
                    className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-surface-container-low p-6 rounded-xl"
                >
                    <div className="relative flex-1 max-w-2xl">
                        <SearchIcon className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full py-4 pl-4 pr-4 bg-surface-container-low text-on-surface text-lg outline-none border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-all"
                            placeholder={t("search")}
                        />
                    </div>
                    <div className="relative flex flex-wrap items-center gap-3">
                        <span className="text-outline text-xs uppercase tracking-widest ltr:mr-2 rtl:ml-2">
                            {t("filterBy")}
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen((prev) => !prev);
                            }}
                            className="px-4 py-1.5 bg-surface-container-low text-xs font-semibold border border-outline-variant/20 rounded-md hover:border-primary/50 transition-all"
                        >
                            {t("genre")}
                        </button>
                    </div>
                    {/* GENRE MENU */}
                    {open && (
                        <ul className="absolute top-full inset-x-0 sm:inset-x-auto sm:w-80 lg:ltr:right-0 lg:rtl:left-0 z-40 bg-surface-container-low mt-2 p-3 border border-outline-variant/20 rounded-md shadow-lg">
                            {genreOptions.map((genre) => (
                                <li key={genre.key}>
                                    <label className="flex items-center gap-3 text-emerald-100/60 hover:text-emerald-50 transition-colors cursor-pointer">
                                        <input
                                            className="rounded-none"
                                            type="checkbox"
                                            name="genre"
                                            checked={selectedTypes.includes(
                                                genre.key,
                                            )}
                                            onChange={() =>
                                                handleSelectedType(genre.key)
                                            }
                                        />
                                        {locale === "en" ? genre.en : genre.ar}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* RESULTE */}
            {filterLoading ? (
                // LOADING
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <CardLoading key={i} />
                    ))}
                </div>
            ) : // NO ITEMS
            filtered.length === 0 ? (
                <div className="text-4xl font-bold w-full text-center">
                    {t("emptyLabel", {
                        item: t(
                            `items.${section === "series" ? "series" : "movies"}`,
                        ),
                    })}
                </div>
            ) : (
                // ITEMS
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filtered.slice(0, visible).map((item) => (
                        <MediaCard key={item.id} {...item} />
                    ))}
                </div>
            )}

            {/* LOAD MORE */}
            {visible < filtered.length && (
                <div className="mt-20 flex justify-center">
                    <button
                        disabled={isLoading}
                        className="px-12 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold tracking-wide hover:scale-105 transition-transform"
                        onClick={loadMore}
                    >
                        {isLoading
                            ? t("loading")
                            : t("loadMore", {
                                  item: t(
                                      `items.${section === "series" ? "series" : "movies"}`,
                                  ),
                              })}
                    </button>
                </div>
            )}
        </main>
    );
}
