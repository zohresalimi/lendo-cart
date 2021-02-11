import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    margin: "2px",
    padding: "0",
    maxWidth: "75px",
  },
  input: {
    borderRadius: "0",

    "& input": {
      padding: "16px",
      textAlign: "center",
    },
  },
  btnWrapper: {
    " & button": {
      border: "1px solid #ccc",
      borderRadius: "0",
      padding: "0px",
    },
  },
}));

export default useStyles;
