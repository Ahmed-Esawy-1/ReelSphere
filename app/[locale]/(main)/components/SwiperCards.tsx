"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import useMyList from "../contexts/MyListItems";
import Link from "next/link";
import useToast from "../contexts/Toast";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

type Card = {
  id: string | number;
  title: string;
  imgSrc: string;
  type: string[];
  year: number;
  actors: String[];
};
type SwiperCardsProps = {
  title: string;
  cards: Card[];
};

const SwiperCards = ({ title, cards }: SwiperCardsProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { myList, addToList } = useMyList();
  const { notify } = useToast();

  const handleClick = (e: React.MouseEvent, card: Card) => {
    e.stopPropagation();

    let exist =
      myList.some((item) => item.id === card.id && item.title === card.title) ??
      false;

    if (exist) {
      notify(`${card.title} is Already in Watch List`, "error");
    } else {
      addToList({ ...card } as any);
      notify(`${card.title} is Added to Watch List Successfully`, "success");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 mb-8">
        <h2 className="text-on-surface text-4xl font-bold font-title">
          {title}
        </h2>
        <div className="h-px flex-1 bg-outline-variant/30"></div>
      </div>

      <button ref={prevRef} className="custom-btn-prev">
        ←
      </button>

      <button ref={nextRef} className="custom-btn-next">
        →
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        onBeforeInit={(swiper) => {
          setTimeout(() => {
            if (!swiper || !swiper.params) return;

            const navigation = swiper.params.navigation as any;

            if (navigation && prevRef.current && nextRef.current) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;

              swiper.navigation?.init();
              swiper.navigation?.update();
            }
          });
        }}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            nextRef.current?.classList.add("disable");
          } else {
            if (nextRef.current?.classList.contains("disable"))
              nextRef.current?.classList.remove("disable");
          }

          if (swiper.isBeginning) {
            prevRef.current?.classList.add("disable");
          } else {
            if (prevRef.current?.classList.contains("disable"))
              prevRef.current?.classList.remove("disable");
          }
        }}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          876: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1350: { slidesPerView: 6 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="group cursor-pointer">
              <div className="relative aspect-[2/3] bg-surface-container-high mb-3 rounded-b-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                <Link href={"/"}>
                  <Image
                    width={300}
                    height={400}
                    alt="Movie Poster"
                    className="w-full h-full object-cover"
                    src={`/images/${card.imgSrc}`}
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-opacity duration-300`}
                  ></div>
                </Link>

                <div className="absolute bottom-2 ltr:right-2 rtl:left-2 bg-emerald-950/80 px-2 py-1 text-primary text-[10px] font-bold rounded backdrop-blur-sm">
                  {card.year}
                </div>
                <div
                  className="watch-list-icon"
                  onClick={(e) => handleClick(e, card)}
                >
                  <AddIcon
                    sx={{
                      fontSize: "22px",
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="mt-2">
                <h3 className="text-sm font-medium line-clamp-1">
                  {card.title}
                </h3>
                <p className="text-text text-xs">{`${card.type.join(" • ")}`}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default React.memo(SwiperCards);
