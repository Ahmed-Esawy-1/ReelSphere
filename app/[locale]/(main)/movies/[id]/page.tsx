import MediaDetailPage from "../../components/catalog/MediaDetailPage";
import { moviesData } from "@/data/moviesData";

import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
    return moviesData.flatMap((movie) =>
        routing.locales.map((locale) => ({
            locale,
            id: movie.id.toString(),
        })),
    );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <MediaDetailPage params={params} data={moviesData} />;
}
