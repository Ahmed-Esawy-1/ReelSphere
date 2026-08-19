import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
    const t = await getTranslations("contact");

    return (
        <main className="pt-32 pb-24 px-6 md:px-12">
            {/* HEADER */}
            <section className="mb-24 text-center lg:text-left rtl:text-right">
                <div className="inline-block px-4 py-1 mb-6 bg-surface-container-high text-primary text-sm font-bold tracking-widest uppercase rounded-md">
                    {t("badge")}
                </div>
                <h2 className="text-5xl md:text-7xl text-on-surface font-bold leading-tight mb-8">
                    {t("title")} <br />
                    <span className="text-primary italic">
                        {t("titleHighlight")}
                    </span>
                </h2>
                <p className="max-w-2xl m-auto lg:m-0 text-on-surface-variant text-lg leading-relaxed opacity-80">
                    {t("description")}
                </p>
            </section>

            {/* FORM */}
            <ContactForm />
        </main>
    );
}
