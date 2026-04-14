"use client";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import useMyList from "../contexts/MyListItems";
import Image from "next/image";

type MyListCardProps = {
  id: number;
  title: string;
  body: string;
  type: string[];
  actors: string[];
  year: number | string;
  imgSrc: string;
};

const MyListCard = ({
  id,
  title,
  body,
  type,
  year,
  imgSrc,
}: MyListCardProps) => {
  const { myList, removeFromList } = useMyList();
  console.log(myList);
  return (
    <div className="group relative bg-surface-container-high rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
      <div className="relative aspect-[2/3]">
        <Image
          width={300}
          height={400}
          alt=""
          src={`/images/${imgSrc}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
        <button className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-black/40 hover:bg-red-600/80 text-on-surface  rounded-full backdrop-blur-md p-2 transition-colors duration-300">
          <CloseIcon className="!text-sm" onClick={() => removeFromList(id)} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-on-surface text-xl font-title">{title}</h3>
          <span className="bg-surface-container-high text-primary text-[10px] font-bold px-2 py-0.5 border border-primary/20 rounded">
            {year}
          </span>
        </div>
        <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2 opacity-80 mb-4">
          {body}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <StarIcon className="!text-base !font-bold" />
            <span className="text-xs font-bold">8.4</span>
          </div>
          <span className="text-outline text-[10px] font-semibold tracking-wider uppercase">
            {type.slice(0, 3).join(" / ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyListCard;
