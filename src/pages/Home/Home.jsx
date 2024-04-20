import React from "react";
import { Link } from "react-router-dom";
import TitlesDisplay from "../../components/TitlesDisplay/TitlesDisplay";


function Home(){
    return (
        <>
     
        <Link to="/addNew">Dodaj</Link>
        <TitlesDisplay />
        </>
    )
}

export default Home;