import Link from "next/link";
import Image from "next/image";
type CollectionCardProps = {
  title: string;
  subTitle: string;
  body: string;
  imgSrc: string;
  path: string;
};
function CollectionCard({
  title,
  subTitle = "",
  body,
  imgSrc,
  path,
}: CollectionCardProps) {
  return (
    <>
      <Link href={path} className="relative group">
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 duration-300 pointer-events-none z-10"></div>
        <Image
          width={300}
          height={400}
          alt="Modern Hit 4"
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-300"
          data-alt="A shelf full of film canisters"
          src={`/images/${imgSrc.trim()}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full z-20">
          <span className="text-primary text-xs uppercase tracking-widest font-bold mb-2 block">
            Seasonal Favorites
          </span>
          <h2 className="text-2xl md:text-4xl font-title font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-emerald-100/80 text-sm max-w-md line-clamp-2">
            {body}
          </p>
        </div>
      </Link>
    </>
  );
}

export default CollectionCard;
