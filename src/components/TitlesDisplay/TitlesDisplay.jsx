import React from "react";
import styles from "./TitlesDisplay.module.css";
import useReviewStore from "../../useReviewStore"; // Import the Zustand store

import { useRef } from "react";

import DialogSeriesDetails from "../DialogSeriesDetails/DialogSeriesDetails";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function TitlesDisplay() {
  const { title, findTvSeriesById } = useReviewStore();


  const dialogRefs = useRef({});

  const allTitles = [...title];


  // modal: Each TV show's title has its own separate render,
  // which I differentiate by the show's ID.
  

  const openDialog = (id) => {


    dialogRefs.current[id].showModal();


  };

  const closeDialog = (id) => {
    dialogRefs.current[id].close();

  };

  return (
    <>
      <h3 className={styles.header}>Ostatnio dodane:</h3>
      <div className={styles.wrapper}>
        {allTitles.map(({ dataAPI, id, title, titleImageSrc, rating, review }) => (
          <div key={id}>
            <div className={styles.ratingBadgeWrapper}>
              <FontAwesomeIcon
                icon={faStar}
                size="sm"
                style={{ color: "#FFD43B" }}
                className={styles.ratingBadgeStar}
              />
              <span className={styles.ratingBadgeNumber}>{rating}</span>
            </div>
            <button id="open" onClick={() => openDialog(id)}>
              <img className={styles.image} alt="plakat" src={titleImageSrc} />{" "}
            </button>
            <h4 className={styles.TitleFont}>{title}</h4>
            <DialogSeriesDetails
              dialogRefs={dialogRefs}
              id={id}
              closeDialog={closeDialog}
         
        
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TitlesDisplay;
