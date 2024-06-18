import React from "react";
import ShowDetails from "../ShowDetails/ShowDetails";

function DialogSeriesDetails({
  dialogRefs,
  id,
  review,
  closeDialog,
  dataAPI
}) {
  return (
    <dialog id="dialog" ref={(el) => (dialogRefs.current[id] = el)}>
      <p>{review}</p>
      {/* <ShowDetails dataAPI={dataAPI}/> */}
      <button id="close" onClick={() => closeDialog(id)}>
        Zamknij
      </button>
    </dialog>
  );
}

export default DialogSeriesDetails;
