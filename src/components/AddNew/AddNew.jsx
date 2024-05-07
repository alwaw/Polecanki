import React from "react";
import { TitlesContext } from "../../App";
import { Link } from "react-router-dom";

function AddNew() {
  const { title, setTitle } = React.useContext(TitlesContext);
  const [pendingTitle, setPendingTitle] = React.useState("");
  const [dataAPI, setDataAPI] = React.useState({});

  function titleSearching(event) {
    event.preventDefault();

    //everything about downloading data from TMDB:
    function getDataFromAPI(id, title, src) {
      const data = {
        id: id,
        title: title,
        URL_IMAGE: `https://image.tmdb.org/t/p/w500/${src}`,
      };

      const newObject = {
        ...dataAPI,
        ...data,
      };

      setDataAPI(newObject);

      console.log("data url image: " + data.URL_IMAGE);
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

    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${titleURL}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getDataFromAPI(
          response.results[0].id,
          response.results[0].name,
          response.results[0].poster_path
        );
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(event) {
    //tutaj powinno być przekazanie całego obiektu z danymi o serialu do kolejnych komponentów

    event.preventDefault();

    //adding data about series to state => then display it in TitlesDisplay component
    const newTitle = [
      ...title,
      {
        id: crypto.randomUUID(),
        title: dataAPI.title,
        titleImageSrc: dataAPI.URL_IMAGE,
      },
    ];

    setTitle(newTitle);

    // clear the field
    setPendingTitle("");
  }

  return (
    <>
      <form>
        <label htmlFor="series-title">Tytuł serialu:</label>
        <input
          id="series-title"
          value={pendingTitle}
          onChange={(event) => {
            setPendingTitle(event.target.value);
          }}
        />
        <button onClick={titleSearching}>Wyszukaj</button>
        <p>{dataAPI.title}</p>
        <p>{dataAPI.id}</p>
        <img alt="" src={dataAPI.URL_IMAGE} />
        <button onClick={handleSubmit}>Dodaj serial</button>
      </form>
      <Link to="/">Powrót</Link>
    </>
  );
}

export default AddNew;
