import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Hero");
  return (
    <section className="relative w-full h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Featured Classic Hero"
          className="w-full h-full object-cover"
          src="/images/hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
      </div>
      <div className="relative max-w-4xl px-8 md:px-16 pb-24 z-10">
        <div className="inline-block px-3 py-1  mb-6 bg-primary/20 border border-primary/30 rounded-md backdrop-blur-md">
          <span className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">
            {t("featured")}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-on-surface tracking-tighter mb-10">
          {t("title1")} <span className="text-primary">{t("title2")}</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-text leading-relaxed mb-8">
          {t("body")}
        </p>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:opacity-90 transition-opacity">
            <PlayArrowIcon />
            <span>{t("watch")}</span>
          </button>
          <button className="flex items-center px-8 py-4 space-x-2 bg-surface-container-high/40 text-on-surface font-bold border border-outline-variant/30 rounded-lg hover:bg-surface-container-high backdrop-blur-md transition-colors cursor-pointer">
            <AddIcon />
            <span>{t("list")}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
