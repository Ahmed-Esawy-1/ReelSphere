import { memo } from "react";
import PlayIcon from "@mui/icons-material/PlayArrow";

interface CenterPlayButtonProps {
    onClick: () => void;
}

// BIG CENTER BUTTON TO PLAY
function CenterPlayButton({ onClick }: CenterPlayButtonProps) {
    return (
        <button
            onClick={onClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
        >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-black shadow-lg transition hover:scale-105 hover:bg-emerald-900">
                <PlayIcon className="h-9 w-9 translate-x-0.5 fill-current" />
            </span>
        </button>
    );
}

export default memo(CenterPlayButton);
