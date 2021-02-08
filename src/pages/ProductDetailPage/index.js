import React, { useContext, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AppContext from "../../store/context";

import useStyles from "./style";

export default function ProductDetailPage() {
  const { state, dispatch } = useContext(AppContext);
  const { productByIds } = state.products;
  const history = useHistory();
  let { id } = useParams();

  const product = useMemo(() => productByIds[id], [productByIds, id]);

  console.log("product:", product);

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {product && (
        <Dialog
          fullScreen={fullScreen}
          open={true}
          onClose={back}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">
            {product.name}
            <p className={classes.brandTag}>{product.brand}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
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
      )}
      {/* <div role="button" className="modal-wrapper" onClick={back}>
        <div
          role="button"
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <p>CONTENT</p>
        </div>
      </div> */}
    </div>
  );
}
