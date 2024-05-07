import React from "react";
import { TitlesContext } from "../../App";
import styles from "./TitlesDisplay.module.css"

function TitlesDisplay() {

    const { title, setTitle } = React.useContext(TitlesContext);

    const allTitles = [...title];
    
    return(
        <>
        <h3 className={styles.header}>Ostatnio dodane:</h3> 
        <div className={styles.wrapper}> 
        
        {allTitles.map(({id, title, titleImageSrc})=>(
             (
                <div key={id}>
                <img className={styles.image} alt="plakat" src={titleImageSrc} />
                <h4 className={styles.TitleFont}>{title}</h4>
         
                </div>
        )
        
        ))}
        </div>
        </>
    )
};

export default TitlesDisplay;
