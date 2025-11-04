import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_CALL } from "../utils/tmdb";

const useTopRatedMovies = () => {
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
        // const data = await fetch(
        //     "https://api.themoviedb.org/3/movie/top_rated?page=1",
        //     API_OPTIONS,
        // );
        const json = await API_CALL(`movie/top_rated?page=1`);
        dispatch(addTopRatedMovies(json?.results));
    };

    useEffect(() => {
        !topRatedMovies && getTopRatedMovies();
    }, []);
};

export default useTopRatedMovies;
