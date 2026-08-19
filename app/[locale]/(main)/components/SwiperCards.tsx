"use client";
import "swiper/css";
import "swiper/css/navigation";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card } from "@/types/Card";
import MediaCard from "./MediaCard";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type SwiperCardsProps = {
    title: string;
    cards: Card[];
};

const SwiperCards = ({ title, cards }: SwiperCardsProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="relative">
            <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-on-surface text-4xl font-bold font-title">
                    {title}
                </h2>
                <div className="h-px flex-1 bg-outline-variant/30"></div>
            </div>

            <button ref={prevRef} className="custom-btn-prev rtl:rotate-180">
                <ChevronLeftIcon sx={{ fontSize: "28px" }} />
            </button>
            <button ref={nextRef} className="custom-btn-next rtl:rotate-180">
                <ChevronRightIcon sx={{ fontSize: "28px" }} />
            </button>

            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                onSwiper={(swiper) => {
                    if (swiper.isBeginning) {
                        prevRef.current?.classList.add("disable");
                    }
                    if (swiper.isEnd) {
                        nextRef.current?.classList.add("disable");
                    }
                }}
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
                    } else if (nextRef.current?.classList.contains("disable")) {
                        nextRef.current?.classList.remove("disable");
                    }

                    if (swiper.isBeginning) {
                        prevRef.current?.classList.add("disable");
                    } else if (prevRef.current?.classList.contains("disable")) {
                        prevRef.current?.classList.remove("disable");
                    }
                }}
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
                    640: { slidesPerView: 3, slidesPerGroup: 3 },
                    876: { slidesPerView: 4, slidesPerGroup: 4 },
                    1024: { slidesPerView: 5, slidesPerGroup: 5 },
                    1350: { slidesPerView: 6, slidesPerGroup: 6 },
                }}
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id}>
                        <MediaCard {...card} actionType="add" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default React.memo(SwiperCards);
