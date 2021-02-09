import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: "#232323",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

export default useStyles;
