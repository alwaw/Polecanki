import React from "react";
import styles from "./StarRatingTMDB.module.css";
import { MAX_STAR_RATE } from "../../utils/const.jsx"
import useReviewStore from "../../useReviewStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


function StarRatingTMDB() {
  const { dataAPI, title } = useReviewStore();

  let ratingTMDB;

  if (dataAPI.rating) {
    ratingTMDB = dataAPI.rating
  } else {
    for (let i = 0; i < title.length; i++) {
      ratingTMDB = title[i].dataAPI.rating
    }
  }

 


  const titleRate = Math.round(ratingTMDB);

  const goldStarsArray = new Array(titleRate).fill(null);
  const emptyStars = MAX_STAR_RATE - titleRate;
  const emptyStarsArray = new Array(emptyStars).fill(null);

  return (
    <div className={styles.wrapper}>
       <h3 className={styles.header}>Ocena TMDB: </h3>
       <div>
      {goldStarsArray.map(() => (
        <span key={crypto.randomUUID()}>
          <FontAwesomeIcon icon={faStar} size="xl" color="gold" className={styles.singleStar}/>
        </span>
      ))}
      {emptyStarsArray.map(() => (
        <span key={crypto.randomUUID()}>
          <FontAwesomeIcon icon={faStar} size="xl" className={styles.singleStar}/>
        </span>
      ))}
      </div>
    </div>
  );
}

export default StarRatingTMDB;
