import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useAxios from "../../customHooks/useAxios";
import requestApiCalls from "../../Adapters/api";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel.jsx";
import { Link } from "react-router-dom";
import useStyles from "./style";

import styles from "./ContentModal.module.css";

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const { fetchData, fetchError } = useAxios();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const applyModalData = (response) => {
      setContent(response);
    };
    fetchData(
      requestApiCalls.fetchModalData.bind(null, media_type, id),
      applyModalData
    );
  }, [fetchData, media_type, id]);

  useEffect(() => {
    const applyVideoData = (response) => {
      setVideo(response.results[0]?.key);
    };
    fetchData(
      requestApiCalls.fetchVideoData.bind(null, media_type, id),
      applyVideoData
    );
  }, [fetchData, media_type, id]);

  if (fetchError) return <h3>Something went wrong. Please try again later.</h3>;
  return (
    <>
      <div
        className={styles.media}
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className={styles.ContentModal}>
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className={styles["ContentModal__portrait"]}
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className={styles["ContentModal__landscape"]}
                />
                <div className={styles["ContentModal__about"]}>
                  <span className={styles["ContentModal__title"]}>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className={styles.tagline}>{content.tagline}</i>
                  )}

                  <span className={styles["ContentModal__description"]}>
                    "{content.overview}"
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button variant="contained" color="secondary">
                    <Link
                      to={{
                        pathname: "/shows/watch",
                        state: {
                          videoObj: { video },
                          content: { content },
                        },
                      }}
                      className={styles["link__style"]}
                    >
                      <YouTubeIcon />
                      <span style={{ marginLeft: "10px" }}>
                        Watch the Trailer
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
