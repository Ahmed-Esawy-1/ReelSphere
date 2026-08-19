import { GenreKey } from "@/data/genres";
import { ActorKey } from "@/data/actors";

export type MediaCardProps = {
    id: number;
    title: { en: string; ar: string };
    body: { en: string; ar: string };
    types: GenreKey[];
    actors: ActorKey[];
    year: number | string;
    imgSrc: string;
    section?: "movies" | "series";
};
