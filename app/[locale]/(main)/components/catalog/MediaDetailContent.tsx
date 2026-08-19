"use client";

import { use } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PlayCircle, Star } from "@mui/icons-material";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { genres } from "@/data/genres";
import { actors } from "@/data/actors";
import type { seriesData } from "@/data/seriesData";
import VideoPlayer from "./videoPlayer";

type MediaItem = (typeof seriesData)[number];

interface MediaDetailContentProps {
    selectedMedia: MediaItem;
    locale: "en" | "ar";
    data: MediaItem[];
}

export default function MediaDetailContent({
    selectedMedia,
    locale,
    data,
}: MediaDetailContentProps) {
    const t = useTranslations("catalog");
    const isSeries = selectedMedia.section === "series";

    const title =
        locale === "ar" ? selectedMedia.title.ar : selectedMedia.title.en;
    const body =
        locale === "ar" ? selectedMedia.body.ar : selectedMedia.body.en;

    const similarMedia = !isSeries
        ? data
              .filter(
                  (item) =>
                      item.id !== selectedMedia.id &&
                      item.section === selectedMedia.section &&
                      item.types.some((tp) => selectedMedia.types.includes(tp)),
              )
              .slice(0, 8)
        : [];

    const hasSidebar = isSeries || similarMedia.length > 0;

    // --------------------------------------------------------------------------

    return (
        <div
            className={`flex flex-col gap-6 ${hasSidebar ? "xl:flex-row" : ""}`}
        >
            <section
                className={`flex flex-col relative overflow-hidden ${
                    hasSidebar ? "flex-1 w-full" : "w-full"
                }`}
            >
                <VideoPlayer
                    src="/videos/main.mp4"
                    poster={`/images/${selectedMedia.imgSrc}`}
                    title={title}
                />

                {/* INFO */}
                <div className="flex flex-col justify-end mt-8">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                            {t(`items.${selectedMedia.section}`)}
                        </span>
                        <span className="flex items-center gap-1 text-primary">
                            <Star className="!text-sm" />
                            <span className="text-sm font-bold">
                                {selectedMedia.rating}
                            </span>
                        </span>
                        <span className="text-on-surface-variant text-xs font-medium">
                            {selectedMedia.year}
                        </span>
                    </div>
                    <div>
                        <h1 className="font-title text-on-surface text-5xl md:text-8xl font-black tracking-tighter mb-6">
                            {title}
                        </h1>
                        <p className="max-w-xl text-on-surface-variant text-lg font-light italic leading-relaxed mb-8">
                            {body}
                        </p>
                    </div>
                    <div className="space-y-4 mb-8">
                        <h2 className="font-title text-on-surface text-2xl font-black tracking-tighter">
                            {t("tag")}
                        </h2>
                        <div className="flex items-center gap-4">
                            {selectedMedia.types.map(
                                (tp: keyof typeof genres) => (
                                    <span
                                        key={tp}
                                        className="px-4 py-1.5 bg-surface-container-low text-xs font-semibold border border-outline-variant/20 rounded-md hover:border-primary/50 transition-all"
                                    >
                                        {genres[tp][locale]}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="font-title text-on-surface text-2xl font-black tracking-tighter">
                            {t("cast")}
                        </h2>
                        <div className="flex items-center gap-4">
                            {selectedMedia.actors.map(
                                (a: keyof typeof actors) => (
                                    <span
                                        key={a}
                                        className="px-4 py-1.5 bg-surface-container-low text-xs font-semibold border border-outline-variant/20 rounded-md hover:border-primary/50 transition-all"
                                    >
                                        {actors[a][locale]}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* SERIES: episodes list */}
            {isSeries && (
                <section className="flex-1 space-y-6">
                    <h2 className="font-title text-on-surface text-3xl font-bold mb-2">
                        {t("episodes")}
                    </h2>
                    <div className="space-y-4 overflow-y-auto max-h-140 px-3">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                className="group relative flex flex-col md:flex-row gap-6 bg-surface-container-low p-4 border-l-4 border-primary rounded-xl transition-all"
                                key={i}
                            >
                                <div className="relative flex-shrink-0 w-full md:w-64 aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        width={256}
                                        height={144}
                                        alt={`${title} Poster`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={`/images/${selectedMedia.imgSrc}`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="text-primary text-4xl" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-white text-[10px] font-bold rounded">
                                        52m
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        {i === 0 ? (
                                            <>
                                                <span className="text-primary text-xs font-black uppercase tracking-tighter">
                                                    {t("playing")}
                                                </span>
                                                <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                                                <span className="text-on-surface-variant text-xs">
                                                    E01
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-on-surface-variant text-xs font-bold uppercase">
                                                {t("episode")} {i + 1}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-on-surface-variant text-sm font-light line-clamp-2">
                                        {body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* MOVIE*/}
            {!isSeries && similarMedia.length > 0 && (
                <section className="flex-1 space-y-6">
                    <h2 className="font-title text-on-surface text-3xl font-bold mb-2">
                        {t("similar")}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-140 px-3">
                        {similarMedia.map((item) => {
                            const itemTitle =
                                locale === "ar" ? item.title.ar : item.title.en;
                            return (
                                <Link
                                    key={item.id}
                                    href={`/${locale}/movies/${item.id}`}
                                    className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-surface-container-low"
                                >
                                    <Image
                                        fill
                                        alt={itemTitle}
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={`/images/${item.imgSrc}`}
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3">
                                        <p className="text-white text-sm font-bold line-clamp-2">
                                            {itemTitle}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
