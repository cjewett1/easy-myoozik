import { db } from "@/utils/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function RecentReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsCollection = collection(db, "reviews");
            const reviewsQuery = query(
                reviewsCollection,
                orderBy("timestamp", "desc"),
                limit(3)
            );
            const querySnapshot = await getDocs(reviewsQuery);
            const reviewsData = [];
            querySnapshot.forEach((doc) => {
                reviewsData.push(doc.data());
            });
            setReviews(reviewsData);
        };

        fetchReviews();
    }, []);

    return (
        <section>
            <h1>Recent reviews...</h1>
            <ul className='review-card-flex-container'>
                {reviews.map((review) => (
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
        </section>
    );
}
