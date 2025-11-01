import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movieList = useSelector((store) => store.movies);

    return (
        <div className="text-white relative bg-linear-to-b from-transparent via-gray-900 to-black">
            {/* Video background area - cards will overlap this */}
            <div className="relative">
                {/* "Now Playing" section overlaps video */}
                <div className="-mt-30 px-4 md:px-8">
                    <MovieList
                        title={""}
                        movies={movieList.nowPlayingMovies}
                        isOverlay={true} // Pass prop to indicate overlapping
                    />
                </div>
            </div>

            {/* Content background starts here */}
            <div>
                {/* Push content down so background starts at video end */}
                <div>
                    <div className="px-4 md:px-8">
                        <MovieList
                            title={"Top Rated"}
                            movies={movieList.topRatedMovies}
                        />
                        <MovieList
                            title={"Upcoming"}
                            movies={movieList.upcomingMovies}
                        />
                        <MovieList
                            title={"Popular"}
                            movies={movieList.popularMovies}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondaryContainer;
