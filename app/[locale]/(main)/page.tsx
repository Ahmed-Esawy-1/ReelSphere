import Hero from "./components/Hero";
import LazySection from "./components/LazySection";
import MovieCard from "./components/MovieCard";
import CollectionCard from "./components/CollectionCard";
import NewReleaseCard from "./components/NewReleaseCard";
import { seriesData } from "./data/seriesData";
import { moviesData } from "./data/moviesData";
import { newReleaseData } from "./data/NewReleaseData";
import { useTranslations } from "next-intl";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SwiperCards from "./components/SwiperCards.dynamic";

export default function Home() {
  const t = useTranslations("Main");

  return (
    <>
      <Hero />
      <main className="relative z-10 -mt-12 px-8 md:px-16 pb-32 space-y-24">
        {/* Best Series  */}
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
            <a
              className="flex items-center text-primary text-sm font-bold space-x-1 hover:underline"
              href="#"
            >
              <span>{t("all")}</span>
              <ArrowForwardIcon className="!text-sm" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {seriesData.slice(0, 12).map((series, i) => (
              <div
                key={series.id}
                className={`
                  ${i >= 10 ? "hidden md:block lg:hidden" : "block"}
                `}
              >
                <MovieCard
                  id={series.id}
                  title={series.title}
                  type={series.type}
                  actors={series.actors}
                  year={series.year}
                  imgSrc={series.imgSrc}
                />
              </div>
            ))}
          </div>
        </section>
        {/* Collections */}
        <section>
          <h2 className="text-4xl font-title font-bold font-title text-on-surface mb-8">
            Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-[1500px] md:h-[650px]">
            <div className="lg:col-span-2 lg:row-span-2 relative group rounded-xl overflow-hidden cursor-pointer">
              <CollectionCard
                title={t("collections.cardOne.title")}
                subTitle=""
                body={t("collections.cardOne.body")}
                imgSrc={"collections-classic_movies.png"}
                path="movies"
              />
            </div>
            <div className="lg:col-span-2 relative group rounded-xl overflow-hidden cursor-pointer">
              <CollectionCard
                title={t("collections.cardTwo.title")}
                subTitle=""
                body={t("collections.cardTwo.body")}
                imgSrc={"collections-ramadan_series.png "}
                path="series?category=ramadan"
              />
            </div>
            <div className="relative group rounded-xl overflow-hidden cursor-pointer">
              <CollectionCard
                title={t("collections.cardThree.title")}
                subTitle=""
                body={t("collections.cardThree.body")}
                imgSrc={"collections_series.webp"}
                path="series?category=old"
              />
            </div>

            <div className="relative group rounded-xl overflow-hidden cursor-pointer">
              <CollectionCard
                title={t("collections.cardFour.title")}
                subTitle=""
                body={t("collections.cardFour.body")}
                imgSrc={"collections-short_series.png"}
                path="series?category=short"
              />
            </div>
          </div>
        </section>
        {/* Best Movies  */}
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
            <a
              className="flex items-center text-primary text-sm font-bold space-x-1 hover:underline"
              href="#"
            >
              <span>{t("all")}</span>
              <ArrowForwardIcon className="!text-sm" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {moviesData.slice(0, 12).map((movie, i) => (
              <div
                key={movie.id}
                className={`
                ${i >= 10 ? "hidden md:block lg:hidden" : "block"}
              `}
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  type={movie.type}
                  actors={movie.actors}
                  year={movie.year}
                  imgSrc={movie.imgSrc}
                  key={movie.id}
                />
              </div>
            ))}
          </div>
        </section>
        {/* Sections */}
        <LazySection>
          <SwiperCards title="Drama Series" cards={moviesData.slice(0, 10)} />
        </LazySection>

        <LazySection>
          <SwiperCards title="Action Series" cards={moviesData.slice(0, 10)} />
        </LazySection>

        <LazySection>
          <SwiperCards title="New Series" cards={moviesData.slice(0, 10)} />
        </LazySection>

        <LazySection>
          <SwiperCards title="Ramadan Series" cards={moviesData.slice(0, 10)} />
        </LazySection>

        <LazySection>
          <SwiperCards title="Short Series" cards={moviesData.slice(0, 10)} />
        </LazySection>
        {/* New Releases  */}
        <section>
          <h2 className="text-on-surface text-4xl font-bold font-title mb-8">
            {t("release")}
          </h2>

          <div className="flex space-x-6 pb-8 overflow-x-auto scrollbar-hide">
            {newReleaseData.map((release, i) => (
              <NewReleaseCard
                title={release.title}
                imgSrc={release.imgSrc}
                key={i}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
