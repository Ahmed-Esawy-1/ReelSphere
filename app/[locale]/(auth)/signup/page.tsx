import { getTranslations } from "next-intl/server";
import HelpIcon from "@mui/icons-material/Help";
import Image from "next/image";

import SignForm from "./SignForm";

const page = async () => {
    const t = await getTranslations("auth.signUp");

    return (
        <>
            <div className="absolute top-0 z-50 flex justify-between items-center w-full px-4 sm:px-6 py-4 text-primary-container text-2xl sm:text-3xl md:text-4xl">
                <span className="italic font-title">{t("brand")}</span>
                <HelpIcon className="cursor-pointer" />
            </div>
            <main className="min-h-screen relative z-10 flex flex-col lg:flex-row">
                {/* IMAGE SECTION */}
                <section className="relative hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-surface-dim overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            fill
                            sizes="50vw"
                            className="object-cover opacity-40 grayscale sepia-[.2]"
                            alt="Monochrome close-up of a vintage 35mm film projector lens with soft dust particles floating in a beam of light"
                            src="/images/signup.webp"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-lg px-8 xl:px-12 text-center">
                        <h2 className="text-primary-fixed-dim text-3xl xl:text-5xl leading-tight mb-6">
                            {t("heroTitle")}
                        </h2>
                        <p className="text-base xl:text-lg leading-relaxed">
                            {t("heroDescription")}
                        </p>
                    </div>
                </section>

                {/* FORM */}
                <SignForm />
            </main>
        </>
    );
};

export default page;
