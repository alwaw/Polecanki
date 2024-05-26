import React from "react";
import styles from "./StarRatingUser.module.css";
import { MAX_STAR_RATE } from "../AddNew/AddNew";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

//przechwycić oceny - z tmdb oraz z oceny usera do obiektu, który będzie przekazywany do TitleDisplay


function StarRatingUser() {
  const [userRate, setUserRate] = React.useState(0);

  const userStarsArray = new Array(MAX_STAR_RATE).fill(null);


    //filling the array with values from 1 to MAX_STAR_RATE
    for (let i = 0; i < userStarsArray.length; i++) {
      userStarsArray[i] = i + 1;
    }




    return (
      <div className={styles.wrapper}>
        <h3 className={styles.header}>Twoja ocena: </h3>
        <div>
        {userStarsArray.map(star => (
          <span key={crypto.randomUUID()} onClick ={()=> {setUserRate(star)}}>
            <FontAwesomeIcon icon={faStar} size="xl" className={styles.singleStar}
              color = {userRate >= star ? "gold" : undefined}
              
            />
          </span>
        ))}
        </div>
        <p>{userRate}</p>
      </div>
    )

     
}

export default StarRatingUser;
