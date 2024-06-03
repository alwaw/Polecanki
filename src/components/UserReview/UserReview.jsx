import React from "react";
import { useMemo } from "react";
import styles from "./UserReview.module.css";
import { REVIEWS_PLACEHOLDERS } from "../../utils/REVIEWS_PLACEHOLDER";


const randomIndex = Math.floor(Math.random() * REVIEWS_PLACEHOLDERS.length);



function UserReview({ maxChars, review,setReview }) {
  const [pendingReview, setPendingReview] = React.useState(review);
  const [isDisabled, setIsDisabled] = React.useState(false); // disabled textarea
  
  const handleReview = (event) => {
    event.preventDefault();
    setReview(pendingReview);
    setIsDisabled(true);
  }

  const charsRemaining = maxChars - review.length;


    return (
  <>
    <div className={styles.header}>
    <label htmlFor="review-field"><h3>Co sądzisz o tym serialu?</h3></label>
    <span>{charsRemaining}/{maxChars}</span>
    </div>
    <textarea
      id="review-field"
      value={pendingReview}
      className={styles.textarea}
      maxLength={maxChars}
      placeholder={REVIEWS_PLACEHOLDERS[randomIndex]}
      onChange={(event) => setPendingReview(event.target.value)}
      disabled={isDisabled}
    />
    <button className={styles.button} onClick={handleReview}>Dodaj opinię</button>
  </>
    );
}

export default UserReview;
