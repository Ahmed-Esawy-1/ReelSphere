"use client";

import React, { useContext, useEffect, useState } from "react";
import { Card } from "@/types/Card";
import { useLocale, useTranslations } from "next-intl";
import useToast from "./Toast";

interface MyListContextType {
    myList: Card[];
    addToList: (item: Card) => void;
    removeFromList: (id: number) => void;
}

const MyListContext = React.createContext<MyListContextType | undefined>(
    undefined,
);

export const MyListProvider = ({ children }: { children: React.ReactNode }) => {
    const locale = useLocale();
    const t = useTranslations("common.Toast");
    const { notify } = useToast();

    const [myList, setMyList] = useState<Card[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // ---- Fetch List Items From Local Storage --------------------
    useEffect(() => {
        const stored = localStorage.getItem("myList-items");
        if (stored) setMyList(JSON.parse(stored));
        setHydrated(true);
    }, []);

    // ---- ADD List Items To Local Storage --------------------
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem("myList-items", JSON.stringify(myList));
    }, [myList, hydrated]);

    // ---- Add Item --------------------------------
    const addToList = (item: Card) => {
        const displayTitle = locale === "en" ? item.title.en : item.title.ar;
        const existed = myList.some((i) => i.id === item.id);
        if (existed) {
            notify(t("alreadyInList", { title: displayTitle }), "error");
        } else {
            setMyList((prev) => [...prev, item]);
            notify(t("addedToList", { title: displayTitle }), "success");
        }
    };

    // ---- Remove Item --------------------------------
    const removeFromList = (id: number) => {
        setMyList((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <MyListContext.Provider value={{ myList, addToList, removeFromList }}>
            {children}
        </MyListContext.Provider>
    );
};

export default function useMyList() {
    const context = useContext(MyListContext);

    if (!context) {
        throw new Error("useMyList must be used within a MyListProvider");
    }

    return context;
}
