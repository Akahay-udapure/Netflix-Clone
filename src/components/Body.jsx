import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    }),
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        // Unsubscribe when component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Body;
