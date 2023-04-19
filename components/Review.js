import StarRating from "./StarRating";
import { useState, useEffect } from "react";
import { auth, db } from "@/utils/firebase";
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import "firebase/database";
import { ToastContainer, toast } from "react-toastify";

export default function Review({ artistName }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [user, loading] = useAuthState(auth);

    const route = useRouter();

    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [loggedArtistName, setLoggedArtistName] = useState("");

    //storing the localstorage ID into this variable
    useEffect(() => {
        const loggedId = localStorage.getItem("userUid");
        const loggedArtistName = localStorage.getItem("name");
        setLoggedInUserId(loggedId);
        setLoggedArtistName(loggedArtistName);
    }, []);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const submitReview = async (event) => {
        event.preventDefault();

        // Check if the user has already left a review for this artist
        const userReviewsQuery = query(
            collection(db, "reviews"),
            where("name", "==", artistName),
            where("user", "==", loggedInUserId)
        );
        const userReviewsSnapshot = await getDocs(userReviewsQuery);
        if (!userReviewsSnapshot.empty) {
            // User has already left a review
            toast.warn(
                "You have already left a review for this artist. 🤷‍♂️ Go to your admin page to edit or remove it. ",
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2500,
                }
            );
            return;
        }
        if (!review) {
            toast.warn("C'mon! Fill out your review before submitting! 🤭 ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        } else {
            // User has not left a review for this artist
            toast.success("Review Posted! Thanks for contributing! 👍 ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        }

        const collectionRef = collection(db, "reviews");

        await addDoc(collectionRef, {
            name: artistName,
            content: review,
            rating: rating,
            user: loggedInUserId,
            avatar: user.photoURL,
            username: user.displayName,
            timestamp: serverTimestamp(),
        });

        setSubmitted(true);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    return (
        <>
            <h2 className={!user ? "review-heading" : "hidden"}>
                Login to write a review!
            </h2>
            <div className={user ? "write-review" : "hidden"}>
                {!submitted ? (
                    <form>
                        <label htmlFor='review'>Leave your review here</label>
                        <textarea
                            name='review'
                            id='review'
                            cols='50'
                            rows='10'
                            value={review}
                            onChange={handleReviewChange}
                        ></textarea>
                        <button
                            onClick={submitReview}
                            className='review-button'
                        >
                            Post Review
                        </button>
                    </form>
                ) : (
                    <p>{review}</p>
                )}
                <StarRating onRatingChange={handleRatingChange} />
            </div>
        </>
    );
}
