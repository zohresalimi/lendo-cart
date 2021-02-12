import React, { useContext } from "react";

import { AppBar, Toolbar, Button, Typography, Badge } from "@material-ui/core";
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import useStyles from "./style";
import AppContext from "../../store/context";

export default function NavBar() {
  const { state } = useContext(AppContext);
  const { shoppingCart } = state;
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
            <Badge color="secondary" badgeContent={`${shoppingCart.length}`}>
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
