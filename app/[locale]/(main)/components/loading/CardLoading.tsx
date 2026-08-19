export default function CardLoading() {
    return (
        <div className="animate-pulse bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            {/* Image */}
            <div className="relative aspect-[2/3] w-full rounded-xl mb-4 bg-surface-container-high overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
            </div>

            {/* Title */}
            <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>

            {/* Description */}
            <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
            </div>
        </div>
    );
}
