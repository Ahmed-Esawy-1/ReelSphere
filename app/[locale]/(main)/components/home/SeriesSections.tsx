import { getTranslations } from "next-intl/server";
import LazySection from "../LazySection";
import SwiperCards from "../SwiperCards";
import { seriesData } from "@/data/seriesData";
import { Card } from "@/types/Card";

const SeriesSections = async () => {
    const t = await getTranslations("home.Series");

    const seriesSections = [
        {
            key: "ramadanSeries",
            filter: (s: Card) => s.category.includes("ramadan"),
        },
        {
            key: "shortSeries",
            filter: (s: Card) => s.category.includes("shorts"),
        },
        {
            key: "dramaSeries",
            filter: (s: Card) => s.types.includes("drama"),
        },
        {
            key: "actionSeries",
            filter: (s: Card) => s.types.includes("action"),
        },
        {
            key: "comedySeries",
            filter: (s: Card) => s.types.includes("comedy"),
        },
        { key: "newSeries", filter: (s: Card) => Number(s.year) >= 2024 },
    ];

    return (
        <>
            {seriesSections.map(({ key, filter }) => {
                const cards = seriesData.filter(filter);

                if (seriesSections.length === 0) return null;

                return (
                    <LazySection key={key} className="min-h-[350px]">
                        <SwiperCards title={t(key)} cards={cards} />
                    </LazySection>
                );
            })}
        </>
    );
};

export default SeriesSections;
