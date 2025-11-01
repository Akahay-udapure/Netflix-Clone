import { IMG_CDN } from "../utils/constant";

const MovieCard = ({ posterPath, isOverlay = false }) => {
    if (!posterPath) return null;

    return (
        <div
            className={`
                relative
                ${
                    isOverlay
                        ? "w-32 md:w-40 lg:w-48 h-48 md:h-56 lg:h-64"
                        : "w-28 md:w-36 lg:w-44 h-44 md:h-52 lg:h-60"
                }
                shrink-0
                rounded-lg
                overflow-hidden
                transform
                transition-all
                duration-300
                ease-in-out
                shadow-2xl
                cursor-pointer
                border-2 border-transparent
                hover:border-white/30
                hover:scale-110
                hover:z-20
                ${isOverlay ? "shadow-2xl" : "shadow-xl"}
            `}>
            <img
                src={IMG_CDN + posterPath}
                alt="movie"
                className="w-full h-full object-cover rounded-lg"
            />
            {/* Hover overlay effect */}
            <div
                className="
                    absolute inset-0
                    bg-linear-to-t from-black/60 via-transparent to-transparent
                    opacity-0
                    hover:opacity-100
                    transition-opacity
                    duration-200
                    rounded-lg
                "></div>
        </div>
    );
};

export default MovieCard;
