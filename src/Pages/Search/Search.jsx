import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SingleContent from "../../components/SingleContent/SingleContent.jsx";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import useAxios from "../../customHooks/useAxios.jsx";
import requestApiCalls from "../../Adapters/api.js";

import classes from "../Trending/Trending.module.css";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);

  //* Custom Hook for fetching the data.
  const { fetchData } = useAxios();

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    if (query) {
      const applyData = (response) => {
        setContent(response.results);
        setNumOfPages(response.total_pages);
      };

      fetchData(
        requestApiCalls.fetchSearchData.bind(null, page, query, type),
        applyData
      );
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ display: "flex" }}>
          <TextField
            style={{ flex: 1, justifyContent: "center" }}
            label="Search"
            variant="filled"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10 }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType((prevValue) => (prevValue = newValue));
            setPage(1);
          }}
          style={{ padding: 6 }}
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className={classes.content}>
        {content &&
          content.map((contentItem) => (
            <SingleContent
              key={contentItem.id}
              id={contentItem.id}
              poster={contentItem.poster_path}
              title={contentItem.title || contentItem.name}
              date={contentItem.first_air_date || contentItem.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={contentItem.vote_average}
            />
          ))}
        {query &&
          content.length === 0 &&
          !numOfPages &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
