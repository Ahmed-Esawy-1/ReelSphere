import { getLocale, getTranslations } from "next-intl/server";
import LoginForm from "./LoginForm";
import Link from "next/link";

const page = async () => {
    const locale = await getLocale();
    const t = await getTranslations("auth.logIn");

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
            <div className="relative w-full px-4 sm:px-0 sm:min-w-125 sm:w-3/4 md:w-1/2 lg:w-150">
                {/* BACKGROUND IMAGE */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-surface/40 via-surface-container-low/80 to-surface"></div>
                    <img
                        className="w-full h-full object-cover grayscale opacity-40"
                        alt="Monochrome cinematic background"
                        src="/images/login.webp"
                    />
                </div>

                {/* CONTENT */}
                <div className="relative z-20 w-full px-0 sm:px-4 py-16 sm:py-24 md:py-32">
                    <div className="w-full p-6 sm:p-8 md:p-12 bg-[#31363399] border border-outline-variant/20 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
                        <h1 className="text-on-surface text-2xl md:text-5xl text-center leading-tight tracking-tight mb-8 sm:mb-12">
                            {t("title")}
                        </h1>
                        {/* FORM */}
                        <LoginForm />

                        {/* SIGN UP */}
                        <div className="mt-8 sm:mt-10 pt-8 border-t border-outline-variant/10 text-center">
                            <p className="text-on-surface-variant text-sm">
                                {t("noAccount")}
                                <Link
                                    href={`/${locale}/signup`}
                                    className="text-primary font-bold hover:text-primary-fixed ltr:ml-2 rtl:mr-2 transition-colors"
                                >
                                    {t("signUpLink")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;
