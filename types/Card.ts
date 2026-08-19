import { GenreKey } from "@/data/genres";
import { ActorKey } from "@/data/actors";
import { Category } from "./Category";

export type Card = {
    id: number;
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    types: GenreKey[];
    actors: ActorKey[];
    year: number | string;
    imgSrc: string;
    section: "series" | "movies";
    category: Category;
    rating: number;
};

export const sectionNames: Record<Card["section"], { en: string; ar: string }> =
    {
        movies: { en: "Movies", ar: "أفلام" },
        series: { en: "Series", ar: "مسلسلات" },
    };
