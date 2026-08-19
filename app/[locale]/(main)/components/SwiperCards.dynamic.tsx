"use client";
import SwiperLoading from "./loading/SwiperLoading";
import dynamic from "next/dynamic";

const SwiperCards = dynamic(() => import("./SwiperCards"), {
    ssr: false,
    loading: () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <SwiperLoading key={i} />
            ))}
        </div>
    ),
});

export default SwiperCards;
