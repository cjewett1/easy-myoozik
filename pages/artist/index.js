import Header from "@/components/Header";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { faTicket, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Review from "@/components/Review";
import Link from "next/link";
import Following from "@/components/Following";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ArtistInfo(props) {
    const router = useRouter();
    const { name, url, id, upcomingevents } = router.query;
    const [artistName, setArtistName] = useState(null);
    const [artistId, setArtistID] = useState();
    const [artistImage, setArtistImage] = useState("");
    const [artistBio, setArtistBio] = useState("");
    const [concertInfo, setConcertInfo] = useState();
    const [artistReviews, setArtistReviews] = useState([]);
    const [upcomingConcerts, setUpcomingConcerts] = useState("");

    const concertApiKey = process.env.NEXT_PUBLIC_CONCERT_API_KEY;
    const artistApiKey = process.env.NEXT_PUBLIC_ARTIST_API_KEY;

    useEffect(() => {
        setArtistName(name);
        setArtistID(id);
        setArtistImage(url);
        getArtistBio();
        setUpcomingConcerts(upcomingevents);
    }, []);

    useEffect(() => {
        localStorage.setItem("artistsId", artistId);
    }, [artistId]);

    const getArtistBio = async () => {
        try {
            const res = await axios.get(
                `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=${concertApiKey}&format=json`
            );
            setArtistBio(res.data.artist.bio);
        } catch (err) {
            alert(err.message);
        }
    };

    const concertHandler = async () => {
        try {
            const res = await axios.get(
                `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${artistApiKey}`
            );
            setConcertInfo(res.data);
        } catch (err) {
            toast.warn("No upcoming shows! 🤷‍♂️ Check back later!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            console.log("err.message");
            return;
        }
    };

    useEffect(() => {
        if (localStorage.hasOwnProperty("name")) {
            setArtistName(localStorage.getItem("name"));
        }
    }, []);

    useEffect(() => {
        const fetchAllArtistsReviews = async () => {
            const reviewsCollection = collection(db, "reviews");
            const reviewsQuery = query(
                reviewsCollection,
                where("name", "==", artistName)
            );
            const querySnapshot = await getDocs(reviewsQuery);
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                reviewsData.push(doc.data());
            });
            setArtistReviews(reviewsData);
        };
        fetchAllArtistsReviews();
    }, [artistName]);

    return (
        <>
            <Header />
            <Link href={"/#search"}>
                <p className='back-to-search'>
                    {" "}
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        color='black'
                        beatFade
                    />
                    {""}
                    Back to Search
                </p>
            </Link>
            <div className='artist-container'>
                {artistName ? (
                    <div className='artist-heading-container'>
                        <h1 className='artist-page-heading'>{name}</h1>
                    </div>
                ) : (
                    ""
                )}

                {artistName ? (
                    <img src={artistImage} alt='' />
                ) : (
                    <h1>Search another Artist</h1>
                )}
                {artistName ? (
                    <div className='artist-bio-container'>
                        <div
                            className='artist-bio'
                            dangerouslySetInnerHTML={{
                                __html: `${artistBio.summary}`,
                            }}
                        ></div>
                    </div>
                ) : (
                    <div style={{ display: "none" }}></div>
                )}
                <div className='button-container'>
                    {artistName ? (
                        <button
                            className='upcoming-button'
                            onClick={concertHandler}
                        >
                            View Upcoming Concerts ({upcomingConcerts})
                        </button>
                    ) : (
                        ""
                    )}

                    <Following
                        artist={artistName}
                        image={artistImage}
                        id={artistId}
                    />
                </div>
            </div>
            <div>
                <h2>Artist Reviews</h2>
                <ul
                    style={{ paddingBottom: "6rem" }}
                    className='review-card-flex-container'
                >
                    {artistReviews.map((review) => (
                        <li className='review-card' key={review.id}>
                            <p>Artist: {review.name}</p>
                            <p>{review.content}</p>
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
                            <div className='user-info'>
                                <img src={review.avatar} />
                                <p>{review.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Review artistName={artistName} />
            <div className='show-concerts'>
                {concertInfo &&
                    concertInfo.map((shows) => {
                        return (
                            <div className='concert-card'>
                                <div className='venue-info'>
                                    <p style={{ textDecoration: "underline" }}>
                                        {shows.venue.name}
                                    </p>
                                    <div className='country'>
                                        <p>{shows.venue.location} </p>
                                        <p> | </p>
                                        <p> {shows.venue.country}</p>
                                    </div>
                                </div>
                                <div className='bottom-half'>
                                    <div className='where-when'>
                                        <p>
                                            Date:{" "}
                                            {new Date(
                                                shows.datetime
                                            ).toLocaleDateString()}{" "}
                                        </p>
                                        <p>|</p>
                                        <p>
                                            Time:{" "}
                                            {new Date(
                                                shows.datetime
                                            ).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <p>
                                        <a href={shows.url}>
                                            <FontAwesomeIcon
                                                icon={faTicket}
                                                color='white'
                                                bounce
                                            />
                                            Tickets
                                        </a>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
