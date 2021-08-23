import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import classes from "./SingleContent.module.css";
import ContentModal from "../ContentModal/ContentModal.jsx";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className={classes.poster}
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className={classes.title}>{title}</b>
      <span className={classes.subTitle}>
        {media_type === "tv" ? "TV Series" : "Movies"}
        <span>{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
