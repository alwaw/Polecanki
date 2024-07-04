import React from "react";
import styles from "./StarRatingUser.module.css";
import { MAX_STAR_RATE } from "../../utils/const.jsx";

import useReviewStore from "../../useReviewStore"; // Import the Zustand store

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRatingUser({ initialValue, edit }) {
  const { userStarRate, setUserStarRate } = useReviewStore();

  const userStarsArray = new Array(MAX_STAR_RATE).fill(null);

  // filling the array with values from 1 to MAX_STAR_RATE
  for (let i = 0; i < userStarsArray.length; i++) {
    userStarsArray[i] = i + 1;
  }

  function starClickHandler(star) {
    setUserStarRate(star);
  }

  function renderStars() {

    //User rates the TV show (for the first time)
    if (!initialValue && edit) {
      return (
        userStarsArray.map((star, index) => (
          <span key={index} onClick={() => starClickHandler(star)}>
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={styles.singleStar}
              color={userStarRate >= star ? "gold" : undefined}
            />
          </span>
        ))
      )
    }

    //The user reads the rating in a read-only modal.
    if(initialValue && !edit) {
      return (
        userStarsArray.map((star, index) => (
          <span key={index}>
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={styles.singleStar}
              color={initialValue >= star ? "gold" : undefined}
            />
          </span>
        ))
      )
    }

    //The user edits his rating
    if(initialValue && edit) {
      return (
        userStarsArray.map((star, index) => (
          <span key={index} onClick={() => starClickHandler(star)}>
            <FontAwesomeIcon
              icon={faStar}
              size="xl"
              className={styles.singleStar}
              color={userStarRate >= star ? "gold" : undefined}
            />
          </span>
        ))
      )
    }
  }



  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Twoja ocena: </h3>
      <div>
       {renderStars()}
      </div>
    </div>
  );
}

export default StarRatingUser;
