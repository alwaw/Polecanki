import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    return (
        
          <header className={styles.header}>
            <NavLink to="/">
            <img
              className={styles.img}
              alt="polecanki logo"
              src="src\assets\polecanki.png"
            />
            </NavLink>
    
            <nav className={styles.navbar}> 
              <NavLink className={styles.navLink} to="/">Home </NavLink>
              <NavLink className={styles.navLink} to="about">O projekcie </NavLink>
            </nav>
          </header>
)}

export default Navbar;