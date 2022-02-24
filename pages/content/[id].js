import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ContentSection from "../../components/ContentSection";

export default function Content() {
  const router = useRouter();
  const { id } = router.query;
  const [movieData, setMovieData] = useState();

  //useEffect for fetchdata initially
  useEffect(() => {
    fetchData();
  }, []);

  //function for fetchdata according to id
  const fetchData = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`
    );
    const data = await response.json();
    setMovieData(data);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.listBody}>
        <ContentSection item={movieData} fav={true} additionalDetails={true} />
      </div>
    </div>
  );
}
