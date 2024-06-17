import React from "react";
import { useRef } from "react";
import { TitlesContext } from "../../App";
import styles from "./TitlesDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import useReviewStore from "../../useReviewStore"; // Import the Zustand store

function TitlesDisplay() {
  const { title } = React.useContext(TitlesContext);
  const { review } = useReviewStore();

  const allTitles = [...title];

  const dialogRef = useRef(null);

  const openDialog = () => {
      dialogRef.current.showModal();
  };

  const closeDialog = () => {
      dialogRef.current.close();
  };

  return (
    <>
      <h3 className={styles.header}>Ostatnio dodane:</h3>
      <div className={styles.wrapper}>
        {allTitles.map(({ id, title, titleImageSrc, rating, review }) => (
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
            <button id="open" onClick={openDialog}>
              <img className={styles.image} alt="plakat" src={titleImageSrc} />{" "}
            </button>
            <h4 className={styles.TitleFont}>{title}</h4>
            <div>{review}</div>
            <dialog id="dialog" ref={dialogRef}>
              <p>Działa?</p>
              <button id="close" onClick={closeDialog}>Zamknij</button>
            </dialog>
          </div>
        ))}
      </div>
    </>
  );
}

export default TitlesDisplay;
