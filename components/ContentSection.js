import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import BasicModal from './Modal'
import Button from '@mui/material/Button';

const ContentSection = ({ item, fav, additionalDetails }) => {
  const router = useRouter();
  const [favoritesArray, setFavoritesArray] = useState([]);
  const[open, setOpen] = useState(false);
  
  //useffect for get data initially and assign to array
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("favorites"))){
      setFavoritesArray(JSON.parse(localStorage.getItem("favorites")));
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  //function for adding data to fav
  const handleAddToFav = (id) => {
    setOpen(true);
    //check if favorite array exist in local storage or not and act accordingly
    if (JSON.parse(localStorage.getItem("favorites"))) {
      var retrievedData = localStorage.getItem("favorites");
      const oldfav = JSON.parse(retrievedData);
      //check of repetition of ID and act accordingly
      const returnVal = checkRepetitionOfIDs(oldfav, id);
      //if id already present than set without doing anything
      if (returnVal === true) {
        localStorage.setItem("favorites", JSON.stringify(oldfav));
      } else {
        //if not then set with push new id 
        oldfav.push(id);
        localStorage.setItem("favorites", JSON.stringify(oldfav));
      }
    } else {
      //if favorite array is not present then create one and set.
      const favArr = [];
      favArr.push(id);
      localStorage.setItem("favorites", JSON.stringify(favArr));
    }
    setFavoritesArray(JSON.parse(localStorage.getItem("favorites")));
  };
 
  //check repetition of ID and if id already available return false
  const checkRepetitionOfIDs = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i]) {
        return true;
      } else {
        return false;
      }
    }
  };

  //redirect to its details page when click to any movie
  const handleMovieNavigation = (id) => {
    router.push(`/content/${id}`);
  };

  //remove function to remove from favorites  
  const handleRemoveFromFav = (id) => {
    var retrievedData = localStorage.getItem("favorites");
    const favoritesArr = JSON.parse(retrievedData);
    const filteredFavList = favoritesArr.filter((element) => element !== id);
    localStorage.setItem("favorites", JSON.stringify(filteredFavList));
    window.location.reload();
  };

  return (
    <>
    <div className={styles.movielist}>
      <img
        className={styles.movieImg}
        src={
          item?.Poster != "N/A"
            ? item?.Poster
            : "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
          }
      />
      <div
        onClick={() => handleMovieNavigation(item?.imdbID)}
        className={styles.movieInfo}
      >
        <h1 className={styles.movieName}>{item?.Title}</h1>
        <p>
          <b>Year:</b> {item?.Year}
        </p>
        {additionalDetails && (
          <>
            <p>
              <b>Released:</b> {item?.Released}
            </p>
            <p>
              <b>Genre:</b> {item?.Genre}
            </p>
            <p>
              <b>Runtime:</b> {item?.Runtime}
            </p>
            <p>
              <b>Language:</b> {item?.Language}
            </p>
            <p>
              <b>Country:</b> {item?.Country}
            </p>
          </>
        )}
      </div>
      <div className={styles.movieRating}>
        {additionalDetails && (
          <>
            <h3>
              <b>IMDb Rating: </b>
              {item?.Ratings[0].Value}
            </h3>
            <h3>
              <b>IMDb Votes: </b>
              {item?.imdbVotes}
            </h3>
          </>
        )}
        {fav ? (
          <Button
            onClick={() => handleAddToFav(item?.imdbID)}
            className={styles.addToFav}
            >
            {favoritesArray.includes(item?.imdbID)
              ? "Added"
              : "Add to Favorites"}
          </Button>
        ) : (
          <Button
          onClick={() => handleRemoveFromFav(item?.imdbID)}
            className={styles.addToFav}
            >
            Remove from Favorites
          </Button>
        )}
      </div>
    </div>
  <BasicModal handleClose={handleClose} open={open} setOpen={setOpen} />
  </>
  );
};

export default ContentSection;
