import { moviesData } from "@/data/moviesData";
import ArchivePage from "../components/catalog/ArchivePage";

interface PageProps {
    searchParams: Promise<{ category?: string; genre?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const category = params.category || "all";
    const genre = params.genre || "all";
    return <ArchivePage data={moviesData} category={category} genre={genre} />;
};

export default Page;
