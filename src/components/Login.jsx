import React, { useState } from "react";
import Header from "./Header";
import { auth } from "../utils/firebase";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG } from "../utils/constant";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                if (isSignInForm) {
                    signInWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password,
                    )
                        .then((userCredential) => {
                            const user = userCredential.user;
                            navigate("/browse");
                            toast.success("Login Sucess!!");
                        })
                        .catch((error) => {
                            const errorMessage =
                                error.code == "auth/invalid-credential"
                                    ? "Please Enter Valid Credentials"
                                    : error.code;
                            toast.error(errorMessage);
                        });
                } else {
                    createUserWithEmailAndPassword(
                        auth,
                        values.email,
                        values.password,
                    )
                        .then((userCredential) => {
                            // Signed up
                            const user = userCredential.user;
                            toggleSignInForm();
                            toast.success("User Registered!!");
                            updateProfile(user, {
                                displayName: values.name,
                                photoURL:
                                    "https://s3.amazonaws.com/media.mixrank.com/profilepic/6a0677e8e96931adae02f2d9f890bba8",
                            })
                                .then(() => {
                                    const {
                                        uid,
                                        email,
                                        displayName,
                                        photoURL,
                                    } = auth.currentUser;
                                    dispatch(
                                        addUser({
                                            uid: uid,
                                            email: email,
                                            displayName: displayName,
                                            photoURL: photoURL,
                                        }),
                                    );
                                })
                                .catch((error) => {
                                    toast.error(error);
                                });
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            toast.error(errorCode + " " + errorMessage);
                        });
                    resetForm(); // clear form fields
                }
            } catch (error) {
                toast.error("Something went wrong!");
            }
            setSubmitting(false); // re-enable button
        },
    });
    return (
        <div>
            <Header />
            <div className="absolute">
                <img className="w-full" src={BG_IMG} alt="" />
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="w-4/12 absolute p-12 bg-black my-30 mx-auto right-0 left-0 text-white opacity-80">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Fullname"
                        className="p-4 my-4 w-full bg-gray-700 rounded-sm"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email or mobile number"
                    className="p-4 my-4 w-full bg-gray-700 rounded-sm"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <small className="text-red-500 text-sm block -mt-2 mb-2 font-bold">
                        {formik.errors.email}
                    </small>
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    className="p-4 my-4 w-full bg-gray-700 rounded-sm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <small className="text-red-500 text-sm block -mt-2 mb-2 font-bold">
                        {formik.errors.password}
                    </small>
                )}

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="cursor-pointer bg-red-600 hover:bg-red-700 transition-all p-4 my-6 rounded font-semibold w-full">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className="font-bold text-sm cursor-pointer"
                    onClick={toggleSignInForm}>
                    {!isSignInForm
                        ? "Already a member? Sign In Now"
                        : "New to Netflix? Sign Up Now"}
                </p>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Login;
