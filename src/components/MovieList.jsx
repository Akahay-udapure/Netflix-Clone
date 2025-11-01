import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addCurrentTrailer, addTrailerVideo } from "../utils/movieSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";

const MovieList = ({ title, movies, isOverlay = false }) => {
    const dispatch = useDispatch();
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

    const handleClick = async (movie) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
            API_OPTIONS,
        );
        const json = await data.json();

        const filterData = json?.results?.filter(
            (video) => video.type === "Trailer",
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
        dispatch(addCurrentTrailer(movie));
        if (showGPTSearch) dispatch(toggleGPTSearchView());
    };

    return (
        <div className={`relative ${isOverlay ? "" : "rounded-lg"}`}>
            <h1
                className={`pb-3 mt-6 font-semibold text-white ${
                    isOverlay ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                }`}>
                {title}
            </h1>
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-linear-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>

                <div className="flex space-x-3 md:space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide pb-4">
                    {movies?.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className="transition-all duration-300 hover:scale-110">
                            <MovieCard
                                posterPath={movie.poster_path}
                                isOverlay={isOverlay}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-linear-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default MovieList;
