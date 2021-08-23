import React, { useEffect, useState } from "react";
import requestApiCalls from "../../Adapters/api.js";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import SingleContent from "../../components/SingleContent/SingleContent.jsx";
import useAxios from "../../customHooks/useAxios.jsx";

import classes from "./Trending.module.css";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const { fetchData, fetchError } = useAxios();

  useEffect(() => {
    const applyData = (response) => {
      setContent(response.results);
    };
    fetchData(requestApiCalls.fetchTrendingData.bind(null, page), applyData);
    window.scroll(0, 0);
  }, [page, fetchData]);

  if (fetchError) return <h3>Something went Wrong. Please Try Again Later.</h3>;

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className={classes.content}>
        {content &&
          content.map((contentItem) => (
            <SingleContent
              key={contentItem.id}
              id={contentItem.id}
              poster={contentItem.poster_path}
              title={contentItem.title || contentItem.name}
              date={contentItem.first_air_date || contentItem.release_date}
              media_type={contentItem.media_type}
              vote_average={contentItem.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};
export default Trending;
