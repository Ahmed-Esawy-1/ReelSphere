import Image from "next/image";
import { getTranslations } from "next-intl/server";

import StorageIcon from "@mui/icons-material/Storage";
import CookieIcon from "@mui/icons-material/Cookie";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const page = async () => {
    const t = await getTranslations("privacy");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12">
            <div className="relative mb-20">
                <div className="max-w-6xl">
                    <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high text-primary text-xs font-bold rounded-md uppercase tracking-[0.2em]">
                        {t("badge")}
                    </div>
                    <h1 className="font-title text-on-surface text-6xl md:text-8xl font-bold leading-tight tracking-tighter mb-8">
                        {t("title")} <br />
                        <span className="text-primary font-normal italic">
                            {t("titleHighlight")}
                        </span>
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed opacity-80">
                        {t("intro")}
                    </p>
                </div>
                <div className="hidden xl:block absolute -right-12 top-0 opacity-10 pointer-events-none rtl:-left-12 rtl:right-auto">
                    <Image
                        width={256}
                        height={384}
                        alt="Privacy Policy Background"
                        className="object-cover rounded-xl grayscale"
                        src="/images/privacyPolicy_background.webp"
                        loading="eager"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
                {/* FIRST CARD */}
                <section className="md:col-span-12 relative p-8 md:p-12 bg-surface-container-low border-l-2 rtl:border-l-0 rtl:border-r-2 border-primary-container rounded-xl overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-title text-on-surface text-3xl mb-6">
                            {t("commitment.title")}
                        </h2>
                        <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                            {t("commitment.paragraph1")}
                            <br />
                            <br />
                            {t("commitment.paragraph2")}
                        </p>
                        <div className="flex gap-4 text-primary/60 text-xs uppercase tracking-widest">
                            <span>{t("commitment.lastUpdated")}</span>
                            <span className="mx-2">•</span>
                            <span>{t("commitment.version")}</span>
                        </div>
                    </div>
                </section>
                {/* DATA COLLECTION */}
                <section className="md:col-span-7 flex flex-col justify-between bg-surface-container-high p-8 rounded-xl">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <StorageIcon className="text-primary text-3xl" />
                            <h2 className="font-title text-on-surface text-2xl">
                                {t("dataCollection.title")}
                            </h2>
                        </div>
                        <ul className="space-y-6 text-on-surface-variant">
                            <li className="flex gap-4">
                                <span className="text-primary font-bold">
                                    01.
                                </span>
                                <div>
                                    <strong className="block text-on-surface mb-1">
                                        {t("dataCollection.device.title")}
                                    </strong>
                                    {t("dataCollection.device.description")}
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-primary font-bold">
                                    02.
                                </span>
                                <div>
                                    <strong className="block text-on-surface mb-1">
                                        {t("dataCollection.personal.title")}
                                    </strong>
                                    {t("dataCollection.personal.description")}
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                {/*  COOKIES  */}
                <section className="md:col-span-5 bg-surface-variant/40 p-8 border border-outline-variant/10 rounded-xl backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <CookieIcon className="text-primary text-3xl" />
                        <h2 className="font-title text-on-surface text-2xl">
                            {t("cookies.title")}
                        </h2>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed mb-6">
                        {t("cookies.description")}
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg">
                            <span className="text-sm uppercase tracking-wide">
                                {t("cookies.necessary")}
                            </span>
                            <span className="bg-primary/20 px-2 py-0.5 text-primary text-[10px] rounded">
                                {t("cookies.alwaysOn")}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg opacity-60">
                            <span className="text-sm uppercase tracking-wide">
                                {t("cookies.analytics")}
                            </span>
                            <span className="bg-primary/20 px-2 py-0.5 text-primary text-[10px] rounded">
                                {t("cookies.optional")}
                            </span>
                        </div>
                    </div>
                </section>
                {/*  USE OF INFORMATION  */}
                <section className="md:col-span-12 relative p-8 md:p-12 bg-surface-container-low rounded-xl overflow-hidden">
                    <div className="md:flex items-start gap-12">
                        <div className="md:w-1/3 mb-8 md:mb-0">
                            <h2 className="font-title text-on-surface text-4xl leading-tight">
                                {t("usage.titlePrefix")}{" "}
                                <span className="text-primary italic">
                                    {t("usage.titleHighlight")}
                                </span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:w-2/3">
                            <div>
                                <h3 className="text-primary text-lg font-bold uppercase tracking-wider mb-3">
                                    {t("usage.curation.title")}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    {t("usage.curation.description")}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-primary text-lg font-bold uppercase tracking-wider mb-3">
                                    {t("usage.preservation.title")}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    {t("usage.preservation.description")}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-primary text-lg font-bold uppercase tracking-wider mb-3">
                                    {t("usage.communication.title")}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    {t("usage.communication.description")}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-primary mb-3 uppercase tracking-wider">
                                    {t("usage.security.title")}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">
                                    {t("usage.security.description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  DATA RIGHTS */}
                <section className="md:col-span-6 bg-surface-container-high p-8 rounded-xl">
                    <h3 className="font-title text-on-surface text-xl mb-4">
                        {t("dataRights.title")}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                        {t("dataRights.description")}
                    </p>
                    <button className="bg-gradient-to-r from-primary to-primary-container px-8 py-3 text-on-primary text-sm font-bold uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                        {t("dataRights.button")}
                    </button>
                </section>
                {/* SECURITY */}
                <section className="md:col-span-6 flex flex-col justify-center items-center text-center bg-primary-container/10 border border-primary/20 p-8 rounded-xl">
                    <AdminPanelSettingsIcon className="text-primary !text-5xl mb-4" />
                    <h3 className="font-title text-on-surface text-xl mb-4">
                        {t("securityStandard.title")}
                    </h3>
                    <p className="text-on-surface-variant text-sm">
                        {t("securityStandard.description")}
                    </p>
                </section>
            </div>

            {/*  FOOTER  */}
            <div className="text-center max-w-2xl mx-auto opacity-80 lg:opacity-40 hover:opacity-100 transition-opacity tracking-wider">
                <p className="text-xs italic mb-4">
                    {t("footer.contact", { email: "ReelSphere@gmail.com" })}
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em]">
                    {t("footer.location")}
                </p>
            </div>
        </main>
    );
};
export default page;
