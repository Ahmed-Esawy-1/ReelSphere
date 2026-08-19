"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useVideoPlayer(src: string) {
    // ---- REFS ------------------------------------------------------
    const videoRef = useRef<HTMLVideoElement>(null); // Video
    const containerRef = useRef<HTMLDivElement>(null); // Full Screen
    const progressRef = useRef<HTMLDivElement>(null); // the seek/timer track bar
    const volumeRef = useRef<HTMLDivElement>(null); // the volume slider bar
    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    ); // handle for the auto-hide timer

    // ---- STATES -------------------------------------------------------------------
    const [isPlaying, setIsPlaying] = useState(false); // Play | Stop
    const [isFullscreen, setIsFullscreen] = useState(false); // Full Screen | Not
    const [showControls, setShowControls] = useState(true); // Control bar visible | hidden
    const [currentTime, setCurrentTime] = useState(0); // Playhead Position (sec)
    const [duration, setDuration] = useState(0); // Video Length (sec)
    const [buffered, setBuffered] = useState(0); // how far the video has downloaded, in seconds
    const [volume, setVolume] = useState(1); // 0 to 1
    const [isMuted, setIsMuted] = useState(false); // control Mute
    const [isDraggingSeek, setIsDraggingSeek] = useState(false); // video Progress
    const [isDraggingVolume, setIsDraggingVolume] = useState(false); //  Sound Progress
    const [isLoading, setIsLoading] = useState(true);
    const [hasStarted, setHasStarted] = useState(false); // Control center play button

    // --------------------------------------------------------------------------------
    const isSeekable = isFinite(duration) && duration > 0;

    // ---- Video Change --------------------------------------------------
    useEffect(() => {
        setHasStarted(false);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setBuffered(0);
        setIsLoading(true);
    }, [src]);

    // ---- Make the Video (Play | Stop) ------------------------------------------------------
    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setHasStarted(true);
        } else {
            video.pause();
        }
    }, []);

    // ---- Control the Time (pass -15 | 15) --------------------------------------------------------------------------
    const skip = useCallback((seconds: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = Math.min(
            Math.max(video.currentTime + seconds, 0),
            video.duration || 0,
        );
    }, []);

    //  ---- Control Mute -----------------------------------------------------------------------
    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    }, []);

    // ---- Control FUll Screen ----------------------------------------------------------------------------
    const toggleFullscreen = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    // --- Seek to Specific Point in Control Bar ------------------------------------------------
    const seekToClientX = useCallback(
        (clientX: number) => {
            const video = videoRef.current;
            const bar = progressRef.current;

            if (!video || !bar || !isSeekable) return;

            const rect = bar.getBoundingClientRect();
            if (rect.width === 0 || !Number.isFinite(rect.width)) return;

            let ratio = Math.min(
                Math.max((clientX - rect.left) / rect.width, 0),
                1,
            );

            const isRtl = getComputedStyle(bar).direction === "rtl";
            if (isRtl) ratio = 1 - ratio;

            const newTime = ratio * duration;
            if (!Number.isFinite(newTime)) return;
            try {
                video.currentTime = newTime;
                setCurrentTime(newTime);
            } catch {
                console.log("Video may no longer be seekable or ready");
            }
        },
        [duration, isSeekable],
    );

    // --- Seek to Specific Point in Sound Bar ------------------------------------------------
    const setVolumeFromClientX = useCallback((clientX: number) => {
        const video = videoRef.current;
        const bar = volumeRef.current;
        if (!video || !bar) return;
        const rect = bar.getBoundingClientRect();
        let ratio = Math.min(
            Math.max((clientX - rect.left) / rect.width, 0),
            1,
        );

        const isRtl = getComputedStyle(bar).direction === "rtl";
        if (isRtl) ratio = 1 - ratio;

        video.volume = ratio;
        video.muted = ratio === 0;
        setVolume(ratio);
        setIsMuted(ratio === 0);
    }, []);
    // ---- Know Some Info When Dragging the Control Bar -------------------------------------------------------------------------------
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Know Video Length
        const onLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
        };

        // ---- Know Where we in video time ----------------------------------------------------------
        const onTimeUpdate = () => {
            if (!isDraggingSeek) setCurrentTime(video.currentTime);
        };

        // ---- Know in which point the  video download -------------------------------
        const onProgress = () => {
            if (video.buffered.length > 0) {
                setBuffered(video.buffered.end(video.buffered.length - 1));
            }
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onWaiting = () => setIsLoading(true);
        const onPlaying = () => setIsLoading(false);

        // ---- When Volume | Mute Changes
        const onVolumeChange = () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
        };

        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("progress", onProgress);
        video.addEventListener("play", onPlay);
        video.addEventListener("pause", onPause);
        video.addEventListener("waiting", onWaiting);
        video.addEventListener("playing", onPlaying);
        video.addEventListener("volumechange", onVolumeChange);

        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            onLoadedMetadata();
        }

        return () => {
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("progress", onProgress);
            video.removeEventListener("play", onPlay);
            video.removeEventListener("pause", onPause);
            video.removeEventListener("waiting", onWaiting);
            video.removeEventListener("playing", onPlaying);
            video.removeEventListener("volumechange", onVolumeChange);
        };
    }, [isDraggingSeek]);

    // ---- Full Screen Change ----------------------------------------------------------------------
    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onFsChange);
        return () =>
            document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    // ---- When dragging the Control Bar --------------------------------------------------
    useEffect(() => {
        if (!isDraggingSeek) return;

        const onMove = (e: PointerEvent) => {
            seekToClientX(e.clientX);
        };
        const onUp = () => setIsDraggingSeek(false);

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, [isDraggingSeek, seekToClientX]);

    // ---- When dragging the Sound Bar --------------------------------------------------
    useEffect(() => {
        if (!isDraggingVolume) return;

        const onMove = (e: PointerEvent) => {
            setVolumeFromClientX(e.clientX);
        };

        const onUp = () => {
            setIsDraggingVolume(false);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("pointercancel", onUp);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointercancel", onUp);
        };
    }, [isDraggingVolume, setVolumeFromClientX]);

    // ---- Control Bar disaper after 3s when not move the mouse --------------------------------------------------
    const resetControlsTimeout = useCallback(() => {
        setShowControls(true);
        if (controlsTimeoutRef.current)
            clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying && !isDraggingSeek && !isDraggingVolume)
                setShowControls(false);
        }, 3000);
    }, [isPlaying, isDraggingSeek, isDraggingVolume]);

    useEffect(() => {
        resetControlsTimeout();
        return () => {
            if (controlsTimeoutRef.current)
                clearTimeout(controlsTimeoutRef.current);
        };
    }, [isPlaying, resetControlsTimeout]);

    // ----  KEYBOARD SHORTCUTS ---------------------------------------------------
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case " ":
                case "k":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowRight":
                    skip(15);
                    break;
                case "ArrowLeft":
                    skip(-15);
                    break;
                case "m":
                    toggleMute();
                    break;
                case "f":
                    toggleFullscreen();
                    break;
            }
        };

        container.addEventListener("keydown", onKeyDown);
        return () => container.removeEventListener("keydown", onKeyDown);
    }, [togglePlay, skip, toggleMute, toggleFullscreen]);

    // ---------------------------------------------------
    const progressPercent = isSeekable ? (currentTime / duration) * 100 : 0;
    const bufferedPercent = isSeekable ? (buffered / duration) * 100 : 0;
    const volumePercent = isMuted ? 0 : volume * 100;

    return {
        refs: { videoRef, containerRef, progressRef, volumeRef },
        state: {
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
        },
        actions: {
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
        },
    };
}
