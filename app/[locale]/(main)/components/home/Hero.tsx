import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";

import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";

const Hero = async () => {
    const t = await getTranslations("home.Hero");
    const locale = (await getLocale()) as "en" | "ar";

    return (
        <section className="relative w-full h-screen flex items-end overflow-hidden">
            {/* IMAGE */}
            <div className="absolute inset-0 z-0">
                <Image
                    alt="Featured Classic Hero"
                    className="object-cover"
                    src="/images/hero.webp"
                    fill
                    priority
                    sizes="100vw"
                    quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
            </div>
            {/* CONTENT */}
            <div className="relative max-w-4xl px-8 md:px-16 pb-24 z-10">
                <div className="inline-block px-3 py-1  mb-6 bg-primary/20 border border-primary/30 rounded-md backdrop-blur-md">
                    <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">
                        {t("featured")}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-on-surface tracking-tighter mb-10">
                    {t("title1")}{" "}
                    <span className="text-primary">{t("title2")}</span>
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-text leading-relaxed mb-8">
                    {t("body")}
                </p>
                {/* BUTTONS */}
                <div className="flex items-center space-x-4">
                    <Link
                        href={`/${locale}/series`}
                        className="flex items-center space-x-2 px-4 sm:px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <PlayArrowIcon />
                        <span>{t("watch")}</span>
                    </Link>
                    <Link
                        href={`/${locale}/myList`}
                        className="flex items-center space-x-2 px-4 sm:px-8 py-4  bg-surface-container-high/40 text-on-surface font-bold border border-outline-variant/30 rounded-lg hover:bg-surface-container-high backdrop-blur-md transition-colors cursor-pointer"
                    >
                        <AddIcon />
                        <span>{t("list")}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
