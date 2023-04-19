import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { db } from "@/utils/firebase";
import {
    collection,
    query,
    deleteDoc,
    onSnapshot,
    where,
    getDocs,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Name({ artistId }) {
    const [user, loading] = useAuthState(auth);
    const [reviews, setReviews] = useState([]);
    const [following, setFollowing] = useState([]);
    const [posts, setPosts] = useState([]);
    const route = useRouter();
    const [loggedArtistName, setLoggedArtistName] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState("");

    useEffect(() => {
        const loggedId = localStorage.getItem("userUid");
        const loggedArtistName = localStorage.getItem("name");
        setLoggedInUserId(loggedId);
        setLoggedArtistName(loggedArtistName);
    }, []);

    const getData = async () => {
        //See if the user is logged in
        if (loading) return;
        if (!user) route.push("auth/login");
        const collectionRef = collection(db, "reviews");
        const q = query(collectionRef, where("user", "==", user.uid));
        //based off of this user.uid, only should this users posts.
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        return unsubscribe;
    };

    //Get users data
    useEffect(() => {
        getData();
    }, [user, loading]);

    //Used to grab all the users reviews
    useEffect(() => {
        const fetchReviews = async () => {
            if (!user) {
                route.push("/");
            } else {
                const reviewsCollection = collection(db, "reviews");
                const reviewsQuery = query(
                    reviewsCollection,
                    where("user", "==", user.uid)
                );
                const querySnapshot = await getDocs(reviewsQuery);
                const reviewsData = [];
                querySnapshot.forEach((doc) => {
                    reviewsData.push(doc.data());
                });
                setReviews(reviewsData);
            }
        };
        fetchReviews();
    }, [user]);

    //Function to check if this user is following this artist
    useEffect(() => {
        const fetchFollowing = async () => {
            if (!user) {
                route.push("/");
            } else {
                const followingCollection = collection(db, "following");
                const followingQuery = query(
                    followingCollection,
                    where("user", "==", user.uid)
                );
                const querySnapshot = await getDocs(followingQuery);
                const followingData = [];
                querySnapshot.forEach((doc) => {
                    followingData.push(doc.data());
                });
                setFollowing(followingData);
            }
        };
        fetchFollowing();
    }, [user]);

    const unfollowArtist = async (artistId) => {
        // Remove the artist from the UI
        setFollowing(following.filter((follow) => follow.id !== artistId));

        // Remove the artist from the database
        const followingRef = collection(db, "following");
        const querySnapshot = await getDocs(
            query(
                followingRef,
                where("id", "==", artistId),
                where("user", "==", user.uid)
            )
        );
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    };

    const removeReview = async (name) => {
        // Remove the review from the UI
        setReviews((prevReviews) =>
            prevReviews.filter((review) => review.name !== name)
        );

        // Remove the review from the database
        const reviewsRef = collection(db, "reviews");
        const querySnapshot = await getDocs(
            query(reviewsRef, where("name", "==", name))
        );
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: "100vh" }} className='section'>
                <h1 style={{ textTransform: "capitalize" }}>
                    Welcome to your admin page!
                </h1>
                <div>
                    <h1>Your Followed Artists</h1>
                    <div className='followed-artist-flex'>
                        {following.map((follow) => (
                            <div className='followed-artist' key={follow.id}>
                                <img src={follow.image}></img>
                                <h2>{follow.name}</h2>
                                <button
                                    onClick={() => unfollowArtist(follow.id)}
                                    className='review-button'
                                >
                                    Unfollow
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <h1>Your Reviews</h1>
                <ul className='review-card-flex-container'>
                    {reviews.map((review) => (
                        <li className='review-card' key={review.id}>
                            <p>Artist: {review.name}</p>
                            <p>Your Review: {review.content}</p>
                            <p>
                                Rating:{" "}
                                {[...Array(review.rating)].map((_, index) => (
                                    <i key={index}>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            color='black'
                                        />
                                    </i>
                                ))}
                            </p>
                            <p>
                                Posted On:{" "}
                                {review.timestamp.toDate().toLocaleDateString()}
                            </p>

                            <button
                                onClick={() => removeReview(review.name)}
                                className='remove-review-button'
                            >
                                Remove Review
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
