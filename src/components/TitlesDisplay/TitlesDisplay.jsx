import React from "react";
import styles from "./TitlesDisplay.module.css";
import useReviewStore from "../../useReviewStore"; // Import the Zustand store


import TitleShot from "../TitleShot/TitleShot";


function TitlesDisplay() {
  const { title } = useReviewStore();

  const allTitles = [...title];

  console.log(allTitles);

  //tworzę tablicę, w której są tylko gatunki seriali:

  const allGenres = [...new Set(allTitles.map(title=>title.dataAPI.genre_tags).flat())];

  console.log(allGenres);

  return (
    <>
    <TitleShot header={"Ostatnio dodane"} genreArray={allTitles} range={5} />
    {allGenres.map((genre, index) => (
      <>
      <div key={index}>{genre}</div>
    
      </>
    ))}
    </>
  );
}

export default TitlesDisplay;
