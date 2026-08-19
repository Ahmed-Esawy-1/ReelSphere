import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AccessibilityForm from "./AccessibilityForm";

import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

const page = async () => {
    const t = await getTranslations("accessibility");

    // -----------------------------------------------------------------------
    return (
        <main className="pt-32 pb-24 px-6 md:px-12">
            {/* HERO */}
            <header className="mb-20">
                <div className="relative w-full h-96 mb-12 shadow-2xl rounded-xl overflow-hidden">
                    <Image
                        src="/images/accessibility_hero_section.webp"
                        fill
                        sizes="100vw"
                        alt="Reel Sphere accessibility hero image"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 rtl:left-auto rtl:right-12">
                        <div className="inline-block bg-primary-container px-3 py-1 text-on-primary-container text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-4">
                            {t("hero.badge")}
                        </div>
                        <h1 className="font-title text-on-background text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
                            {t("hero.title")} <br />
                            <span className="text-primary italic">
                                {t("hero.titleHighlight")}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                    <p className="font-title text-on-surface-variant text-xl leading-relaxed">
                        {t("hero.intro")}
                    </p>
                    <div className="flex justify-start md:justify-end rtl:md:justify-start">
                        <div className="w-24 h-[2px] bg-primary/30"></div>
                    </div>
                </div>
            </header>
            {/* ALL ACCESSIBILITY */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
                {/* Card 1 Screen Readers */}
                <div className="md:col-span-7 flex flex-col justify-between bg-surface-container-low p-8 rounded-xl hover:bg-surface-container-high transition-colors duration-300">
                    <div>
                        <GraphicEqIcon className="text-primary text-4xl mb-6" />
                        <h3 className="font-title text-3xl font-bold mb-4">
                            {t("screenReaders.title")}
                        </h3>
                        <p className="text-on-surface-variant leading-relaxed max-w-md">
                            {t("screenReaders.description")}
                        </p>
                    </div>
                    <div className="mt-8 flex gap-2">
                        <span className="bg-surface-variant px-3 py-1 text-primary text-[10px] font-bold uppercase tracking-widest rounded-md">
                            {t("screenReaders.badge")}
                        </span>
                    </div>
                </div>
                {/* CARD 2 Visual Clarity */}
                <div className="md:col-span-5 bg-surface-container-highest p-8 rounded-xl hover:bg-surface-bright transition-colors duration-300">
                    <VisibilityIcon className="text-primary text-4xl mb-6" />
                    <h3 className="font-title text-2xl font-bold mb-4">
                        {t("visualClarity.title")}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        {t("visualClarity.description")}
                    </p>
                    <ul className="space-y-3 text-on-surface/70 text-xs font-bold uppercase tracking-wide">
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            {t("visualClarity.highContrast")}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            {t("visualClarity.textScaling")}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            {t("visualClarity.motionReduction")}
                        </li>
                    </ul>
                </div>
                {/* CARD 3 Interaction */}
                <div className="md:col-span-4 bg-primary-container/20 p-8 border border-primary/10 rounded-xl">
                    <KeyboardIcon className="text-primary text-4xl mb-6" />
                    <h3 className="font-title text-2xl font-bold mb-4">
                        {t("keyboardNavigation.title")}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                        {t("keyboardNavigation.description")}
                    </p>
                </div>
                {/* CARD 4 Captions */}
                <div className="md:col-span-8 flex flex-col md:flex-row gap-8 items-center bg-surface-container-low p-8 rounded-xl">
                    <div className="flex-1">
                        <ClosedCaptionIcon className="text-primary text-4xl mb-6" />
                        <h3 className="font-title text-2xl font-bold mb-4">
                            {t("transcripts.title")}
                        </h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            {t("transcripts.description")}
                        </p>
                    </div>
                    <div className="w-full md:w-48 h-32 flex items-center justify-center overflow-hidden bg-surface-container-highest rounded-lg">
                        <Image
                            width={192}
                            height={128}
                            alt="Reel Sphere descriptive transcripts preview"
                            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                            src="/images/descriptiveTranscripts.webp"
                        />
                    </div>
                </div>
            </section>
            {/* LAST SECTION */}
            <section className="relative bg-surface-container-low p-12 rounded-2xl overflow-hidden mb-24">
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 rtl:-ml-32 rtl:mr-0"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* SUPPORT */}
                    <div>
                        <h2 className="font-title text-4xl font-bold mb-6">
                            {t("support.title")}
                        </h2>
                        <p className="text-on-surface-variant leading-relaxed mb-8">
                            {t("support.description")}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-surface-variant rounded-full">
                                    <MailIcon className="text-primary text-sm" />
                                </div>
                                <span
                                    className="text-on-surface font-bold"
                                    dir="ltr"
                                >
                                    {t("support.email")}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-surface-variant rounded-full">
                                    <CallIcon className="text-primary text-sm" />
                                </div>
                                <span
                                    className="text-on-surface font-bold"
                                    dir="ltr"
                                >
                                    {t("support.phone")}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* CONTACT */}
                    <div className="bg-surface-container-lowest p-8 border border-outline-variant/30 rounded-xl ">
                        <h4 className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                            {t("form.title")}
                        </h4>

                        {/* FORM */}
                        <AccessibilityForm />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default page;
