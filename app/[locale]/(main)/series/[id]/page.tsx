import { routing } from "@/i18n/routing";
import MediaDetailPage from "../../components/catalog/MediaDetailPage";
import { seriesData } from "@/data/seriesData";

export async function generateStaticParams() {
    return seriesData.flatMap((series) =>
        routing.locales.map((locale) => ({
            locale,
            id: series.id.toString(),
        })),
    );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <MediaDetailPage params={params} data={seriesData} />;
}
