import { getLocale, getTranslations } from "next-intl/server";

import Hero from "./components/home/Hero";
import MediaCard from "./components/MediaCard";
import Collections from "./components/home/Collections";
import LazySection from "./components/LazySection";
import SeriesSections from "./components/home/SeriesSections";
import NewReleaseCard from "./components/home/NewReleaseCard";

import { seriesData } from "@/data/seriesData";
import { moviesData } from "@/data/moviesData";
import { newReleaseData } from "@/data/NewReleaseData";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Card } from "@/types/Card";
import Link from "next/link";

export default async function Home() {
    const t = await getTranslations("home");
    const locale = getLocale();

    return (
        <>
            {/* HERO */}
            <Hero />
            <main className="relative z-10 -mt-12 px-8 md:px-16 pb-32 space-y-24">
                {/* BEST SERIES */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-xs font-bold tracking-widest uppercase">
                                {t("archive")}
                            </span>
                            <h2 className="text-on-surface text-4xl font-bold font-title">
                                {t("series")}
                            </h2>
                        </div>
                        <Link
                            className="flex items-center text-primary text-sm font-bold space-x-1 hover:underline"
                            href={`${locale}/series`}
                        >
                            <span>{t("all")}</span>
                            <ArrowForwardIcon className="!text-sm rtl:rotate-180" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {seriesData.slice(0, 12).map((series, i) => (
                            <div
                                key={series.id}
                                className={`
                                            ${i >= 10 ? "hidden md:block lg:hidden" : "block"}
                                `}
                            >
                                <MediaCard {...series} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* COLLECTIONS */}
                <Collections />

                {/* BEST MOVIES  */}
                <section>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-xs font-bold tracking-widest uppercase">
                                {t("archive")}
                            </span>
                            <h2 className="text-on-surface text-4xl font-bold font-title">
                                {t("movies")}
                            </h2>
                        </div>
                        <Link
                            className="flex items-center text-primary text-sm font-bold space-x-1 hover:underline"
                            href={`${locale}/movies`}
                        >
                            <span>{t("all")}</span>
                            <ArrowForwardIcon className="!text-sm rtl:rotate-180" />
                        </Link>
                    </div>

                    <LazySection className="min-h-[300px] block">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {moviesData
                                .slice(0, 12)
                                .map((movie: Card, i: number) => (
                                    <div
                                        key={movie.id}
                                        className={`
                                    ${i >= 10 ? "hidden md:block lg:hidden" : "block"}
                                `}
                                    >
                                        <MediaCard
                                            {...movie}
                                            actionType="add"
                                            section="movies"
                                        />
                                    </div>
                                ))}
                        </div>
                    </LazySection>
                </section>

                {/* SECTIONS */}
                <SeriesSections />

                {/* NEW RELEASES  */}
                <section>
                    <h2 className="text-on-surface text-4xl font-bold font-title mb-8">
                        {t("release")}
                    </h2>
                    <LazySection className="min-h-[300px] block">
                        <div className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide">
                            {newReleaseData.map((release, i) => (
                                <NewReleaseCard
                                    id={release.id}
                                    title={release.title}
                                    year={release.year}
                                    section={release.section}
                                    imgSrc={release.imgSrc}
                                    key={i}
                                />
                            ))}
                        </div>
                    </LazySection>
                </section>
            </main>
        </>
    );
}
