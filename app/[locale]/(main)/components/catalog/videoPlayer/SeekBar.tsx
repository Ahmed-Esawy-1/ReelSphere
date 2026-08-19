import { memo, RefObject } from "react";

interface SeekBarProps {
    progressRef: RefObject<HTMLDivElement | null>;
    progressPercent: number;
    bufferedPercent: number;
    onSeekStart: (clientX: number) => void;
}

function SeekBar({
    progressRef,
    progressPercent,
    bufferedPercent,
    onSeekStart,
}: SeekBarProps) {
    return (
        <div
            ref={progressRef}
            onPointerDown={(e) => onSeekStart(e.clientX)}
            className="group/bar relative flex h-3 w-full cursor-pointer items-center"
        >
            <div className="relative h-1 w-full rounded-full bg-white/25 transition-all group-hover/bar:h-1.5">
                <div
                    className="absolute inset-y-0 start-0 rounded-full bg-white/40"
                    style={{ width: `${bufferedPercent}%` }}
                />
                <div
                    className="absolute inset-y-0 start-0 rounded-full bg-amber-400"
                    style={{ width: `${progressPercent}%` }}
                />
                <div
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-amber-400 opacity-0 shadow transition-opacity group-hover/bar:opacity-100 rtl:translate-x-1/2 ltr:-translate-x-1/2"
                    style={{ insetInlineStart: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}

export default memo(SeekBar);
