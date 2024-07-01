import React from "react";

import styles from "./DialogSeriesDetails.module.css";

import ShowDetails from "../ShowDetails/ShowDetails";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import UserReview from "../UserReview/UserReview";
import { ReviewFromUser } from "../UserReview/UserReview";
import { EditableTextArea } from "../UserReview/UserReview";
import useReviewStore from "../../useReviewStore";

import { MAX_CHARS } from "../../utils/const";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

//todo - nie działa poprawnie ocenianie usera
//po zmianie oceny serialu X, przy zmianie oceny seiralu Y
//pojawia się ocena serialu X

function DialogSeriesDetails({ dialogRefs, id, closeDialog }) {
  const {
    title,
    setTitle,
    review,
    userStarRate,
    setUserStarRate,
    findTvSeriesById,
    setReview,
    setReviewState,
    editTVSeries
  } = useReviewStore();

  const [isEdited, setIsEdited] = React.useState(false);
  // isEdited states:
  //false - All data is read-only (including user rating and review).
  //true - The user clicked the Edit button and
  //has the ability to edit the rating and review.

  const titleObject = findTvSeriesById(id);

  function editDialogHandler(id) {
    setIsEdited(true);
    setReviewState("edited");
    setReview(titleObject.review);
  }

  function saveDialogHandler(id) {
    setIsEdited(false);
    // setReviewState("added");
    setReview(review);
    setUserStarRate(userStarRate);

    //adding data about series to state => then display it in TitlesDisplay component

    const newTitleObject = {
      ...titleObject,
      review: review,
      rating: userStarRate,
    }

    editTVSeries(newTitleObject);
    

    closeDialog(id);
  }

  if (!isEdited) {
    //read-only view
    return (
      <dialog
        id="dialog"
        className={styles.dialogWindow}
        ref={(el) => (dialogRefs.current[id] = el)}
      >
        <div className={styles.closeButtonWrapper}>
          <IconButton
            onClick={() => closeDialog(id)}
            id="close"
            className={styles.closeButton}
            sx={{
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ShowDetails dataAPI={titleObject.dataAPI} />
        <StarRatingTMDB ratingTMDB={titleObject.rating} />
        <StarRatingUser
          initialValue={titleObject.rating}
          userStarRate={userStarRate}
          setUserStarRate={() => {}} //No-op function to prevent changing rating
          edit={false} //rate is uneditable
        />
        <ReviewFromUser
          review={titleObject.review}
          setReviewState={() => {}}
          enabledButton={false}
        />
        <div className={styles.EditButtonWrapper}>
          <button
            id="edit"
            onClick={() => editDialogHandler(id)}
            className={styles.editButton}
          >
            Edytuj
          </button>
        </div>
      </dialog>
    );
  } else {
    return (
      //user is editing
      <dialog
        id="dialog"
        className={styles.dialogWindow}
        ref={(el) => (dialogRefs.current[id] = el)}
      >
        <div className={styles.closeButtonWrapper}>
          <IconButton
            onClick={() => closeDialog(id)}
            id="close"
            className={styles.closeButton}
            sx={{
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <ShowDetails dataAPI={titleObject.dataAPI} />
        <StarRatingTMDB ratingTMDB={titleObject.dataAPI.rating} />
        <StarRatingUser
          initialValue={userStarRate}
          userStarRate={userStarRate}
          edit={true} //rate is editable
        />
        <UserReview maxChars={MAX_CHARS} enabledButton={true} />
        <div className={styles.saveButtonWrapper}>
        <button className={styles.saveButton} onClick={() => saveDialogHandler(titleObject.id)}>
          Zapisz zmiany
        </button>
        </div>
      </dialog>
    );
  }
}

export default DialogSeriesDetails;
