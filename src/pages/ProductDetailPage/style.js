import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  brandTag: {
    margin: "0",
    padding: "0",
    fontSize: "13px",
    color: "rgb(189 189 189)",
    "&::after": {
      content: "''",
      display: "inline-block",
      height: "0.5em",
      verticalAlign: "bottom",
      width: "95%",
      marginRight: "-100%",
      marginLeft: "10px",
      borderTop: "1px solid rgb(189 189 189)",
    },
  },
}));

export default useStyles;
