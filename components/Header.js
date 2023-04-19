import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Header() {
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userUid = result.user.uid;
            localStorage.setItem("userUid", userUid); // store user id in local storage
            // redirect to the homepage or do something else with the userUid
            toast.success("Login Successful! 😎 Welcome! ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <div className='logo'>
                <FontAwesomeIcon icon={faMusic} color='black' beatFade />
                <a href='/'>Easy Myoozik</a>
            </div>
            <nav>
                <ul>
                    {user && (
                        <Link href={"/yourpage"}>
                            <li>Your Page</li>
                        </Link>
                    )}
                    {!user ? (
                        <li style={{ cursor: "pointer" }} onClick={GoogleLogin}>
                            Log In
                        </li>
                    ) : (
                        <li
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                auth.signOut();
                                //When the user logs out, the stored ID is removed
                                localStorage.removeItem("userUid");
                                toast.success(
                                    "Logout Successful! See ya next time! 👋 ",
                                    {
                                        position: toast.POSITION.TOP_CENTER,
                                        autoClose: 1500,
                                    }
                                );
                                route.push("/");
                            }}
                        >
                            Sign out
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
