import React from "react";
import styles from "./TitlesDisplay.module.css";
import { Link } from "react-router-dom";

import { range } from "../../utils/utils.jsx"
import { SLOTS } from "../../utils/const.jsx"

import useReviewStore from "../../useReviewStore"; // Import the Zustand store

import TitleShot from "../TitleShot/TitleShot";


function TitlesDisplay() {
  const { title } = useReviewStore();

  console.log(title);

  const allTitles = [ ...title];

    //range

    const reversedGenreArray = [...allTitles].reverse();
    const displayedIndex = range(0, SLOTS);
    const displayedShows = displayedIndex.map(index => reversedGenreArray[index]);

  //I'm creating an array that contains only
  //the genres of TV series (from all those added by the user):

  const allGenres = [
    ...new Set(allTitles.map((title) => title.dataAPI.genre_tags).flat()),
  ];

  //I'm creating an array that contains only those TV series
  //that correspond to the selected (listed) genre:

  function specificGenreShowsHandler(genre) {
    const specificGenreShows = allTitles.filter((title) =>
      title.dataAPI.genre_tags.includes(genre)
    );

    return (
      <TitleShot header={genre} genreArray={specificGenreShows} slots={SLOTS}/>
    );
  }

  return (
    <>
      {/* 'Recently added' is hardcoded and not passed to the component as a 
      header, because otherwise the styling breaks 
    (due to the addition of the 'Dodaj serial' button at the end). */}
      <h3>Ostatnio dodane:</h3>
      <div className={styles.recentlyAddedWrapper}>
        <TitleShot header={""} genreArray={displayedShows} slots={SLOTS} />
        <Link to="/addNew">
          <button className={styles.addButton}>+</button>
        </Link>
      </div>
      {allGenres.map((genre, index) => (
        <div key={index}>{specificGenreShowsHandler(genre)}</div>
      ))}
    </>
  );
}

export default TitlesDisplay;
