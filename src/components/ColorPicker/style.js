import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  show: {
    display: "block",
    position: "absolute",
    top: "0",
  },
  hide: {
    display: "none",
  },
}));

export default useStyles;
