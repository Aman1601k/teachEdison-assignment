import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ContentSection from "../components/ContentSection";

export default function Favorite() {
  const [favData, setFavData] = React.useState([]);

  //useffect for retrieved the data from localstorage.
  useEffect(() => {
    var retrievedData = localStorage.getItem("favorites");
    const favoritesArr = JSON.parse(retrievedData);
    //take array an call for every id present in array
    for (let i = 0; i < favoritesArr.length; i++) {
      fetchData(favoritesArr[i]);
    }
  }, []);

  //function for call with the id and set to array
  const fetchData = async (id) => {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`
    );
    const data = await response.json();
    setFavData((array) => [...array, data]);
  };

  return (
    <div className={styles.container}>
      <Navbar remove="partial" />
      <div className={styles.listBody}>
        {favData?.length > 0 ? (
          favData?.map((item) => {
            return <ContentSection item={item} key={item?.imdbID} fav={false}/>;
          })
        ) : (
          <>
            <h1 className={styles.emptyResult}>No Content is added.</h1>
            <Link href="/">
              <a className={styles.favText}>Click to Add</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
