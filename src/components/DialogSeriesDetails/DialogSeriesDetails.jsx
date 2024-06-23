import React from "react";

import styles from "./DialogSeriesDetails.module.css";

import ShowDetails from "../ShowDetails/ShowDetails";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import { ReviewFromUser } from "../UserReview/UserReview";
import { EditableTextArea } from "../UserReview/UserReview"
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
    dataAPI,
    userStarRate,
    setUserStarRate,
    findTvSeriesById,
    setReview,
    setReviewState
  } = useReviewStore();

  const titleObject = findTvSeriesById(id);

  const [temporaryRate, setTemporaryRate] = React.useState(userStarRate);
  //User rating added in the edit window

  const [temporaryReview, setTemporaryReview] = React.useState("");
  //Review from user added in the edit window

  
  console.log(titleObject);

  console.log(review);

  const [isEdited, setIsEdited] = React.useState(false);
  // isEdited states:
  //false - All data is read-only (including user rating and review).
  //true - The user clicked the Edit button and
  //has the ability to edit the rating and review.

  function editDialog(id) {
    setIsEdited(true);

    function addNewData() {
      const isWorking = findTvSeriesById(id);
      console.log(isWorking);
    }

    addNewData();
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
        <ShowDetails dataAPI={dataAPI} />
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          initialValue={titleObject.rating}
          userStarRate={userStarRate}
          setUserStarRate={() => {}} //No-op function to prevent changing rating
        />
        <ReviewFromUser review={titleObject.review} setReviewState={() => {}} enabledButton={false}/>
          <div className={styles.EditButtonWrapper}>
        <button
          id="edit"
          onClick={() => editDialog(id)}
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
      <dialog id="dialog" className={styles.dialogWindow} ref={(el) => (dialogRefs.current[id] = el)}>
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
        <ShowDetails dataAPI={dataAPI} />
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          userStarRate={userStarRate}
          setUserStarRate={setTemporaryRate}
        />
        <EditableTextArea 
       maxChars={MAX_CHARS}
       setReview={setReview}
       review={titleObject.review}
       setReviewState={setReviewState}
        onChange={(event)=>setTemporaryReview(event.target.value)}
        />
        <button onClick={() => editDialog(dataAPI.id)}>Działa?</button>
      </dialog>
    );
  }
}

export default DialogSeriesDetails;
