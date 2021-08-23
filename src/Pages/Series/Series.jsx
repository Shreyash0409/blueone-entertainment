import { useEffect, useState } from "react";
import requestApiCalls from "../../Adapters/api.js";
import Chips from "../../components/Chips/Chips.jsx";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import SingleContent from "../../components/SingleContent/SingleContent.jsx";
import useAxios from "../../customHooks/useAxios.jsx";
import useGenres from "../../customHooks/useGenres.jsx";
import classes from "../Trending/Trending.module.css";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [selectedChips, setSelectedChips] = useState([]);
  const [chips, setChips] = useState([]);
  const genreforURL = useGenres(selectedChips);
  const { fetchData, fetchError } = useAxios();

  useEffect(() => {
    window.scroll(0, 0);
    const applyData = (response) => {
      setContent(response.results);
      setNumOfPages(response.total_pages);
    };
    fetchData(
      requestApiCalls.fetchSeriesData.bind(null, page, genreforURL),
      applyData
    );
  }, [page, genreforURL, fetchData]);

  if (fetchError) return <h3>Something went Wrong. Please Try Again Later.</h3>;

  return (
    <div>
      <span className="pageTitle">TV Series</span>
      {chips && (
        <Chips
          type="tv"
          selectedChips={selectedChips}
          setSelectedChips={setSelectedChips}
          chips={chips}
          setChips={setChips}
          setPage={setPage}
          setNumOfPages={setNumOfPages}
        />
      )}
      <div className={classes.content}>
        {content &&
          content.map((contentItem) => (
            <SingleContent
              key={contentItem.id}
              id={contentItem.id}
              poster={contentItem.poster_path}
              title={contentItem.title || contentItem.name}
              date={contentItem.first_air_date || contentItem.release_date}
              media_type="tv"
              vote_average={contentItem.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
