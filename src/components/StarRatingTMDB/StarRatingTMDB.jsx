import React from "react";
import styles from "./StarRatingTMDB.module.css";
import { MAX_STAR_RATE } from "../AddNew/AddNew";

function StarRatingTMDB({ ratingTMDB }) {

  const titleRate = Math.round(ratingTMDB);

  const goldStarsArray = new Array(titleRate).fill(null);
  const emptyStars = MAX_STAR_RATE - titleRate;
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

export default StarRatingTMDB;
