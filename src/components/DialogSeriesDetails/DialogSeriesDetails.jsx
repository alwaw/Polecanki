import React from "react";
import ShowDetails from "../ShowDetails/ShowDetails";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import { ReviewFromUser } from "../UserReview/UserReview";
import useReviewStore from "../../useReviewStore";

function DialogSeriesDetails({
  dialogRefs,
  id,
  // review,
  closeDialog,
  // dataAPI,
  // rating
}) {

  const {
    review,
    setReview,
    reviewState,
    setReviewState,
    dataAPI,
    userStarRate,
    setUserStarRate, 
    findTvSeriesById
  } = useReviewStore();

  const titleObject = findTvSeriesById(id);
  console.log(titleObject);

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
    return (
      <dialog id="dialog" ref={(el) => (dialogRefs.current[id] = el)}>
      <ShowDetails dataAPI={dataAPI}/>
      <StarRatingTMDB ratingTMDB={dataAPI.rating} />
      <StarRatingUser
          initialValue={titleObject.rating}
          userStarRate={userStarRate}
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
      <dialog id="dialog" ref={(el) => (dialogRefs.current[id] = el)}>
        <ShowDetails dataAPI={dataAPI}/>
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          userStarRate={userStarRate}
          setUserStarRate={setUserStarRate} 
        />
        <button onClick={()=>editDialog(dataAPI.id)}>Działa?</button>
      </dialog>
    )
  }

 
}

export default DialogSeriesDetails;
