import React, { useContext, Fragment } from "react";

import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import AppContext from "../../store/context";

import useStyles from "./style";

export default function SnakBar({ showSnakbar, setShowSnakbar, text }) {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      ContentProps={{
        "aria-describedby": "message-id",
        className: classes.successSnakBar,
      }}
      open={showSnakbar}
      autoHideDuration={6000}
      onClose={() => setShowSnakbar(false)}
      message={text}
      action={
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnakbar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
}
