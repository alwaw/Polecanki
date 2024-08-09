import React from "react";
import styles from "./UserReview.module.css";
import { REVIEWS_PLACEHOLDERS } from "../../utils/REVIEWS_PLACEHOLDER";
import useReviewStore from '../../useReviewStore'; // Import the Zustand store

const randomIndex = Math.floor(Math.random() * REVIEWS_PLACEHOLDERS.length);

function UserReview({ maxChars, enabledButton }) {

  const {
    review,
    reviewState,
    setReview,
    setReviewState,
  } = useReviewStore();

  
  //review state:
  // empty - there is no review, user hasn't started writing yet - empty textarea (default state)
  // added - user has added review - there is no textarea, only <p> and button "edit"
  // edited - user has clicked "edit" button - <p> changes into textarea again


  if (reviewState === "empty" || reviewState === "edited") {
    return (
      <EditableTextArea
        maxChars={maxChars}
        setReview={setReview}
        setReviewState={setReviewState}
        review={review}
        reviewState={reviewState}
       
      />
    );
  }

  if (reviewState === "added") {
    return (
      <ReviewFromUser
        review={review}
        setReviewState={setReviewState}
        reviewState={reviewState}
        enabledButton={enabledButton}
      />
    );
  }
}

export function EditableTextArea({
  maxChars,
  setReview,
  review,
  setReviewState,
  reviewState,
  
}) {
  const charsRemaining = maxChars - review.length;

  // user has added a review:
  const addReview = (event) => {
    event.preventDefault();
    setReviewState("added");
  };

  return (
    <>
      <div className={styles.header}>
        <label htmlFor="review-field">
          <h3>Co sądzisz o tym serialu?</h3>
        </label>
        <span>
          {charsRemaining}/{maxChars}
        </span>
      </div>
      <textarea
        id="review-field"
        data-testid="textarea"
        value={review}
        className={styles.textarea}
        maxLength={maxChars}
        placeholder={REVIEWS_PLACEHOLDERS[randomIndex]}
        onChange={(event) => setReview(event.target.value)}
      />
      <div className={styles.buttonWrapper}>
       
        <button
          className={styles.button}
          onClick={(event) => {
            addReview(event);
          }}
        >
          Dodaj opinię
        </button>
        
        

      </div>
    </>
  );
}

export function ReviewFromUser({ review, setReviewState, enabledButton }) {
  function editReview() {
    setReviewState("edited");
  }

  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.review}>{review}</div>
      {enabledButton && (
      <button onClick={() => editReview()} className={styles.editButton}>
        Edytuj
      </button>
)}
    </div>
  );
}

export default UserReview;
