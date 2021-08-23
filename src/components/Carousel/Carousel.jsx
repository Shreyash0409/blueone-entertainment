import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import useAxios from "../../customHooks/useAxios";
import requestApiCalls from "../../Adapters/api";

import classes from "./Carousel.module.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);
  const { fetchData } = useAxios();
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  useEffect(() => {
    const applyData = (response) => {
      setCredits(response.cast);
      console.log(response);
    };
    fetchData(
      requestApiCalls.fetchCreditsData.bind(null, media_type, id),
      applyData
    );
  }, [fetchData, media_type, id]);

  const items = credits.map((c) => (
    <div className={classes.carouselItem}>
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className={classes["carouselItem-img"]}
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Carousel;
