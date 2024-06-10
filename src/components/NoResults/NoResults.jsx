import styles from "./NoResults.module.css"

//fetch has failed :-(

    function NoResults() {
        return (
          <div>
            <h2 className={styles.NoResults_header}>Ooops!</h2>
            <p className={styles.NoResults_paragraph}>
              Wygląda na to, że nie udało się odnaleźć podanego tytułu serialu.
              Sprawdź, czy został on zapisany poprawnie i spróbuj jeszcze raz!{" "}
            </p>
          </div>
        );
      }


      export default NoResults;