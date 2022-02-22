import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const ContentSection = ({
  item,
  fav,
  additionalDetails,
}) => {
  const router = useRouter();

  const handleMovieNavigation = (id) => {
    router.push(`/content/${id}`);
  };
  
  return (
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
            <h2>
              <b>IMDb Rating: </b>
              {item?.Ratings[0].Value}
            </h2>
            <h2>
              <b>IMDb Votes: </b>
              {item?.imdbVotes}
            </h2>
          </>
        )}
        {fav ? (
          <button
            className={styles.addToFav}
          >
            Add to Favorites
          </button>
        ) : (
          <button
            className={styles.addToFav}
          >
            Remove from Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentSection;
