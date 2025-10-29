import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

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
    return (
        <div className="absolute z-10 w-screen px-8 bg-linear-to-b from-black flex justify-between">
            <img
                className="w-60 h-30 px-8 py-4"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt=""
            />
            {user && (
                <div className="flex p-8">
                    <img
                        className={`w-12 h-12 ${
                            user?.photoURL ? "rounded-3xl" : ""
                        }`}
                        src={
                            user?.photoURL ||
                            "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                        }
                        alt=""
                    />
                    <button
                        className="text-white mx-2 font-bold cursor-pointer"
                        onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
