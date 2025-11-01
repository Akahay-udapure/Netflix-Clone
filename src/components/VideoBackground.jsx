import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useEffect } from "react";

const VideoBackground = ({ movieId, isMuted, onToggleMute }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    useMovieTrailer(movieId);

    const srcUrl = trailerVideo?.key
        ? `https://www.youtube.com/embed/${
              trailerVideo.key
          }?autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${
              trailerVideo.key
          }&mute=${isMuted ? 1 : 0}`
        : "";

    useEffect(() => {
        const handleClick = () => {
            onToggleMute();
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [onToggleMute]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* 16:9 Aspect Ratio with Full HD scaling */}
            <div className="absolute top-0 left-0 w-full h-full">
                <iframe
                    className="w-full h-full object-cover"
                    src={srcUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
            </div>

            {/* Optional: add a dark overlay for better contrast with UI elements */}
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
    );
};

export default VideoBackground;
