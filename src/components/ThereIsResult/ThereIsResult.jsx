import React from "react";
import { TitlesContext } from "../../App";
import styles from "./ThereIsResult.module.css";

import ShowDetails from "../ShowDetails/ShowDetails";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import UserReview from "../UserReview/UserReview";

import useReviewStore from "../../useReviewStore"; // Import the Zustand store

//fetch has worked :-)
function ThereIsResult({
  dataAPI,
  userStarRate,
  setUserStarRate,
  cleanupFunction,
}) {
  const { title, setTitle } = React.useContext(TitlesContext);

  const { review, setReview, reviewState, setReviewState } = useReviewStore();

  //submitting series into TitlesDisplay component
  function handleSubmit(event) {
    event.preventDefault();

    //adding data about series to state => then display it in TitlesDisplay component
    const newTitle = [
      ...title,
      {
        dataAPI: {dataAPI},
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

  function userTip() {
    if (!userStarRate || reviewState === "empty" || reviewState === "edited") {
      return (
        <span className={styles.tipSpan}>
          Wystaw gwiazdki oraz krótko opisz swoje wrażenia po obejrzeniu tego
          serialu - wtedy możliwe będzie dodanie tego tytułu do Twojej galerii
          seriali.
        </span>
      );
    }
  }

  return (
    <>
      <ShowDetails dataAPI={dataAPI} />
      <div className={styles.ratingWrapper}>
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          userStarRate={userStarRate}
          setUserStarRate={setUserStarRate}
        />
      </div>
      <UserReview maxChars={500} />
      <div className={styles.buttonWrapper}>
        <button
          className={styles.addButton}
          onClick={handleSubmit}
          disabled={
            !userStarRate || reviewState === "empty" || reviewState === "edited"
          }
        >
          Dodaj
        </button>
        {userTip()}
      </div>
    </>
  );
}

export default ThereIsResult;
