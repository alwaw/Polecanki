import React from "react";
import ShowDetails from "../ShowDetails/ShowDetails";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import { ReviewFromUser } from "../UserReview/UserReview";

function DialogSeriesDetails({
  dialogRefs,
  id,
  review,
  closeDialog,
  dataAPI,
  rating
}) {

  const [isEdited, setIsEdited] = React.useState(false);
  // isEdited states:
  //false - All data is read-only (including user rating and review).
  //true - The user clicked the Edit button and 
  //has the ability to edit the rating and review.
  
  function editDialog(id) {
    setIsEdited(true);
  }

  if (!isEdited) {
    return (
      <dialog id="dialog" ref={(el) => (dialogRefs.current[id] = el)}>
      <ShowDetails dataAPI={dataAPI}/>
      <StarRatingTMDB ratingTMDB={dataAPI.rating} />
      <StarRatingUser
          userStarRate={rating}
          setUserStarRate={()=>{}} //No-op function to prevent changing rating
        />
      <ReviewFromUser review={review} setReviewState={()=>{}} />
      <button id="edit" onClick={()=> editDialog(id)}>Edytuj</button>
      <button id="close" onClick={() => closeDialog(id)}>
        Zamknij
      </button>
    </dialog>
    )
  } else {
    return (
      console.log("edycja")
    )
  }

 
}

export default DialogSeriesDetails;
