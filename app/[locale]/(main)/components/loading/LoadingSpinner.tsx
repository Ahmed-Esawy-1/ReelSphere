export default function LoadingSpinner() {
    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-amber-400" />
        </div>
    );
}
