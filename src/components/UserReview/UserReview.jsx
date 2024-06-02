import React from "react";
import styles from "./UserReview.module.css";
import { REVIEWS_PLACEHOLDERS } from "../../utils/REVIEWS_PLACEHOLDER";

function UserReview({ maxChars, review,setReview }) {
  

  const randomIndex = Math.floor(Math.random() * REVIEWS_PLACEHOLDERS.length);

  const charsRemaining = maxChars - review.length;
    return (
  <>
    <div className={styles.header}>
    <label htmlFor="review-field"><h3>Co sądzisz o tym serialu?</h3></label>
    <span>{charsRemaining}/{maxChars}</span>
    </div>
    <textarea
      id="review-field"
      value={review}
      className={styles.textarea}
      maxLength={maxChars}
      placeholder={REVIEWS_PLACEHOLDERS[randomIndex]}
      onChange={(event) => setReview(event.target.value)}
    />
  </>
    );
}

export default UserReview;
