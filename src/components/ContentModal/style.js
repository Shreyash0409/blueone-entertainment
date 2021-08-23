import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "80vw",
    height: "80vh",
    backgroundColor: "#131225",
    outline: "none",
    color: "#fff",
    boxShadow: theme.shadows[100],
    borderRadius: 7,
    marginRight: 6,
    padding: theme.spacing(0, 0.5, 4, 0),
  },
}));

export default useStyles;
