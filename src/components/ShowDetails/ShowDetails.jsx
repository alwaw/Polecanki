import React from "react";
import styles from "./ShowDetails.module.css";
import useReviewStore from "../../useReviewStore"; // Import the Zustand store

function ShowDetails() {
  const { dataAPI, title, findTvSeriesById } = useReviewStore();

  //Genre tags:
  //I convert the received object into an array and iterate over it,
  //creating a list of tags. Index in the array serves as the key —
  //I chose this solution because the list of tags will not be editable
  //(tags cannot be manually added—at least in this version, nor can they be removed).
  
  function handlerGenre() {

    let copyObj = { ...dataAPI.genre_tags };
    const arrayOfGenreTags = Object.values(copyObj);
    return (
      <ul className={styles.genreTagsWrapper}>
        {arrayOfGenreTags.map((genreTag, index) => {
          return (
            <li key={index} className={styles.genreTag}>
              {genreTag}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <section key={dataAPI.id} className={styles.posterAndOverview}>
        <div>
          <img className={styles.poster} alt="" src={dataAPI.URL_IMAGE} />
        </div>
        <div className={styles.title}>
          <div>{dataAPI.title}</div>
        </div>
        <div className={styles.overview}>
          <div>{dataAPI.overview}</div>
        </div>
      </section>
      <section className={styles.genreTags}>{handlerGenre()} </section>
    </>
  );
}

export default ShowDetails;
