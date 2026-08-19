import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

import TuneIcon from "@mui/icons-material/Tune";

const Footer = async () => {
    const t = await getTranslations("common.Footer");
    const locale = (await getLocale()) as "en" | "ar";

    return (
        <>
            <footer className="hidden md:block py-16 px-16 bg-surface-container-low border-t border-outline-variant/10">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="text-primary text-3xl font-bold mb-6">
                            {t("brand")}
                        </div>
                        <p className="max-w-sm text-text">{t("description")}</p>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h4 className="text-on-surface font-bold mb-4">
                            {t("support.heading")}
                        </h4>
                        <ul className="space-y-2 text-text text-sm">
                            <li>
                                <Link
                                    className="hover:text-primary"
                                    href={`/${locale}/contactus`}
                                >
                                    {t("support.contactUs")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-primary"
                                    href={`/${locale}/privacyPolicy`}
                                >
                                    {t("support.privacyPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-primary"
                                    href={`/${locale}/termsOfUse`}
                                >
                                    {t("support.termsOfUse")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-primary"
                                    href={`/${locale}/accessibility`}
                                >
                                    {t("support.accessibility")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between items-center max-w-7xl mx-auto mt-12 pt-8 text-text text-xs border-t border-outline-variant/10">
                    <p>{t("copyright")}</p>
                    <div className="flex space-x-6">
                        <p className="hover:text-primary cursor-pointer">
                            {t("social.facebook")}
                        </p>
                        <p className="hover:text-primary cursor-pointer">
                            {t("social.instagram")}
                        </p>
                        <p className="hover:text-primary cursor-pointer">
                            {t("social.tiktok")}
                        </p>
                    </div>
                </div>

                <button className="fixed right-8 bottom-24 md:bottom-8 flex items-center justify-center w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40">
                    <TuneIcon />
                </button>
            </footer>
        </>
    );
};

export default Footer;
