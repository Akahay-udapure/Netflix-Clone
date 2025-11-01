import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import {
    NETFLIX_LOGO,
    SUPPORTED_LANGAUGE,
    USER_AVATAR,
} from "../utils/constant";
import { changeLangauge } from "../utils/configSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                navigate("/");
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleGPTSearchClick = () => {
        dispatch(toggleGPTSearchView());
    };

    const handleOnLangaugeChange = (e) => {
        dispatch(changeLangauge(e.target.value));
    };
    return (
        <div className="absolute z-10 w-screen px-8 bg-linear-to-b from-black flex justify-between">
            <ul className="flex items-center">
                <li>
                    <img
                        className="w-20 md:w-44"
                        src={NETFLIX_LOGO}
                        alt="Netflix Logo"
                    />
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 text-white transition-colors">
                    Home
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 text-white transition-colors">
                    TV Shows
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 text-white transition-colors">
                    Movies
                </li>
            </ul>
            {/* <img className="w-60 h-30 px-8 py-4" src={NETFLIX_LOGO} alt="" /> */}
            {user && (
                <ul className="flex items-center p-1">
                    {showGPTSearch && (
                        <li className="mx-2">
                            <select
                                className="cursor-pointer py-1.5 px-3 md:px-3 text-sm bg-pink-700 text-white font-semibold rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                                onChange={handleOnLangaugeChange}>
                                {SUPPORTED_LANGAUGE.map((lang) => (
                                    <option
                                        className="font-bold"
                                        key={lang.identifier}
                                        value={lang.identifier}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                    )}
                    <li className="mx-2">
                        <button
                            className="cursor-pointer py-1.5 px-3 md:px-3 text-sm bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            onClick={handleGPTSearchClick}>
                            GPT Search
                        </button>
                    </li>
                    <li className="mx-2 flex">
                        <img className="w-12 h-12" src={USER_AVATAR} alt="" />
                        <button
                            className="text-white ml-2 font-bold cursor-pointer"
                            onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Header;
