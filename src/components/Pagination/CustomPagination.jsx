import { createTheme, ThemeProvider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const pageChangeHandler = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          hideNextButton
          hidePrevButton
          variant="outlined"
          shape="rounded"
          count={numOfPages}
          onChange={(event) => pageChangeHandler(event.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
