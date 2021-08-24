import React, { useState, useEffect } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MoiveIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import TvIcon from "@material-ui/icons/Tv";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./style";

import styles from "./bottomNavigation.module.css";

const SimpleBottomNavigation = () => {
  const classes = useStyles();

  const histroy = useHistory();
  const location = useLocation();

  const pathName = location.pathname;
  const [value, setValue] = useState(() => {
    const getValue = sessionStorage.getItem("COMPONENT_VALUE");
    if (getValue) {
      return getValue;
    } else {
      return pathName;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("COMPONENT_VALUE", JSON.stringify(value));
    if (histroy.action === "POP") {
      setValue(pathName);
    }
  }, [location.pathname, histroy.action, pathName, value]);

  return (
    <div className={styles.bottomNavigation}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          classes={{
            selected: classes.selected,
            root: classes.root,
          }}
          label="Trending"
          icon={<WhatshotIcon />}
          value="/"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          classes={{
            selected: classes.selected,
            root: classes.root,
          }}
          label="Movies"
          icon={<MoiveIcon />}
          value="/shows/movie"
          component={Link}
          to="/shows/movie"
        />
        <BottomNavigationAction
          classes={{
            selected: classes.selected,
            root: classes.root,
          }}
          label="TV Series"
          icon={<TvIcon />}
          value="/shows/tv"
          component={Link}
          to="/shows/tv"
        />
        <BottomNavigationAction
          classes={{
            selected: classes.selected,
            root: classes.root,
          }}
          label="Find"
          icon={<SearchIcon />}
          value="/shows/search"
          component={Link}
          to="/shows/search"
        />
      </BottomNavigation>
    </div>
  );
};
export default SimpleBottomNavigation;
