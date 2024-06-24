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

//zrobić stan, w którym będą przechwytywane oceny użytkownika oraz
//opinie, następnie w momencie zakończenia edycji dodadzą one
//dane modyfikując obiekt
//KONIECZNIE: NIE DZIAŁA DODAWANIE RECENZJI W TRYBIE EDYCJI

function DialogSeriesDetails({ dialogRefs, id, closeDialog }) {
  const {
    title,
    review,
    userStarRate,
    setUserStarRate,
    findTvSeriesById,
    setReview,
    setReviewState,
  } = useReviewStore();


  // const [temporaryRate, setTemporaryRate] = React.useState(titleObject.userStarRate);
  //User rating added in the edit window

  // const [temporaryReview, setTemporaryReview] = React.useState(titleObject.review);
  //Review from user added in the edit window


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
    const newTitle = {
      rating: userStarRate,
      review: review,
    };

    setTitle([...titleObject.title, newTitle]);
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
        />
        {/* <UserReview maxChars={MAX_CHARS} enabledButton={true} /> */}
        <ReviewFromUser review={titleObject.review} setReviewState={() => {}} enabledButton={false}/>
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
          initialValue={titleObject.rating}
        />
        {/* <EditableTextArea
          maxChars={MAX_CHARS}
          setReview={setReview}
          review={review}
          setReviewState={setReviewState}
        /> */}
        <UserReview maxChars={MAX_CHARS} enabledButton={true} /> 
        <button onClick={() => saveDialogHandler(dataAPI.id)}>
          Zapisz zmiany
        </button>
      </dialog>
    );
  }
}

export default DialogSeriesDetails;
