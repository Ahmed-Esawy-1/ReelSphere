"use client";

import dynamic from "next/dynamic";

const SwiperCards = dynamic(() => import("./SwiperCards"), {
  ssr: false,
  loading: () => <div className="h-40">Loading...</div>,
});

export default SwiperCards;
