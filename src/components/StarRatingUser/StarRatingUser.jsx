import React from "react";
import styles from "./StarRatingUser.module.css";
import { MAX_STAR_RATE } from "../AddNew/AddNew";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


function StarRatingUser({ userStarRate, setUserStarRate }) {


  const userStarsArray = new Array(MAX_STAR_RATE).fill(null);

    //filling the array with values from 1 to MAX_STAR_RATE
    for (let i = 0; i < userStarsArray.length; i++) {
      userStarsArray[i] = i + 1;
    }

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Twoja ocena: </h3>
        <div>
        {userStarsArray.map((star, index) => (
          <span key={index} onClick ={()=>{
            setUserStarRate(star);

          }}>
            <FontAwesomeIcon icon={faStar} size="xl" className={styles.singleStar}
              color = {userStarRate >= star ? "gold" : undefined}
              
            />
          </span>
        ))}
        </div>
        <p>{userStarRate}</p>
      </div>
    )

     
}

export default StarRatingUser;