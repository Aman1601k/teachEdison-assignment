import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

import Button from '@mui/material/Button';

const Navbar = ({ movie, setMovie, setString, setData, remove }) => {

  //Fetch Data according to search
  const fetchData = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movie}&apikey=${process.env.API_KEY}`
    );
    const data = await response.json();

    //check if response is true then proceed else show error
    if (data.Response == "True") {
      setData(data.Search);
    } else {
      setData([]);
      setString(data.Error);
    }
  };

  return (
    //Navbar styling and functions call
    <div className={styles.navbar}>
      <h1 className={styles.logo}>IMDB</h1>
      {remove == "none" && (
        <div className={styles.searchDiv}>
          <input
            onChange={(e) => setMovie(e.target.value)}
            value={movie}
            className={styles.searchMov}
            placeholder="Search anything...."
          />
          <button onClick={() => fetchData()} className={styles.searchButton}>
            Search
          </button>
        </div>
      )}
      {(remove == "none" || remove == "partial") && (
        <Button className={styles.favorites}>
          <Link href="/favorite">
            <a className={styles.favText}>Favorites</a>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
