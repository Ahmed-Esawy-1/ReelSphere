"use client";

import { useInView } from "react-intersection-observer";

export default function LazySection({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "200px",
    });

    return (
        <div ref={ref} className={className}>
            {inView ? (
                children
            ) : (
                <div className="w-full h-full bg-surface-container-low animate-pulse rounded-xl" />
            )}
        </div>
    );
}
