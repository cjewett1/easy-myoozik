import React from "react";
import Image from "next/image";
import concert from "../pages/public/images/concert.jpg";

export default function HeroBanner() {
    return (
        <div className='hero-banner'>
            <div className='hero-banner-container'>
                <Image
                    className='hero-banner-image'
                    src={concert}
                    alt='Picture of the author'
                />
                <div className='heading'>
                    <h1>
                        Welcome to Easy Music. Where the music's easy and so are
                        we.
                    </h1>
                </div>
            </div>
        </div>
    );
}
