const data = [
    {
        id: 1,
        name: "Taylor Swift",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Taylor_Swift_Reputation_Tour1_%28cropped%29.jpg/800px-Taylor_Swift_Reputation_Tour1_%28cropped%29.jpg",
        upcoming: 1,
        concert: {
            id: 1,
            country: "Canada",
            name: "Canada Rocks Festival",
            location: "Edmonton, AB",
            datetime: "2023-10",
        },
    },
    {
        id: 2,
        name: "Charli XCX",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Charli_XCX_2022_amfAR_Gala.jpg/800px-Charli_XCX_2022_amfAR_Gala.jpg",
        link: "https://www.bandsintown.com/a/289995-charli-xcx",
        upcoming: 1,
        concert: {
            id: 1,
            country: "Canada",
            name: "Canada Rocks Festival",
            location: "Edmonton, AB",
            datetime: "2023-10",
        },
    },
    {
        id: 3,
        name: "Metallica",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Metallica_-_The_O2_-_Tuesday_24th_October_2017_MetallicaO2241017-3_%2837955387006%29_%28cropped%29.jpg/1920px-Metallica_-_The_O2_-_Tuesday_24th_October_2017_MetallicaO2241017-3_%2837955387006%29_%28cropped%29.jpg",
        link: "https://www.bandsintown.com/a/128-metallica",
        upcoming: 1,
        concert: {
            id: 1,
            country: "Canada",
            name: "Canada Rocks Festival",
            location: "Edmonton, AB",
            datetime: "2023-10",
        },
    },
    {
        id: 4,
        name: "The Beatles",
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b0/The_Beatles_-_All_You_Need_Is_Love_%26_Baby%2C_You%27re_a_Rich_Man%2C_1967_%28cropped%29.jpg",
        link: "https://www.bandsintown.com/a/2051476-meet-the-beatles",
        upcoming: 1,
        concert: {
            id: 1,
            country: "Canada",
            name: "Canada Rocks Festival",
            location: "Edmonton, AB",
            datetime: "2023-10",
        },
    },
    {
        id: 5,
        name: "The Weeknd",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/The_Weeknd_with_hand_in_the_air_performing_live_in_Hong_Kong_in_November_2018_%28cropped%29.jpg/1024px-The_Weeknd_with_hand_in_the_air_performing_live_in_Hong_Kong_in_November_2018_%28cropped%29.jpg",
        link: "https://www.bandsintown.com/a/1371750-the-weeknd",
        upcoming: 1,
        concert: {
            id: 1,
            country: "Canada",
            name: "Canada Rocks Festival",
            location: "Edmonton, AB",
            datetime: "2023-10",
        },
    },
];

export default async function handler(req, res) {
    const { artist } = req.query;

    if (artist) {
        // Filter the data based on the artist name
        const filteredData = data.filter((entry) =>
            entry.name.toLowerCase().includes(artist.toLowerCase())
        );
        res.status(200).json(filteredData);
    } else {
        res.status(200).json(data);
    }
}
