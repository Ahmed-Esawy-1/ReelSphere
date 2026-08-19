export default function SwiperLoading() {
    return (
        <div className="group animate-pulse">
            <div className="relative aspect-[2/3] rounded-b-lg overflow-hidden bg-surface-container-high mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>

                <div className="absolute bottom-2 right-2 w-12 h-5 bg-white/10 rounded"></div>
                <div className="absolute top-2 right-2 w-7 h-7 bg-white/10 rounded-full"></div>
            </div>

            <div className="h-4 w-2/3 bg-white/10 rounded mb-2"></div>
            <div className="h-3 w-full bg-white/10 rounded"></div>
        </div>
    );
}
