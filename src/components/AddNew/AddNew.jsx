import React from "react";
import { TitlesContext } from "../../App";
import { Link } from "react-router-dom";


function AddNew() {
  const { title, setTitle } = React.useContext(TitlesContext);
  const [pendingTitle, setPendingTitle] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newTitle = [...title, { id: crypto.randomUUID(), title: pendingTitle }];

    setTitle(newTitle);

    console.log(title);
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
    </form>
    <Link to="/">Powrót</Link>
    </>
  );
}

export default AddNew;
