import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GavelIcon from "@mui/icons-material/Gavel";

const page = async () => {
    const locale = (await getLocale()) as "en" | "ar";
    const t = await getTranslations("terms");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12">
            {/* HEADER */}
            <header className="mb-20">
                <div className="inline-block px-3 py-1 bg-primary-container/20 border border-primary/20 rounded-md mb-4">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                        {t("effectiveDate")}
                    </span>
                </div>
                <h1 className="text-on-background text-5xl md:text-7xl font-bold leading-tight mb-8">
                    {t("title")}{" "}
                    <span className="text-primary italic">
                        {t("titleHighlight")}
                    </span>
                </h1>
                <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
                    {t("intro")}
                </p>
            </header>
            {/*  ALL TERMS  */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
                {/*  INTRODUCTION  */}
                <section className="md:col-span-12 bg-surface-container-low p-8 border-l-4 rtl:border-l-0 rtl:border-r-4 border-primary/40 rounded-xl">
                    <h2 className="text-on-surface text-2xl mb-4">
                        {t("acceptance.title")}
                    </h2>
                    <p className="text-on-surface-variant leading-loose">
                        {t("acceptance.description")}
                    </p>
                </section>
                {/* INTRLLECTUAL PROPERTY  */}
                <section className="md:col-span-8 flex flex-col justify-between bg-surface-container-high p-8 rounded-xl">
                    <div>
                        <h2 className="text-on-surface text-2xl mb-4">
                            {t("intellectualProperty.title")}
                        </h2>
                        <p className="text-on-surface-variant leading-loose mb-6">
                            {t("intellectualProperty.description")}
                        </p>
                        <ul className="space-y-4 text-on-surface-variant">
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon className="text-primary" />
                                <span>{t("intellectualProperty.allowed")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CancelIcon className="text-error" />
                                <span>
                                    {t("intellectualProperty.prohibited")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>
                {/* IMAGE */}
                <div className="md:col-span-4 relative rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                    <Image
                        alt="Cinematic vintage film reel"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        fill
                        src="/images/termsOfUse.webp"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                    />
                    <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-20">
                        <span className="font-title text-primary text-sm italic">
                            {t("intellectualProperty.imageCaption")}
                        </span>
                    </div>
                </div>
                {/*  USER CONDUCT */}
                <section className="md:col-span-12 relative bg-surface-container-lowest p-10 border border-outline-variant/10 rounded-xl overflow-hidden">
                    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-4 opacity-15 pointer-events-none">
                        <GavelIcon className="!text-[120px] text-primary" />
                    </div>
                    <h2 className="flex items-center gap-3 text-on-surface text-2xl mb-6">
                        <span className="text-primary font-bold">03.</span>{" "}
                        {t("userConduct.title")}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-primary-fixed text-lg">
                                {t("userConduct.responsibilities.title")}
                            </h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                {t("userConduct.responsibilities.description")}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-primary-fixed text-lg">
                                {t("userConduct.prohibitedActivities.title")}
                            </h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">
                                {t(
                                    "userConduct.prohibitedActivities.description",
                                )}
                            </p>
                        </div>
                    </div>
                </section>
                {/* MEMBERSHIP  */}
                <section className="md:col-span-5 bg-surface-container p-8 rounded-xl">
                    <h2 className="text-on-surface text-2xl mb-4">
                        {t("membership.title")}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-loose">
                        {t("membership.description")}
                    </p>
                </section>
                {/*  LIABILITY */}
                <section className="md:col-span-7 bg-primary-container p-8 text-on-primary-container rounded-xl shadow-xl shadow-primary/5">
                    <h2 className="text-2xl font-bold mb-4">
                        {t("liability.title")}
                    </h2>
                    <p className="italic leading-loose opacity-90">
                        {t("liability.quote")}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed">
                        {t("liability.description")}
                    </p>
                </section>
            </div>
            {/*  Contact Call to Action  */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-container-high p-12 border border-primary/10 rounded-full">
                <div className="text-center md:text-left rtl:md:text-right">
                    <h3 className="text-on-surface text-xl mb-1">
                        {t("cta.title")}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                        {t("cta.description")}
                    </p>
                </div>
                <Link
                    href={`/${locale}/contactus`}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                    {t("cta.button")}
                </Link>
            </div>
        </main>
    );
};
export default page;
