import React from "react";
import { TitlesContext } from "../../App";
import { Link, useSearchParams } from "react-router-dom";


function AddNew() {
  const { title, setTitle } = React.useContext(TitlesContext);
  const [pendingTitle, setPendingTitle] = React.useState("");
  const [dataAPI, setDataAPI] = React.useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newTitle = [
      ...title,
      { id: crypto.randomUUID(), title: pendingTitle },
    ];

    setTitle(newTitle);

  
    // getting data from API
    function getDataFromAPI(id, title, src){
      const data = {
        id: id,
        title: title,
        src: src
      }
      
      setDataAPI(data);
    }

    // fetch 
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDdlMTRiYzFiNTI0ODMyNzZkMDM1NGI0NmIwMzRmYSIsInN1YiI6IjY2MjgxOGYwYjlhMGJkMDE2MWQ2NjcyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7w9Ud4W5kya4ZvnY4rtQqQjzK0Pf-X7kTixfy9Vkqx0'
      }
    };

    const titleURL = encodeURIComponent(pendingTitle);
    console.log("zakodowany " + titleURL);
    
    fetch(`https://api.themoviedb.org/3/search/tv?query=${titleURL}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        getDataFromAPI(
          response.results[0].id, 
          response.results[0].name,
          response.results[0].poster_path
        )
        })
      .catch(err => console.error(err));

    


   
 

    setPendingTitle("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="series-title">Tytuł serialu:</label>
        <input
          id="series-title"
          value={pendingTitle}
          onChange={(event) => {
            setPendingTitle(event.target.value);
          }}
        />
        <button>Dodaj</button>
        <p>{dataAPI.title}</p>
        <p>{dataAPI.id}</p>
        <img alt="plakat"
        src={`https://image.tmdb.org/t/p/w500/${dataAPI.src}`}/>
  
       
      </form>
      <Link to="/">Powrót</Link>
    </>
  );
}

export default AddNew;
