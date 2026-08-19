import Image from "next/image";
import { getLocale } from "next-intl/server";
import Link from "next/link";

type NewReleaseCardProps = {
    id: number;
    title: { en: string; ar: string };
    year: number | string;
    section: "series" | "movies";
    imgSrc: string;
};

const NewReleaseCard = async ({
    id,
    title,
    imgSrc,
    year,
    section,
}: NewReleaseCardProps) => {
    const locale = (await getLocale()) as "en" | "ar";
    const displayTitle = locale === "en" ? title.en : title.ar;

    return (
        <div className="flex-shrink-0 w-40 md:w-48 group cursor-pointer">
            <div className="relative bg-surface-container-high rounded-lg overflow-hidden">
                <Link
                    className="block relative aspect-[2/3]"
                    href={`${locale}/${section}/${id}`}
                >
                    <Image
                        fill
                        alt={displayTitle}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        src={`/images/${imgSrc}`}
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                </Link>
                <div className="absolute bottom-2 ltr:right-2 rtl:left-2 bg-emerald-950/80 px-2 py-1 text-primary text-[10px] font-bold rounded backdrop-blur-sm">
                    {year}
                </div>
            </div>

            <h3 className="mt-2 text-sm font-medium truncate">
                {displayTitle}
            </h3>
        </div>
    );
};

export default NewReleaseCard;
