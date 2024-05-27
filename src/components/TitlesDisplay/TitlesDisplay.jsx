import React from "react";
import { TitlesContext } from "../../App";
import styles from "./TitlesDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function TitlesDisplay() {
  const { title, setTitle } = React.useContext(TitlesContext);

  const allTitles = [...title];

  return (
    <>
      <h3 className={styles.header}>Ostatnio dodane:</h3>
      <div className={styles.wrapper}>
        {allTitles.map(({ id, title, titleImageSrc, rating }) => (
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
            <img className={styles.image} alt="plakat" src={titleImageSrc} />
            <h4 className={styles.TitleFont}>{title}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default TitlesDisplay;
