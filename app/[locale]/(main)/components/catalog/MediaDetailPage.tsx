import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { seriesData } from "@/data/seriesData";
import MediaDetailContent from "./MediaDetailContent";

type MediaItem = (typeof seriesData)[number];

interface MediaDetailPageProps {
    params: Promise<{ id: string }>;
    data: MediaItem[];
}

export default async function MediaDetailPage({
    params,
    data,
}: MediaDetailPageProps) {
    const { id } = await params;
    const mediaId = Number(id);
    const locale = (await getLocale()) as "en" | "ar";
    const t = await getTranslations("catalog");

    const selectedMedia = data.find((s) => s.id === mediaId);
    if (!selectedMedia) notFound();

    return (
        <main className="relative pt-32 pb-24 px-6 md:px-12">
            <MediaDetailContent
                selectedMedia={selectedMedia}
                locale={locale}
                data={data}
            />
        </main>
    );
}
