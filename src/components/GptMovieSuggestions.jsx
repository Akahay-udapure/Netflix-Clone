import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
    // Get data from Redux store
    const { movieResults } = useSelector((store) => store.gpt);

    if (!movieResults || movieResults.length === 0) return null;

    const moviesPerList = 7;
    const movieGroups = [];
    for (let i = 0; i < movieResults.length; i += moviesPerList) {
        const group = movieResults.slice(i, i + moviesPerList);
        movieGroups.push(group);
    }

    const movieNames = [
        "Most Watched",
        "Trending Now",
        "Recommended For You",
        "Most Popular",
    ];

    return (
        <div className="p-4 mt-4 w-full bg-brand-dark">
            {movieGroups.map((group, index) => (
                <MovieList
                    key={index}
                    title={movieNames[index] || `Movies List ${index + 1}`}
                    movies={group}
                />
            ))}
        </div>
    );
};

export default GptMovieSuggestions;
