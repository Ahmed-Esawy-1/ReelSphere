import { memo, RefObject } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface VolumeControlProps {
    volumeRef: RefObject<HTMLDivElement | null>;
    isMuted: boolean;
    volume: number;
    volumePercent: number;
    onToggleMute: () => void;
    onVolumeDragStart: (clientX: number) => void;
}

function VolumeControl({
    volumeRef,
    isMuted,
    volume,
    volumePercent,
    onToggleMute,
    onVolumeDragStart,
}: VolumeControlProps) {
    return (
        <div className="group/vol flex shrink-0 items-center gap-2">
            {/* BUTTON */}
            <button
                onClick={onToggleMute}
                aria-label={isMuted ? "إلغاء الكتم" : "كتم الصوت"}
                className="hover:text-amber-400"
            >
                {isMuted || volume === 0 ? (
                    <VolumeOffIcon className="h-5 w-5" />
                ) : (
                    <VolumeUpIcon className="h-5 w-5" />
                )}
            </button>

            {/* SEEK */}
            <div
                ref={volumeRef}
                onPointerDown={(e) => onVolumeDragStart(e.clientX)}
                className="flex h-3 w-16 shrink-0 cursor-pointer items-center overflow-hidden transition-all duration-200 max-[767px]:w-16 sm:w-0 sm:group-hover/vol:w-16"
            >
                <div className="relative h-1 w-16 rounded-full bg-white/25">
                    <div
                        className="absolute inset-y-0 start-0 rounded-full bg-white"
                        style={{ width: `${volumePercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(VolumeControl);
