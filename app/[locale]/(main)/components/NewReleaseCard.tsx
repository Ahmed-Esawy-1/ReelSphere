import Image from "next/image";

type NewReleaseProp = {
  title: string;
  imgSrc: string;
};

const NewReleaseCard = ({ title, imgSrc }: NewReleaseProp) => {
  return (
    <div className="flex-none w-48 group cursor-pointer">
      <div className="relative aspect-[2/3] bg-surface-container-high rounded-lg overflow-hidden mb-3">
        <Image
          width={300}
          height={400}
          alt="New Release"
          className="w-full h-full object-cover"
          src={`/images/${imgSrc}`}
          loading="lazy"
        />
      </div>
      <h3 className="text-on-surface text-lg font-bold font-title truncate">
        {title}
      </h3>
    </div>
  );
};

export default NewReleaseCard;
