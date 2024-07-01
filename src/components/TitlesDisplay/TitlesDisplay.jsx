import React from "react";
import styles from "./TitlesDisplay.module.css";
import useReviewStore from "../../useReviewStore"; // Import the Zustand store


import TitleShot from "../TitleShot/TitleShot";


function TitlesDisplay() {
  const { title } = useReviewStore();

  const allTitles = [...title];



  //tworzę tablicę, w której są tylko gatunki seriali:

  const allGenres = [...new Set(allTitles.map(title=>title.dataAPI.genre_tags).flat())];

  //tworzę tablicę, w której są tylko te seriale, które
  //odpowiadają wybranemu gatunkowi:

  function specificGenreShowsHandler(genre) {
    const specificGenreShows = allTitles.filter(title => title.dataAPI.genre_tags.includes(genre))

    return (
      <TitleShot header={genre} genreArray={specificGenreShows} range={5}/>
    )
  }
  
  

  return (
    <>
    <TitleShot header={"Ostatnio dodane"} genreArray={allTitles} range={5} />
    {allGenres.map((genre, index) => (
    
      <div key={index}>
      {specificGenreShowsHandler(genre)}
      </div>
      
    ))}
    </>
  );
}

export default TitlesDisplay;
