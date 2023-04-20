import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import HeroBanner from "@/components/HeroBanner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";

import RecentReviews from "@/components/RecentReviews";

function App() {
    const [artist, setArtist] = useState(null);
    const [search, setSearch] = useState("");

    const { query } = useRouter();

    const artistApiKey = process.env.NEXT_PUBLIC_ARTIST_API_KEY;

    //State for grabbing the artist name
    const [artistInfo, setArtistInfo] = useState("");

    function searchHandler(event) {
        event.preventDefault();
        const capitalizedSearch = search.replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
        if (capitalizedSearch.trim() === "") {
            //ctrl + cmd + space to bring up emoji keyboard!!!
            toast.error("Search for an artist! 😳  Dont leave it blank! 😅", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        } else {
            setArtist(capitalizedSearch);
            setSearch("");
        }
    }

    useEffect(() => {
        getArtist();
    }, [artist]);

    const getArtist = async () => {
        try {
            const res = await axios.get(
                `https://rest.bandsintown.com/artists/${artist}/?app_id=${artistApiKey}`
            );
            setArtistInfo(res.data);
            localStorage.setItem("name", artist);
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <main className='main-container'>
            <Header />
            <HeroBanner />
            <h1>Your favorite concert is just a search away...</h1>
            <div id='search' className='search'>
                <div>
                    <form onSubmit={searchHandler}>
                        <div className='search-bar'>
                            <input
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }}
                                label='search'
                                type='search'
                            />
                            <button className='search-button'>Search</button>
                        </div>
                        <label>Search for an Artist</label>
                    </form>
                </div>
            </div>
            {artistInfo ? (
                <section className='artist-info'>
                    <section
                        className={artistInfo.name ? "artist-info" : "hidden"}
                    >
                        <h1>{artistInfo.name}</h1>
                        {/* <h2>{artistInfo.links.type[4]}</h2> */}
                        <Link
                            href={{
                                pathname: "/artist",
                                query: {
                                    name: artistInfo.name,
                                    url: artistInfo.image_url,
                                    id: artistInfo.id,
                                    upcomingevents:
                                        artistInfo.upcoming_event_count,
                                },
                            }}
                        >
                            <img src={artistInfo.image_url} alt='' />
                        </Link>
                        <p>
                            {artistInfo.url && (
                                <a href={artistInfo.url} target={"_blank"}>
                                    <strong>Link to Bandsintown page</strong>
                                </a>
                            )}
                            <Link
                                href={{
                                    pathname: "/artist",
                                    query: {
                                        name: artistInfo.name,
                                        url: artistInfo.image_url,
                                        id: artistInfo.id,
                                    },
                                }}
                            >
                                View Page
                            </Link>
                        </p>
                    </section>
                </section>
            ) : (
                <h1>No Artist Found. Try another search.</h1>
            )}
            <RecentReviews />
        </main>
    );
}

export default App;
