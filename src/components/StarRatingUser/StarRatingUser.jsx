import React from "react";
import styles from "./StarRatingUser.module.css";
import { MAX_STAR_RATE } from "../AddNew/AddNew";

// pobrać ikonkę gwiazdki 
// ustawić ternary: pozycja gwiazdki jest większa lub równa ratingowi usera ? gold : grey


function StarRatingUser() {
  const [userRate, setUserRate] = React.useState(0);

  const userStarsArray = new Array(MAX_STAR_RATE).fill(null);



    console.log(MAX_STAR_RATE);

  
    console.log(userStarsArray);

    //wypełniam tablicę wartościami od 1 do max
    for (let i = 0; i < userStarsArray.length; i++) {
      userStarsArray[i] = i + 1;
    }

    console.log(userStarsArray);

    function mappingThroughTheStars(pendingRate) {
      setUserRate(pendingRate);
      console.log("userRate" + userRate);
      const goldStarsArray = new Array(pendingRate).fill(null);
      const emptyStars = MAX_STAR_RATE - pendingRate;
      const emptyStarsArray = new Array(emptyStars).fill(null);
    

      return (
        <div className={styles.wrapper}>
          {goldStarsArray.map(() => (
            <span key={crypto.randomUUID()}>
              <img
                className={styles.singleStar}
                src="src\assets\full_star.png"
                alt="gold star"
              />
            </span>
          ))}
          {emptyStarsArray.map(() => (
            <span key={crypto.randomUUID()}>
              <img
                className={styles.singleStar}
                src="src\assets\empty_star.png"
                alt="empty star"
              />
            </span>
          ))}
        </div>
      );
    }

    return (
      <div styles={styles.wrapper}>
        {userStarsArray.map((userStar, index) => (
          <label key={userStar}>
            <input
              value={userStar}
              className={styles.input}
              type="radio"
              name="starRating"
              id={userStar}
              checked={userStar === userRate}
              onChange={(event) => {
                const pendingRate = event.target.value;
                mappingThroughTheStars(pendingRate);
              }}
            />
            <img
              className={styles.singleStar}
              src="src\assets\empty_star.png"
              alt="empty star"
            />
          </label>
        ))}
      </div>
    );
}

export default StarRatingUser;
