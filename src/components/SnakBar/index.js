import React, { Fragment } from "react";

import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./style";

export default function SnakBar({ visible, hideSnakbar, text, type }) {
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      ContentProps={{
        "aria-describedby": "message-id",
        className: classes[`${type || "success"}SnakBar`],
      }}
      open={visible}
      autoHideDuration={6000}
      onClose={hideSnakbar}
      message={text}
      action={
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={hideSnakbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );
}
