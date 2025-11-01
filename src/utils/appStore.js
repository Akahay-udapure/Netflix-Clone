import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import gpt from "./gptSlice";
import configSlice from "./configSlice";

const appStore = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice,
        gpt: gpt,
        config: configSlice,
    },
});

export default appStore;
