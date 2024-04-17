import React from 'react';
import { Link, NavLink, Outlet } from "react-router-dom";
import AddNew from "../AddNew/AddNew";
import TitlesDisplay from "../TitlesDisplay/TitlesDisplay";

function Layout(){
    return (
        <>
        
            <header>
                Polecanki
            </header>
            <NavLink to="/">Tu będzie navbar</NavLink>
        
        <main>
            <Link to="/addNew">Dodaj</Link>
            <TitlesDisplay/>
        </main>
        </>
    )
};

export default Layout;