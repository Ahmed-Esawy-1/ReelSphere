import { RefObject } from "react";
import SeekBar from "./SeekBar";
import VolumeControl from "./VolumeControl";

import PlayIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipIcon from "@mui/icons-material/Replay";
import EnterFullscreenIcon from "@mui/icons-material/Fullscreen";
import ExitFullscreenIcon from "@mui/icons-material/FullscreenExit";
import { formatTime } from "@/utils/formatTime";

interface ControlsBarProps {
    progressRef: RefObject<HTMLDivElement | null>;
    volumeRef: RefObject<HTMLDivElement | null>;
    isPlaying: boolean;
    isFullscreen: boolean;
    isMuted: boolean;
    volume: number;
    showControls: boolean;
    currentTime: number;
    duration: number;
    progressPercent: number;
    bufferedPercent: number;
    volumePercent: number;
    title?: string;
    onTogglePlay: () => void;
    onSkip: (seconds: number) => void;
    onToggleMute: () => void;
    onToggleFullscreen: () => void;
    onSeekDragStart: (clientX: number) => void;
    onVolumeDragStart: (clientX: number) => void;
}

export default function ControlsBar({
    progressRef,
    volumeRef,
    isPlaying,
    isFullscreen,
    isMuted,
    volume,
    showControls,
    currentTime,
    duration,
    progressPercent,
    bufferedPercent,
    volumePercent,
    title,
    onTogglePlay,
    onSkip,
    onToggleMute,
    onToggleFullscreen,
    onSeekDragStart,
    onVolumeDragStart,
}: ControlsBarProps) {
    return (
        <div
            className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${
                showControls || !isPlaying
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
            }`}
        >
            <SeekBar
                progressRef={progressRef}
                progressPercent={progressPercent}
                bufferedPercent={bufferedPercent}
                onSeekStart={onSeekDragStart}
            />

            <div className="flex items-center gap-3 text-white">
                {/* PLAY | PAUSE BUTTON */}
                <button
                    onClick={onTogglePlay}
                    aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                    className="shrink-0 hover:text-amber-400"
                >
                    {isPlaying ? (
                        <PauseIcon sx={{ fontSize: 24 }} />
                    ) : (
                        <PlayIcon sx={{ fontSize: 24 }} />
                    )}
                </button>

                {/* SKIP ICON (-15) */}
                <button
                    onClick={() => onSkip(-15)}
                    aria-label="رجوع 15 ثانية"
                    className="relative shrink-0 hover:text-amber-400"
                >
                    <SkipIcon sx={{ fontSize: 24 }} />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8px] font-bold">
                        -15
                    </span>
                </button>

                {/* SKIP ICON (15) */}
                <button
                    onClick={() => onSkip(15)}
                    aria-label="تقديم 15 ثانية"
                    className="relative shrink-0 -scale-x-100 hover:text-amber-400"
                >
                    <SkipIcon
                        sx={{ fontSize: 24 }}
                        className="rtl:rotate-380"
                    />
                    <span className="pointer-events-none absolute inset-0 flex -scale-x-100 items-center justify-center text-[8px] font-bold">
                        +15
                    </span>
                </button>

                {/* VOLUME */}
                <VolumeControl
                    volumeRef={volumeRef}
                    isMuted={isMuted}
                    volume={volume}
                    volumePercent={volumePercent}
                    onToggleMute={onToggleMute}
                    onVolumeDragStart={onVolumeDragStart}
                />

                {/* CURRENT / DURATION */}
                <span className="shrink-0 font-mono text-xs tabular-nums text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <span className="flex-1" />

                {/* TITLE */}
                {title && (
                    <span className="hidden max-w-[40%] truncate text-xs text-white/60 sm:block">
                        {title}
                    </span>
                )}

                {/* FULL SCREEN */}
                <button
                    onClick={onToggleFullscreen}
                    aria-label={
                        isFullscreen ? "الخروج من ملء الشاشة" : "ملء الشاشة"
                    }
                    className="shrink-0 hover:text-amber-400"
                >
                    {isFullscreen ? (
                        <ExitFullscreenIcon sx={{ fontSize: 20 }} />
                    ) : (
                        <EnterFullscreenIcon sx={{ fontSize: 20 }} />
                    )}
                </button>
            </div>
        </div>
    );
}
