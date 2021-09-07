import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  thumbnailContent: {
    paddingBottom: 30,
  },
  full: {
    width: "100%",
  },
  thumbnail: {
    paddingTop: "56.25%",
    cursor: "pointer",
  },
  selectedThumb: {
    border: "2px solid red",
  },
});
