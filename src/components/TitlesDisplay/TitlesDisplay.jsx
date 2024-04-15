import React from "react";
import { TitlesContext } from "../../App";

function TitlesDisplay() {

    const { title, setTitle } = React.useContext(TitlesContext);

    const allTitles = [...title];
    
    return(
        <>
        <p>Seriale: </p>
        {allTitles.map(({id, title})=>(
             (
             
                <p key={id}>{title}</p>
        )
        ))}
        </>
    )
};

export default TitlesDisplay;
