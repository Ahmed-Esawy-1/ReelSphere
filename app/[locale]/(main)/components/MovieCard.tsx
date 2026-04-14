"use client";
import Image from "next/image";
import useMyList from "../contexts/MyListItems";
import Link from "next/link";
import useToast from "../contexts/Toast";
import AddIcon from "@mui/icons-material/Add";

type MovieCardProp = {
  id: number;
  title: string;
  type: string[];
  actors: string[];
  year: number | string;
  imgSrc: string;
};

const MovieCard = ({
  id,
  title,
  type,
  actors,
  year,
  imgSrc,
}: MovieCardProp) => {
  const { myList, addToList } = useMyList();
  const { notify } = useToast();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToList({ id, title, type, actors, year, imgSrc } as any);

    let exist =
      myList.find((item) => item.id === id && item.title === title) ?? false;
    if (exist) {
      notify(`${title} is Already in Watch List`, "error");
    } else {
      notify(`${title} is Added to Watch List Successfully`, "success");
    }
  };
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[2/3] bg-surface-container-high mb-3 rounded-b-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
        <Link href={"/en/movies"}>
          <Image
            width={300}
            height={400}
            alt="Movie Poster"
            className="w-full h-full object-cover"
            src={`/images/${imgSrc}`}
            loading="lazy"
          />

          <div
            className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-300`}
          ></div>
        </Link>

        <div className="absolute bottom-2 ltr:right-2 rtl:left-2 bg-emerald-950/80 px-2 py-1 text-primary text-[10px] font-bold rounded backdrop-blur-sm">
          {year}
        </div>
        <div className="watch-list-icon" onClick={handleClick}>
          <AddIcon
            sx={{
              fontSize: "22px",
            }}
          />
        </div>
      </div>

      <h3 className="text-on-surface text-lg font-bold font-title truncate">
        {title}
      </h3>
      <p className="text-text text-xs">{`${type.slice(0, 3).join(" & ")} • ${actors.slice(0, 2).join(" & ")}`}</p>
    </div>
  );
};

export default MovieCard;
