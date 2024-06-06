import React from "react";
import styles from "./UserReview.module.css";
import { REVIEWS_PLACEHOLDERS } from "../../utils/REVIEWS_PLACEHOLDER";

const randomIndex = Math.floor(Math.random() * REVIEWS_PLACEHOLDERS.length);

function UserReview({ maxChars, review, setReview }) {
  const [pendingReview, setPendingReview] = React.useState(review);
  const [reviewState, setReviewState] = React.useState("empty");
  // empty - there is no review, user hasn't started writing yet - empty textarea
  // added - user has added review - there is no textarea, only <p> and button "edit"
  // edited - user has clicked "edit" button - <p> changes into textarea again

 
    if (reviewState === "empty" || reviewState === "edited") {
      return (
        <EditableTextArea
          maxChars={maxChars}
          setReview={setReview}
          setReviewState={setReviewState}
          review={review}
          pendingReview={pendingReview}
          setPendingReview={setPendingReview}
          reviewState={reviewState}
        />
      );
    }

    if (reviewState === "added") {
      return <ReviewFromUser pendingReview={pendingReview} />;
    }
  

  
}

function EditableTextArea({
  maxChars,
  setReview,
  review,
  pendingReview,
  setPendingReview,
  setReviewState,
  reviewState,
}) {
  const charsRemaining = maxChars - pendingReview.length;

  // user has added a review:
  const addReview = (event) => {
    event.preventDefault();
    
    setReviewState("added");
    setReview(pendingReview);
    console.log(pendingReview);
    console.log(reviewState);
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
        value={pendingReview}
        className={styles.textarea}
        maxLength={maxChars}
        placeholder={REVIEWS_PLACEHOLDERS[randomIndex]}
        onChange={(event) => setPendingReview(event.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <button
          className={styles.buttonAdd}
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

function ReviewFromUser({ pendingReview }) {
  return <div>{pendingReview}</div>;
}

export default UserReview;
