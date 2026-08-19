"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { genres } from "@/data/genres";
import { actors as actorsData } from "@/data/actors";
import { Card } from "@/types/Card";
import useMyList from "@/contexts/MyListItems";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";

interface MediaCardProps extends Card {
    showBody?: boolean;
    showStars?: boolean;
    showActors?: boolean;
    actionType?: "add" | "remove";
    priority?: boolean;
}

const MediaCard = ({
    id,
    title,
    body,
    types,
    actors: actorKeys = [],
    year,
    imgSrc,
    section,
    category,
    rating,
    showBody = false,
    showStars = false,
    showActors = false,
    actionType = "add",
    priority = false,
}: MediaCardProps) => {
    const locale = useLocale() as "en" | "ar";

    const displayTitle = locale === "en" ? title.en : title.ar;
    const displayBody = body ? (locale === "en" ? body.en : body.ar) : "";

    const { addToList, removeFromList } = useMyList();

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (actionType === "remove") {
            removeFromList(id);
            return;
        }

        addToList({
            id,
            title,
            body,
            types,
            actors: actorKeys,
            year,
            imgSrc,
            section,
            category,
            rating,
        } as Card);
    };

    return (
        <div className="group cursor-pointer">
            <div className="relative  bg-surface-container-high mb-3 rounded-b-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <Link
                    className="relative block aspect-[2/3]"
                    href={`/${locale}/${section}/${id}`}
                >
                    <Image
                        alt={`${displayTitle} Poster`}
                        className="object-cover"
                        fill
                        src={`/images/${imgSrc}`}
                        loading={priority ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-300" />
                </Link>

                <div className="absolute bottom-2 ltr:right-2 rtl:left-2 bg-emerald-950/80 px-2 py-1 text-primary text-[10px] font-bold rounded backdrop-blur-sm">
                    {year}
                </div>

                {actionType === "remove" ? (
                    <button
                        className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center justify-center w-8 h-8 bg-black/40 hover:bg-red-600/80 text-on-surface rounded-full backdrop-blur-md transition-colors duration-300"
                        onClick={handleActionClick}
                    >
                        <CloseIcon className="!text-sm" />
                    </button>
                ) : (
                    <div
                        className="watch-list-icon"
                        onClick={handleActionClick}
                    >
                        <AddIcon sx={{ fontSize: "22px" }} />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start mb-1 gap-2">
                <h3 className="text-on-surface text-lg font-bold font-title truncate">
                    {displayTitle}
                </h3>
                {showStars && (
                    <span className="flex items-center gap-1 shrink-0">
                        <StarIcon className="!text-base text-yellow-400" />
                        <span className="text-xs font-bold">{rating}</span>
                    </span>
                )}
            </div>

            {showBody && displayBody && (
                <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2 opacity-80 mb-2">
                    {displayBody}
                </p>
            )}

            <p className="text-text text-xs">
                {types
                    .slice(0, 3)
                    .map((k) => genres[k][locale])
                    .join(" & ")}
                {showActors &&
                    actorKeys.length > 0 &&
                    ` • ${actorKeys
                        .slice(0, 2)
                        .map((k) => actorsData[k][locale])
                        .join(" & ")}`}
            </p>
        </div>
    );
};

export default MediaCard;
