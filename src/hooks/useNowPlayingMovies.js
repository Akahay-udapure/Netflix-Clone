import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_CALL } from "../utils/tmdb";

const useNowPlayingMovies = () => {
    const nowPlayingMovies = useSelector(
        (store) => store.movies.nowPlayingMovies,
    );
    const dispatch = useDispatch();
    const getNowPlayingVideo = async () => {
        // const data = await fetch(
        //     "https://api.themoviedb.org/3/movie/now_playing?page=1",
        //     API_OPTIONS,
        // );

        const json = await API_CALL("movie/now_playing?page=1");
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingVideo();
    }, []);
};

export default useNowPlayingMovies;
