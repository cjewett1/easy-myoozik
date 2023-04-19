import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Login(props) {
    //setting the route
    const route = useRouter();

    //Anytime you want to get a user, call the useAuthState and pass in auth.
    const [user, loading] = useAuthState(auth);

    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            //takes them to the homepage
            route.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            route.push("/");
        } else {
            console.log("Login");
        }
    }, [user]); //This will run every time the user changes

    return (
        <>
            <Header />
            <div>
                <h1>Page not needed?</h1>
            </div>
        </>
    );
}
