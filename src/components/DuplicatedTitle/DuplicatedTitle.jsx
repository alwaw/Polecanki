import styles from "./DuplicatedTitle.module.css";
import React from "react";
import { Link } from "react-router-dom";

//fetch has worked :-) but title is duplicated :-(

function DuplicatedTitle() {
  return (
    <div className={styles.wrapper}>
      <h1> Oooops! </h1>
      <h2>Ten serial już został przez Ciebie dodany!</h2>
      <p>Masz nowe przemyślenia ne jego temat? </p>
      <p>
        Jeśli chcesz zmienić ocenę lub edytować recenzję, wróć na stronę główną
        i edytuj ten tytuł. Kiedyś dopiszę, jak to zrobić, obiecuję.
      </p>

      <Link to="/">
        <button className={styles.button}>Wróć na stronę główną</button>{" "}
      </Link>
    </div>
  );
}

export default DuplicatedTitle;
