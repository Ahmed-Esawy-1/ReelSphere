import { getLocale, getTranslations } from "next-intl/server";

import CollectionCard from "./CollectionCard";
import LazySection from "../LazySection";

const Collections = async () => {
    const t = await getTranslations("home.Collections");
    const locale = (await getLocale()) as "en" | "ar";

    return (
        <section>
            <h2 className="text-4xl font-title font-bold text-on-surface mb-8">
                {t("collection")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-[1500px] md:h-[650px]">
                <div className="lg:col-span-2 lg:row-span-2 relative group rounded-xl overflow-hidden cursor-pointer">
                    <LazySection className="w-full h-full">
                        <CollectionCard
                            title={t("actionMovies")}
                            imgSrc={"actionMovies.webp"}
                            path={`${locale}/movies?genre=action`}
                        />
                    </LazySection>
                </div>

                <div className="lg:col-span-2 relative group rounded-xl overflow-hidden cursor-pointer">
                    <LazySection className="w-full h-full">
                        <CollectionCard
                            title={t("ramadanSeries")}
                            imgSrc={"ramadanSeries.webp"}
                            path={`${locale}/series?category=ramadan`}
                        />
                    </LazySection>
                </div>

                <div className="relative group rounded-xl overflow-hidden cursor-pointer">
                    <LazySection className="w-full h-full">
                        <CollectionCard
                            title={t("dramaSeries")}
                            imgSrc={"dramaSeries.webp"}
                            path={`${locale}/series?genre=drama`}
                        />
                    </LazySection>
                </div>

                <div className="relative group rounded-xl overflow-hidden cursor-pointer">
                    <LazySection className="w-full h-full">
                        <CollectionCard
                            title={t("shortSeries")}
                            imgSrc={"shortSeries.webp"}
                            path={`${locale}/series?category=shorts`}
                        />
                    </LazySection>
                </div>
            </div>
        </section>
    );
};

export default Collections;
