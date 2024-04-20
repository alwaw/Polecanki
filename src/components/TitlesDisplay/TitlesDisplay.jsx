import React from "react";
import { TitlesContext } from "../../App";
import styles from "./TitlesDisplay.module.css"

function TitlesDisplay() {

    const { title, setTitle } = React.useContext(TitlesContext);

    const allTitles = [...title];
    
    return(
        <>
        <h3>Seriale:</h3> 
        <div className={styles.wrapper}> 
        
        {allTitles.map(({id, title})=>(
             (
             
                <div key={id}>{title}</div>
        )
        
        ))}
        </div>
        </>
    )
};

export default TitlesDisplay;
