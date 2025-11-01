import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import { API_OPTIONS, genreMap } from "../utils/constant";
import { addGPTMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const industryMap = {
        bollywood: "&with_origin_country=IN&with_original_language=hi",
        hollywood: "&with_origin_country=US&with_original_language=en",
        tollywood: "&with_origin_country=IN&with_original_language=te",
    };

    const handleGptSearchClick = async () => {
        const searchQuery = searchText.current.value.trim();
        if (!searchQuery) return;

        const words = searchQuery.toLowerCase().split(" ");
        let genreId = null;
        let industryParams = "";

        for (const word of words) {
            if (genreMap[word]) genreId = genreMap[word];
            if (industryMap[word]) industryParams = industryMap[word];
        }

        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US`;

        if (genreId) url += `&with_genres=${genreId}`;
        if (industryParams) url += industryParams;

        if (!genreId && !industryParams) {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                searchQuery,
            )}&include_adult=false&language=en-US`;
        }

        try {
            const response = await fetch(url, API_OPTIONS);
            const data = await response.json();
            const movieNames = data?.results
                .map((movie) => movie.title || movie.original_title)
                .filter(Boolean);

            dispatch(
                addGPTMovieResult({
                    movieNames: movieNames,
                    movieResults: data.results,
                }),
            );
        } catch (error) {
            console.error("Error fetching TMDB movies:", error);
        }
    };

    return (
        <div className="pt-[10%] md:pt-[8%] flex justify-center px-4">
            <form
                className="w-full md:w-1/2 bg-brand-dark grid grid-cols-12 rounded-lg shadow-md p-2"
                onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-3 m-2 col-span-9 font-sans bg-gray-500 border border-amber-50 text-brand-light-gray placeholder-brand-light-gray/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    placeholder={lang[langKey].GPTSearchPlaceholder}
                />
                <button
                    className="cursor-pointer py-3 px-4 m-2 col-span-3 font-sans bg-red-700 text-white rounded-lg hover:bg-brand-red/90 transition-colors duration-200"
                    onClick={handleGptSearchClick}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
