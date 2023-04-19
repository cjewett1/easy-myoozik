import { useState, useEffect } from "react";
import { auth, db } from "@/utils/firebase";
import {
    addDoc,
    collection,
    serverTimestamp,
    getDocs,
    getDoc,
    doc,
    query,
    update,
    deleteDoc,
    updateDoc,
    where,
    limit,
    onSnapshot,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import "firebase/database";

export default function Following({ artist, image, id }) {
    const [user, loading] = useAuthState(auth);
    const [isFollowing, setIsFollowing] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [artistId, setArtistID] = useState(id);

    console.log(`on page refresh ${isFollowing}`);

    //Locally stored variables
    //The logged in users ID
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [loggedArtistName, setLoggedArtistName] = useState("");

    const userId = user?.uid;

    //storing the localstorage ID into this variable
    useEffect(() => {
        const loggedId = localStorage.getItem("userUid");
        const loggedArtistName = localStorage.getItem("name");
        setLoggedInUserId(loggedId);
        setLoggedArtistName(loggedArtistName);
    }, []);

    useEffect(() => {
        setArtistID(id);
    }, [id]);

    //Fetch following data and check if the user is following the artist
    useEffect(() => {
        const fetchFollowing = async () => {
            if (!user) {
            } else {
                const followingCollection = collection(db, "following");
                const followingQuery = query(
                    followingCollection,
                    where("user", "==", loggedInUserId),
                    where("name", "==", loggedArtistName) // Filter by user ID
                );
                const querySnapshot = await getDocs(followingQuery);
                const followingData = [];
                querySnapshot.forEach((doc) => {
                    followingData.push(doc.data());
                });
                setFollowingData(followingData);

                if (querySnapshot.size > 0) {
                    // A document exists with the user, artist, and isFollowing set to true
                    setIsFollowing(true);
                } else {
                    // No document exists or isFollowing is set to false
                    setIsFollowing(false);
                }
            }
        };
        fetchFollowing();
    }, [user, loggedInUserId, loggedArtistName]);

    //When the user follows the artist, this entry is sent to the collection.
    const userHasFollowedArtist = async (event) => {
        event.preventDefault();
        const collectionRef = collection(db, "following");
        await addDoc(collectionRef, {
            name: artist,
            image: image,
            id: id,
            user: userId,
        });
        setIsFollowing(true);
    };

    //When the artist is unfollowed, entry is deleted.
    const unfollowArtist = async (artistId) => {
        const followingRef = collection(db, "following");
        if (artistId) {
            const querySnapshot = await getDocs(
                query(
                    followingRef,
                    where("id", "==", artistId),
                    where("user", "==", userId)
                )
            );
            querySnapshot.forEach(async (doc) => {
                const docRef = doc.ref;
                await deleteDoc(docRef);
            });
            setIsFollowing(false); // update the state to reflect the change
        }
    };

    console.log(isFollowing);

    return (
        <div>
            {user ? (
                isFollowing ? (
                    <button
                        onClick={() => unfollowArtist(artistId)}
                        className='upcoming-button'
                    >
                        Unfollow
                    </button>
                ) : (
                    <button
                        className='upcoming-button'
                        onClick={userHasFollowedArtist}
                    >
                        Follow
                    </button>
                )
            ) : (
                ""
            )}
        </div>
    );
}
