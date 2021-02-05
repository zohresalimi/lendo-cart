import React from "react";

import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import useStyles from "./style";

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            OnlineShop
          </Typography>
          <Button
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/checkout"
          >
            <ShoppingCartIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
