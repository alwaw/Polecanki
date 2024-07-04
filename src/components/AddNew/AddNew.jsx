import React from "react";
import useReviewStore from "../../useReviewStore"; // Import the Zustand store

import styles from "./AddNew.module.css";

import { GENRE_ID } from "../../utils/GENRE_ID";

import Navbar from "../Navbar/Navbar";
import ThereIsResult from "../ThereIsResult/ThereIsResult";
import DuplicatedTitle from "../DuplicatedTitle/DuplicatedTitle";
import NoResults from "../NoResults/NoResults";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


function AddNew() {

  const [pendingTitle, setPendingTitle] = React.useState("");


  const {
    title,
    setDataAPI,
    dataAPI,
    reset
  } = useReviewStore();

  const [isFailed, setIsFailed] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = React.useState(false);   // Hasn't the series already been added before?

  

  let arrayOfGenresNames = [];

  function titleSearching(event) {
    event.preventDefault();
    
    //clear all states:
    setIsLoading(false); // there is no result right now
    setIsFailed(false); // Reset failure state
    setIsAlreadyAdded(false); // Reset already added state
    reset(); 
    //^ Zustand reset function: 
    //reset UserStarsRate
    //clear data from DataAPI
    //clear review from user about previous show
    //clear review state to "empty"

    //everything about downloading data from TMDB:
    function getDataFromAPI(id, title, src, overview, rating, genre) {
      //I'm comparing IDs retrieved from the TMDB API
      //with an array containing IDs and names of genres GENRE_ID.
      const genre_ids = genre;
      let arrayOfGenresObj = [];

      for (let i = 0; i < genre_ids.length; i++) {
        let newItem = GENRE_ID.filter((gen) => gen.id == genre_ids[i]);
        arrayOfGenresObj.push(newItem);
      }

      //The array consists of [i] arrays, and within
      //each array is an object - I extract the value 'name' from it.

      for (let i = 0; i < arrayOfGenresObj.length; i++) {
        let newItem = arrayOfGenresObj[i][0].name;
        arrayOfGenresNames.push(newItem); // finally, an array
        //with genre names is being created.
      }

      const data = {
        id: id,
        title: title,
        URL_IMAGE: `https://image.tmdb.org/t/p/w500/${src}`,
        overview: overview,
        rating: rating,
        genre_tags: arrayOfGenresNames,
      };

      const newObject = {
        ...dataAPI,
        ...data,
      };

      setDataAPI(newObject);
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDdlMTRiYzFiNTI0ODMyNzZkMDM1NGI0NmIwMzRmYSIsInN1YiI6IjY2MjgxOGYwYjlhMGJkMDE2MWQ2NjcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7w9Ud4W5kya4ZvnY4rtQqQjzK0Pf-X7kTixfy9Vkqx0",
      },
    };

    const titleURL = encodeURIComponent(pendingTitle);

    //fetch basic data: id, title (name), img src, overwiev,
    //rating and genre ids
    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${titleURL}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          // Processing data when search results exist.
          const firstResult = response.results[0];
          const allTitles = [...title];
          const validation = allTitles.find(
            (title) => firstResult.id === title.id
          );

          if (validation) {
            setIsAlreadyAdded(true);
          } else {
            setIsLoading(true);
            getDataFromAPI(
              firstResult.id,
              firstResult.name,
              firstResult.poster_path,
              firstResult.overview,
              firstResult.vote_average,
              firstResult.genre_ids
            );
            setIsFailed(false);
          }
        } else {
          // Handling the situation when there are no search results.
          setIsFailed(true); //
        }
      })
      .catch((err) => {
        console.error(err);
        setIsFailed(true);
      });
  }

  //I'm passing a reset function to a lower-level component
  //that resets values used only in this component.
  function cleanupFunction() {
    setPendingTitle("");
    setIsLoading(false);
    setIsAlreadyAdded(false);
  }

  function whatShouldIRender_AddNew() {
    if (isFailed) {
      return <NoResults />;
    }

    if (isAlreadyAdded) {
      return <DuplicatedTitle />;
    }

    if (isLoading && !isAlreadyAdded && !isFailed) {
      return (
        <ThereIsResult
          cleanupFunction={cleanupFunction}
        />
      );
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={titleSearching} className={styles.formWrapper}>
        <div className={styles.searchWrapper}>
          <label htmlFor="series-title"></label>

          <input
            className={styles.inputTitle}
            id="series-title"
            value={pendingTitle}
            placeholder="Co ostatnio obejrzałeś?"
            onChange={(event) => {
              setPendingTitle(event.target.value);
            }}
          />

          <IconButton
            aria-label="search"
            type="submit"
            className={styles.searchButton}
            sx={{
              backgroundColor: "white",
              opacity: "0.8",
              borderRadius: "5px",
              height: "50px",
            }}
          >
            <SearchIcon className={styles.searchIcon} />
          </IconButton>
        </div>

        {whatShouldIRender_AddNew()}
      </form>
    </>
  );
}

export default AddNew;
