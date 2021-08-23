import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0F0E1E",
    color: "rgba(240, 240, 240, 0.3);",
    "&$selected": {
      color: "#e0e0e0",
    },
    padding: "0px 7px 0px 7px",
  },
  selected: {},
});

export default useStyles;
