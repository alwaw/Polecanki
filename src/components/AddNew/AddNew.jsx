import React from "react";
import { TitlesContext } from "../../App";
import { Link } from "react-router-dom";
import { GENRE_ID } from "../../utils/GENRE_ID";

import Navbar from "../Navbar/Navbar";
import styles from "./AddNew.module.css";
import StarRatingTMDB from "../StarRatingTMDB/StarRatingTMDB";
import StarRatingUser from "../StarRatingUser/StarRatingUser";
import UserReview from "../UserReview/UserReview"

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


export const MAX_STAR_RATE = 10;

function AddNew() {
  const { title, setTitle } = React.useContext(TitlesContext);
  const [pendingTitle, setPendingTitle] = React.useState("");
  const [dataAPI, setDataAPI] = React.useState({});
  const [userStarRate, setUserStarRate] = React.useState(0); // getting star rating from children component
  const [review, setReview] = React.useState(""); //getting user review from user

  const [isFailed, setIsFailed] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = React.useState(false); // Hasn't the series already been added before?


  let arrayOfGenresNames = [];

  function titleSearching(event) {
    event.preventDefault();

    setIsFailed(false); // Reset failure state
    setIsAlreadyAdded(false); // Reset already added state
    setDataAPI({}); // Clear previous data

    //everything about downloading data from TMDB:
    function getDataFromAPI(id, title, src, overview, rating, genre) {
      //I'm comparing IDs retrieved from the TMDB API with an array containing IDs and names of genres GENRE_ID.
      const genre_ids = genre;
      let arrayOfGenresObj = [];

      for (let i = 0; i < genre_ids.length; i++) {
        let newItem = GENRE_ID.filter((gen) => gen.id == genre_ids[i]);
        arrayOfGenresObj.push(newItem);
      }

      //The array consists of [i] arrays, and within each array is an object - I extract the value 'name' from it.

      for (let i = 0; i < arrayOfGenresObj.length; i++) {
        let newItem = arrayOfGenresObj[i][0].name;
        arrayOfGenresNames.push(newItem); // finally, an array with genre names is being created.
      }

      // console.log(arrayOfGenresNames);

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

    //fetch basic data: id, title (name), img src, overwiev, rating and genre ids
    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${titleURL}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          const firstResult = response.results[0];

          //checking if duplicated
          const allTitles = [...title];
          const validation = allTitles.find(
            (title) => firstResult.id === title.id
          );

          if (validation) {
            setIsAlreadyAdded(true);
          } else {
            setIsLoading(true);
            getDataFromAPI(
              response.results[0].id,
              response.results[0].name,
              response.results[0].poster_path,
              response.results[0].overview,
              response.results[0].vote_average,
              response.results[0].genre_ids
            );
            setIsFailed(false);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setIsFailed(true);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userStarRate === 0) {
      return window.alert("Zapomniałeś ocenić!");
    }

    //adding data about series to state => then display it in TitlesDisplay component
    const newTitle = [
      ...title,
      {
        id: crypto.randomUUID(),
        title: dataAPI.title,
        titleImageSrc: dataAPI.URL_IMAGE,
        rating: userStarRate,
        id: dataAPI.id, 
        review: review,
      },
    ];

    setTitle(newTitle);

    // clear the fields
    setPendingTitle("");
    setUserStarRate(0);
    setIsLoading(false);
    setIsAlreadyAdded(false);
  }

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

  //fetch has failed :-(
  function NoResults() {
    return (
      <div key={dataAPI.id}>
        <h2 className={styles.NoResults_header}>Ooops!</h2>
        <p className={styles.NoResults_paragraph}>
          Wygląda na to, że nie udało się odnaleźć podanego tytułu serialu.
          Sprawdź, czy został on zapisany poprawnie i spróbuj jeszcze raz!{" "}
        </p>
      </div>
    );
  }

  //fetch has worked :-)
  function ThereIsResult() {
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
      <div className={styles.ratingWrapper}>
        <StarRatingTMDB ratingTMDB={dataAPI.rating} />
        <StarRatingUser
          userStarRate={userStarRate}
          setUserStarRate={setUserStarRate}
        />
        </div>
        <UserReview maxChars={500} review={review} setReview={setReview}/>
        <div className={styles.buttonWrapper}>
          <button className={styles.addButton} onClick={handleSubmit}>
            Dodaj 
          </button>
        </div>
      </>
    );
  }

  //fetch has worked :-) but title is duplicated :-(
  function DuplicatedTitle() {
    return (
      <div>
        {" "}
        Wygląda na to, że ten serial został już przez Ciebie dodany. Możesz
        zmienić jego ocenę lub dodać opinię edytując go w ekranie głównym.
      </div>
    );
  }

  function whatShouldIRender() {
    if (isLoading && isFailed) {
      return <NoResults />;
    }

    if (isAlreadyAdded) {
      return <DuplicatedTitle />;
    }

    if (isLoading && !isAlreadyAdded) {
      return <ThereIsResult />;
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
            // onClick={titleSearching}
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

        {whatShouldIRender()}
      </form>
    </>
  );
}

export default AddNew;
