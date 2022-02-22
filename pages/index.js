import styles from "../styles/Home.module.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ContentSection from "../components/ContentSection";

export default function Home() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const [string, setString] = useState("Search for any movie or TV Shows....");

  return (
    <div className={styles.container}>
      <Navbar
        setMovie={setMovie}
        movie={movie}
        setData={setData}
        setString={setString}
        favorites={favorites}
        remove="none"
      />
      <div className={styles.listBody}>
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <ContentSection setFavorites={setFavorites} favorites={favorites} item={item} fav={true} />
            );
          })
        ) : (
          <h1 className={styles.emptyResult}>{string}</h1>
        )}
      </div>
    </div>
  );
}
