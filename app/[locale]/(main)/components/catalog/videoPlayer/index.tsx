"use client";

import CenterPlayButton from "./CenterPlayButton";
import LoadingSpinner from "../../loading/LoadingSpinner";
import ControlsBar from "./ControlsBar";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { useCallback } from "react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    title?: string;
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
    const { refs, state, actions } = useVideoPlayer(src);
    const { videoRef, containerRef, progressRef, volumeRef } = refs;
    const {
        isPlaying,
        isFullscreen,
        showControls,
        currentTime,
        duration,
        isMuted,
        isLoading,
        hasStarted,
        volume,
        progressPercent,
        bufferedPercent,
        volumePercent,
    } = state;
    const {
        togglePlay,
        skip,
        toggleMute,
        toggleFullscreen,
        seekToClientX,
        setVolumeFromClientX,
        setIsDraggingSeek,
        setIsDraggingVolume,
        resetControlsTimeout,
        setShowControls,
    } = actions;

    // ---- WHEN DRAGGING START (Control) ---------------------------------------------------
    const handleSeekDragStart = useCallback(
        (clientX: number) => {
            actions.setIsDraggingSeek(true);
            actions.seekToClientX(clientX);
        },
        [actions],
    );

    // ---- WHEN DRAGGING START (Sound) ---------------------------------------------------
    const handleVolumeDragStart = useCallback(
        (clientX: number) => {
            actions.setIsDraggingVolume(true);
            actions.setVolumeFromClientX(clientX);
        },
        [actions],
    );

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onMouseMove={resetControlsTimeout}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onTouchStart={resetControlsTimeout}
            className={`touch-none group/player relative w-full select-none overflow-hidden bg-black outline-none ${
                isFullscreen ? "h-full" : "aspect-video rounded-xl"
            }`}
        >
            {/* VIDEO */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                onClick={togglePlay}
                className="h-full w-full object-contain"
            />
            {/* LOADING AFTER START */}
            {isLoading && hasStarted && <LoadingSpinner />}

            {/* BEFORE START */}
            {!hasStarted && <CenterPlayButton onClick={togglePlay} />}

            <ControlsBar
                progressRef={progressRef}
                volumeRef={volumeRef}
                isPlaying={isPlaying}
                isFullscreen={isFullscreen}
                isMuted={isMuted}
                volume={volume}
                showControls={showControls}
                currentTime={currentTime}
                duration={duration}
                progressPercent={progressPercent}
                bufferedPercent={bufferedPercent}
                volumePercent={volumePercent}
                title={title}
                onTogglePlay={togglePlay}
                onSkip={skip}
                onToggleMute={toggleMute}
                onToggleFullscreen={toggleFullscreen}
                onSeekDragStart={handleSeekDragStart}
                onVolumeDragStart={handleVolumeDragStart}
            />
        </div>
    );
}
