import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

export default function ProductDetailPage(props) {
  const history = useHistory();
  let { id } = useParams();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div>
      Product Detail
      <Dialog
        open={true}
        onClose={back}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
          {id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={back} color="primary">
            Disagree
          </Button>
          <Button onClick={back} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div role="button" className="modal-wrapper" onClick={back}>
        <div
          role="button"
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <p>CONTENT</p>
        </div>
      </div>
    </div>
  );
}
