import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import TitlesDisplay from "../TitlesDisplay/TitlesDisplay";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";

function Layout() {
  return (
    <>
    <Navbar />
      <main>
        <Outlet />
      </main>
      </>
  );
}

export default Layout;
