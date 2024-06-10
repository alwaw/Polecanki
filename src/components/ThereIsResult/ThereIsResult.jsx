import React from "react";
import { TitlesContext } from "../../App";
import styles from "./ThereIsResult.module.css";

import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import UserReview from "../UserReview/UserReview";

import useReviewStore from "../../useReviewStore"; // Import the Zustand store

//fetch has worked :-)
function ThereIsResult({ dataAPI, userStarRate, setUserStarRate, cleanupFunction }) {
  const { title, setTitle } = React.useContext(TitlesContext);

  const { review, setReview, setReviewState } = useReviewStore();

  //Genre tags:
  //I convert the received object into an array and iterate over it,
  //creating a list of tags. Index in the array serves as the key —
  //I chose this solution because the list of tags will not be editable
  //(tags cannot be manually added—at least in this version, nor can they be removed).
  function handlerGenre() {
    let copyObj = { ...dataAPI.genre_tags };
    const arrayOfGenreTags = Object.values(copyObj);
    return (
      <ul className={styles.genreTagsWrapper}>
        {arrayOfGenreTags.map((genreTag, index) => {
          return (
            <li key={index} className={styles.genreTag}>
              {genreTag}
            </li>
          );
        })}
      </ul>
    );
  }

  //submitting series into TitlesDisplay component
  function handleSubmit(event) {
    event.preventDefault();

    if (userStarRate === 0) {
      return window.alert("Zapomniałeś ocenić!");
    }

    //adding data about series to state => then display it in TitlesDisplay component
    const newTitle = [
      ...title,
      {
        id: crypto.randomUUID(),
        title: dataAPI.title,
        titleImageSrc: dataAPI.URL_IMAGE,
        rating: userStarRate,
        id: dataAPI.id,
        review: review,
      },
    ];

    setTitle(newTitle);

    // clear the fields:
    cleanupFunction(); //Cleanup function from the AddNew component (resetting values existing only in the AddNew component).

    setUserStarRate(0);
    setReview("");
    setReviewState("empty");
    
  }

  return (
    <>
      <section key={dataAPI.id} className={styles.posterAndOverview}>
        <div>
          <img className={styles.poster} alt="" src={dataAPI.URL_IMAGE} />
        </div>
        <div className={styles.title}>
          <div>{dataAPI.title}</div>
        </div>
        <div className={styles.overview}>
          <div>{dataAPI.overview}</div>
        </div>
      </section>
      <section className={styles.genreTags}>{handlerGenre()} </section>
      <div className={styles.ratingWrapper}>
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          userStarRate={userStarRate}
          setUserStarRate={setUserStarRate}
        />
      </div>
      <UserReview maxChars={500} />
      <div className={styles.buttonWrapper}>
        <button className={styles.addButton} onClick={handleSubmit}>
          Dodaj
        </button>
      </div>
    </>
  );
}

export default ThereIsResult;
