import React, { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";

import classes from "./VideoPlayer.module.css";

const VideoPlayer = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const location = useLocation();
  const { videoObj, content } = location.state;
  const videoId = videoObj.video;
  const contentDesc = content.content;
  console.log(contentDesc);
  return (
    <>
      <div className={classes["player-wrapper"]}>
        {!videoId && (
          <div className={classes["video-availability"]}>
            Video Not Available.
          </div>
        )}
        {videoId && (
          <ReactPlayer
            className={classes["react-player"]}
            url={`https://www.youtube.com/watch?v=${videoId}`}
            width="100%"
            height="82%"
            controls={true}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        )}
      </div>
      <div className={classes.mobile}>
        <h2>{contentDesc.original_title}</h2>
        <h5>{contentDesc.overview}</h5>
        <h4>Rating : {contentDesc.vote_average} / 10</h4>
        <h4>Release Status : {contentDesc.status}</h4>
        <h4>Release Date : {contentDesc.release_date}</h4>
      </div>
    </>
  );
};

export default VideoPlayer;
