import { API_OPTIONS } from "./constant";

export const API_CALL = async (params) => {
    const data = await fetch(
        "https://api.themoviedb.org/3/" + params,
        API_OPTIONS,
    );
    return data.json();
};
