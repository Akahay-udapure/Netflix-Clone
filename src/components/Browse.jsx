import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const Browse = () => {
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return (
        <div>
            <Header />
            {showGPTSearch ? (
                <GptSearch />
            ) : (
                <>
                    <MainContainer />
                    <SecondaryContainer />
                </>
            )}
            {/**
                MainContainer
                    - VedioBackground
                    - VideoTitle
                SecondaryContainer
                    - MoviesList * n
                    - cards * n
             */}
        </div>
    );
};

export default Browse;
