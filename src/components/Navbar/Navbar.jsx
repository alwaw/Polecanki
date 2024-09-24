import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png";

function Navbar() {
    return (
        
          <header className={styles.header}>
            <NavLink to="/">
          <img
            data-testid={"imgLogo"}
            className={styles.img}
            alt="polecanki logo"
            src={logo}
            />
            </NavLink>
    
            <nav className={styles.navbar}> 
              <NavLink className={styles.navLink} to="/">Home </NavLink>
              <NavLink className={styles.navLink} to="/about">O projekcie </NavLink>
            </nav>
          </header>
)}

export default Navbar;