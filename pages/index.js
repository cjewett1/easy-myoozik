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
    const [artist, setArtist] = useState("");
    const [search, setSearch] = useState("");

    const { query } = useRouter();

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

    console.log(search);
    useEffect(() => {
        const getArtist = async () => {
            try {
                const res = await axios.get("/api/myapi", {
                    params: { artist: artist },
                });
                setArtistInfo(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (artist) {
            getArtist();
        }
    }, [artist]);

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

            {/* Rendering section */}
            {search && !artistInfo ? (
                <h1>No Artist Found. Try another search.</h1>
            ) : artistInfo && artistInfo.length > 0 ? (
                <section className='artist-info'>
                    {artistInfo.map((artist) => (
                        <div key={artist.id}>
                            <h1>{artist.name}</h1>
                            <img src={artist.url} alt={artist.name} />
                            <Link
                                href={{
                                    pathname: "/artist",
                                    query: {
                                        name: artist.name,
                                        url: artist.url,
                                        id: artist.id,
                                        upcomingevents: artist.upcoming,
                                    },
                                }}
                            >
                                <img src={artistInfo.url} alt='' />
                            </Link>
                            <p>
                                {artist.url && (
                                    <a href={artist.link} target='_blank'>
                                        <strong>
                                            Link to Bandsintown page
                                        </strong>
                                    </a>
                                )}
                                <Link
                                    href={{
                                        pathname: "/artist",
                                        query: {
                                            name: artist.name,
                                            url: artist.url,
                                            id: artist.id,
                                            upcomingevents: artist.upcoming,
                                        },
                                    }}
                                >
                                    View Page
                                </Link>
                            </p>
                        </div>
                    ))}
                </section>
            ) : null}

            <RecentReviews />
        </main>
    );
}

export default App;
