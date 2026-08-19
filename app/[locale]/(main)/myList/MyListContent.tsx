"use client";

import { useTranslations } from "next-intl";
import MediaCard from "../components/MediaCard";
import useMyList from "@/contexts/MyListItems";

const MyListContent = () => {
    const t = useTranslations("common.myList");
    const { myList } = useMyList();

    return (
        <>
            {/* ITEMS */}
            {myList.length > 0 ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {myList.map((item, i) => (
                        <MediaCard
                            key={item.id}
                            {...item}
                            actionType="remove"
                            showBody
                            showStars
                            priority={i < 4}
                        />
                    ))}
                </section>
            ) : (
                <div className="text-4xl font-bold w-full text-center">
                    {t("empty")}
                </div>
            )}
        </>
    );
};

export default MyListContent;
