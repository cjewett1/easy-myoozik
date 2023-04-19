import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function StarRating(props) {
    const [rating, setRating] = useState(0);

    const handleStarClick = (index) => {
        setRating(index);
        if (props.onRatingChange) {
            props.onRatingChange(index);
        }
    };

    return (
        <div className='star-rating'>
            <p className={`star-rating ${rating > 0 ? "hidden" : ""}`}>
                Leave this artist a rating!
            </p>

            <div className='stars'>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <a
                            key={index}
                            className={`stars-rating ${
                                rating > 0 ? "hidden" : "visible"
                            }`}
                            onClick={() => handleStarClick(index)}
                        >
                            <span className='star'>
                                {" "}
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        </a>
                    );
                })}
            </div>
            {rating > 0 && (
                <div className='your-rating'>
                    <p>
                        Your Rating:
                        {[...Array(rating)].map((star, index) => (
                            <span key={index} className='star'>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        ))}
                    </p>
                    {/* <p onClick={handleStarClick}>
                        Click here to change your rating.
                    </p> */}
                </div>
            )}
        </div>
    );
}
