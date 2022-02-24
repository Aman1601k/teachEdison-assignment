import styles from "../styles/Home.module.css";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ContentSection from "../components/ContentSection";

import Button from '@mui/material/Button';

export default function Home() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  //create a constant for pagination  asssign to a value 
  const dataperpage = 4;
  const [page, setPage] = useState(1);
  // create two constant for start index and last index of the data present on the page
  const indexOfLastData = page * dataperpage;
  const indexOfFirstData = indexOfLastData - dataperpage;

  const [string, setString] = useState("Search for any movie or TV Shows....");

  console.log("data", data )

  return (
    <div className={styles.container}>
      <Navbar
        setMovie={setMovie}
        movie={movie}
        setData={setData}
        setString={setString}
        remove="none"
      />
      <div className={styles.listBody}>
        {/*slice data for pagination */}
        {data.length > 0 ? (
          data.slice(indexOfFirstData, indexOfLastData).map((item) => {
            return (
              <ContentSection
                key={item?.imdbID}
                item={item}
                fav={true}
              />
            );
          })
        ) : (
          <h1 className={styles.emptyResult}>{string}</h1>
        )}
      </div>
      <div className={styles.paginationDiv}>
        {
          <>
            {page - 1 > 0 && (
              <Button
                onClick={() => setPage(page - 1)}
                className={styles.paginateButton}
              >
                Prev
              </Button>
            )}
            {data.slice(indexOfFirstData, indexOfLastData).length >=
              dataperpage && (
              <Button
                onClick={() => setPage(page + 1)}
                className={styles.paginateButton}
              >
                Next
              </Button>
            )}
          </>
        }
      </div>
    </div>
  );
}
