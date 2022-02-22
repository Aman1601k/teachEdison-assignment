import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

const Navbar = ({ movie, setMovie, setString, setData, favorites, remove }) => {
  const fetchData = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movie}&apikey=df2af48f`
    );
    const data = await response.json();
    if (data.Response == "True") {
      setData(data.Search);
    } else {
      setData([]);
      setString(data.Error);
    }
  };

  const sendData = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
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
        <button onClick={() => sendData()} className={styles.favorites}>
          <Link href="/favorite">
            <a className={styles.favText}>Favorites</a>
          </Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
