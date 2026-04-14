"use client";

import { useInView } from "react-intersection-observer";

export default function LazySection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return <div ref={ref}>{inView ? children : <div className="h-40" />}</div>;
}
