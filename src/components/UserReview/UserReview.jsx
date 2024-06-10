import React from "react";
import styles from "./UserReview.module.css";
import { REVIEWS_PLACEHOLDERS } from "../../utils/REVIEWS_PLACEHOLDER";
import useReviewStore from '../../useReviewStore'; // Import the Zustand store

const randomIndex = Math.floor(Math.random() * REVIEWS_PLACEHOLDERS.length);

function UserReview({ maxChars }) {
  const {
    review,
    reviewState,
    setReview,
    setReviewState,
  } = useReviewStore();

  if (reviewState === "empty" || reviewState === "edited") {
    console.log("reviewState ma być puste lub edytowane " + reviewState);
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
    console.log("review State powinno być added " + reviewState);
    return (
      <ReviewFromUser
        review={review}
        setReviewState={setReviewState}
        reviewState={reviewState}
      />
    );
  }
}

function EditableTextArea({
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
    console.log("user dodał recenzję przyciskiem: " + reviewState);
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

function ReviewFromUser({ review, setReviewState, reviewState }) {
  function editReview() {
    setReviewState("edited");
    console.log("po dodaniu recenzji: " + reviewState);
  }

  return (
    <div className={styles.reviewWrapper}>
      <div>{review}</div>
      <button onClick={() => editReview()} className={styles.button}>
        Edytuj
      </button>
    </div>
  );
}

export default UserReview;
