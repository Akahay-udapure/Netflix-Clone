import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_CALL } from "../utils/tmdb";

const usePopularMovies = () => {
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
        // const data = await fetch(
        //     "https://api.themoviedb.org/3/movie/popular?page=1",
        //     API_OPTIONS,
        // );
        const json = await API_CALL(`movie/popular?page=1`);
        dispatch(addPopularMovies(json?.results));
    };

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);
};

export default usePopularMovies;
