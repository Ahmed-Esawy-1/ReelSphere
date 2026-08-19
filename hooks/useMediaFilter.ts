import { Card } from "@/types/Card";
import { Category } from "@/types/Category";
import { useEffect, useMemo, useRef, useState } from "react";

interface UseMediaFilterOptions {
    data: Card[];
    category?: string;
    genre?: string;
    pageSize?: number;
}

export function useMediaFilter({
    data,
    category = "all",
    genre = "all",
    pageSize = 20,
}: UseMediaFilterOptions) {
    const [visible, setVisible] = useState<number>(pageSize);
    const [open, setOpen] = useState<boolean>(false);
    const [filterLoading, setFilterLoading] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // ---- GENRE PARAM --------------------------------------------------------------------
    useEffect(() => {
        if (genre != "all") {
            setSelectedTypes((prev) => {
                return [...prev, genre];
            });
        }
    }, []);

    // ---- SEARCH --------------------------------------------------------------------
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    // ---- GENRE MENU  (Close when click out of menu) ----------------------------------------
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setVisible(pageSize);
    }, [selectedTypes, pageSize]);

    // ---- HANDLE GENRE OF ITEMS -------------------------------------------
    function handleSelectedType(type: string) {
        setFilterLoading(true);
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type],
        );
        setTimeout(() => setFilterLoading(false), Math.random() * 800 + 200); // fake delay
    }

    // ---- LOAD MORE ITEMS ------------------------------------------------------------------------------
    function loadMore() {
        setLoading(true);
        setTimeout(
            () => {
                setVisible((prev) => prev + 10);
                setLoading(false);
            },
            Math.random() * 2000 + 500,
        );
    }

    // ---- FILTER ---------------------------------------------------------------------------
    const filtered = useMemo(() => {
        return data.filter((item) => {
            const matchesCategory =
                category === "all" ||
                item.category.includes(category as Category[number]);

            const matchesType =
                selectedTypes.length === 0 ||
                item.types.some((t) => selectedTypes.includes(t));
            const matchesSearch =
                item.title.en
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase()) ||
                item.title.ar
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase());

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [data, selectedTypes, debouncedSearch, category]);

    return {
        visible,
        open,
        setOpen,
        filterLoading,
        isLoading,
        selectedTypes,
        search,
        setSearch,
        dropdownRef,
        handleSelectedType,
        loadMore,
        filtered,
    };
}
