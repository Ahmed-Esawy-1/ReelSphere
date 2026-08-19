"use client";

import Image from "next/image";
import Link from "next/link";
import { moviesData } from "@/data/moviesData";
import { seriesData } from "@/data/seriesData";
import { sectionNames, Card } from "@/types/Card";

interface SearchResultsProps {
    query: string;
    locale: string;
    onSelect?: () => void;
    maxPerSection?: number;
}

// ---- SEARCH MATCH -------------------------------------------------------
function cardMatchesQuery(card: Card, q: string): boolean {
    const fields = [
        card.title?.en,
        card.title?.ar,
        card.body?.en,
        card.body?.ar,
    ];

    return fields.some((field) =>
        field ? field.toLowerCase().includes(q) : false,
    );
}

const SearchResults = ({
    query,
    locale,
    onSelect,
    maxPerSection = 6,
}: SearchResultsProps) => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return null;

    const lang = locale === "ar" ? "ar" : "en";

    // ITEMS
    const matches = [...moviesData, ...seriesData].filter((card) =>
        cardMatchesQuery(card, trimmed),
    );

    // NO ITEMS FOUND
    if (matches.length === 0) {
        return (
            <p className="text-sm text-emerald-100/50 px-4 py-6 text-center">
                {lang === "ar" ? "لا توجد نتائج" : "No results found"}
            </p>
        );
    }

    // ---- DIVIDE RESULTS INTO SECTION (series | movies) -------------------------------------
    const grouped = matches.reduce<Record<Card["section"], Card[]>>(
        (acc, card) => {
            acc[card.section].push(card);
            return acc;
        },
        { movies: [], series: [] },
    );

    return (
        <div className="flex flex-col gap-4">
            {(Object.keys(grouped) as Card["section"][]).map((section) => {
                const items = grouped[section].slice(0, maxPerSection);
                if (items.length === 0) return null;

                return (
                    <div key={section}>
                        <h3 className="text-xs uppercase tracking-widest text-emerald-100/40 px-4 mb-2">
                            {sectionNames[section][lang]}
                        </h3>
                        <div className="flex flex-col">
                            {items.map((card) => {
                                return (
                                    <Link
                                        key={`${card.section}-${card.id}`}
                                        href={`/${locale}/${card.section}/${card.id}`}
                                        onClick={onSelect}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#313633] transition-colors duration-200"
                                    >
                                        <div className="relative w-10 h-14 rounded-md overflow-hidden shrink-0 bg-emerald-900">
                                            <Image
                                                src={`/images/${card.imgSrc}`}
                                                alt={card.title[lang]}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-emerald-50 truncate">
                                                {card.title[lang]}
                                            </p>
                                            <p className="text-xs text-emerald-100/40">
                                                {card.year}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResults;
