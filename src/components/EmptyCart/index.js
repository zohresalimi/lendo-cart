import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, makeStyles } from "@material-ui/core";

import { ReactComponent as SvgCart } from "../../images/empty-cart.svg";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "& h3": {
      margin: "0",
    },
    "& a": {
      color: "#777",
      "&:hover": {
        color: "black",
      },
    },
  },
}));
export default function EmptyCart() {
  const classes = useStyles();

  return (
    <Box
      Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      className={classes.wrapper}
    >
      <Box>
        <SvgCart />
      </Box>
      <h3>Your shopping cart looks empty</h3>
      <p>What are you waiting for?</p>
      <Button variant="outlined" component={Link} to="/">
        Start Shopping
      </Button>
    </Box>
  );
}
