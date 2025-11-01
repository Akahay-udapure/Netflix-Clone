import { BG_IMG } from "../utils/constant";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img className="w-full" src={BG_IMG} alt="logo" />
            </div>
            <div className="">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    );
};
export default GPTSearch;
