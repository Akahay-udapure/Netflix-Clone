import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    const currenTrailer = useSelector((store) => store.movies.currenTrailer);
    const [isMuted, setIsMuted] = useState(true);

    // 🩵 Always call hooks before any conditional return

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
    };

    const playMainVideoUnmuted = () => {
        if (isMuted) {
            setIsMuted(false);
        }
    };

    const truncateOverview = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        const lastSpace = text.lastIndexOf(" ", maxLength);
        if (lastSpace > 0) {
            return text.substring(0, lastSpace) + "...";
        } else {
            return text.substring(0, maxLength) + "...";
        }
    };

    useEffect(() => {
        if (isMuted) setIsMuted(false);
    }, [isMuted]);

    // 🧩 Safe conditional rendering AFTER all hooks
    if (!movies) {
        return <div className="text-white text-center p-10">Loading...</div>;
    }

    const mainMovie = movies[5];
    const { original_title, overview, id } = currenTrailer
        ? currenTrailer
        : mainMovie;

    return (
        <div className="relative w-screen h-screen">
            <VideoBackground
                movieId={id}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <VideoTitle
                    title={original_title}
                    overview={truncateOverview(overview, 150)}
                    onPlayVideo={playMainVideoUnmuted}
                />
            </div>
        </div>
    );
};

export default MainContainer;
