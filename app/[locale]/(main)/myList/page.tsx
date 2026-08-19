import { useTranslations } from "next-intl";
import MyListContent from "./MyListContent";

const page = () => {
    const t = useTranslations("common.myList");

    return (
        <main className="px-6 md:px-12 pt-20 mb-20">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
                <div>
                    <span className="block text-primary text-xs tracking-[0.2em] uppercase mb-2">
                        {t("eyebrow")}
                    </span>
                    <h2 className="text-on-surface font-extrabold text-5xl md:text-6xl tracking-tight">
                        {t("title")}
                    </h2>
                </div>
            </header>

            <MyListContent />
        </main>
    );
};

export default page;
