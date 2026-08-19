import Link from "next/link";
import Image from "next/image";
import { CollectionCardProps } from "@/types/CollectionCardProps";

function CollectionCard({ title, imgSrc, path }: CollectionCardProps) {
    return (
        <Link href={path} className="relative group block w-full h-full">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 duration-300 pointer-events-none z-10"></div>
            <Image
                fill
                alt={`${title} Image`}
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-300"
                src={`/images/${imgSrc.trim()}`}
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                <h2 className="text-2xl md:text-4xl font-title font-bold text-white mb-2">
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default CollectionCard;
