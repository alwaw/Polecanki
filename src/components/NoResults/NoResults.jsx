import styles from "./NoResults.module.css";

//fetch has failed :-(

function NoResults() {
  return (
    <div className={styles.wrapper}>
      <h1> Oooops! </h1>
      <h2>Czy na pewno tytuł serialu został poprawnie wpisany?</h2>

      <p>
        Nie udało się nam znaleźć tytułu serialu w bazie TMDB. <br />Upewnij się, czy
        został on wpisany poprawnie.
      </p>
      <p>
        
        Istnieje szansa, że tytuł jest tak niszowy, że nigdy nie został zapisany
        do bazy TMDB. <br />Kliknij poniżej, by przejść na stronę TMDB i dodaj go jako
        pierwszy!
      </p>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        className={styles.button}
      >
        Przejdź na TMDB &#x2934;
      </a>
    </div>
  );
}

export default NoResults;
