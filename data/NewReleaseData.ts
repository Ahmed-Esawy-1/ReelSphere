import { Card } from "@/types/Card";
import { seriesData } from "./seriesData";
import { moviesData } from "./moviesData";

export const newReleaseData: Card[] = [...seriesData, ...moviesData]
    .sort((a: any, b: any) => b.year - a.year)
    .slice(0, 15);
