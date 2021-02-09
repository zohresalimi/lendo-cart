import React, { useContext, useMemo, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Chip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import Avatar from "@material-ui/core/Avatar";

import AppContext from "../../store/context";

import ColorPicker from "../../components/ColorPicker";
import Feature from "../../components/Features";

import { formatPrice } from "../../utils";

import useStyles from "./style";

import { SET_CURRENT_PRODUCT, ADD_PRODUCT_TO_CART } from "../../constant";

export default function ProductDetailPage() {
  const { state, dispatch } = useContext(AppContext);
  const { productByIds } = state.products;

  const history = useHistory();
  let { id } = useParams();
  const product = productByIds[id];
  const productByColor = useMemo(() => {
    if (state.currentProduct) {
      return product.byColor[state.currentProduct.selectedFeatures.color];
    }
  }, [product.byColor, state.currentProduct]);

  const isDisabled = useMemo(() => {
    if (productByColor) {
      return !product.available || !productByColor.remaining;
    }
  }, [product, productByColor]);

  useEffect(() => {
    if (product) {
      dispatch({ type: SET_CURRENT_PRODUCT, data: product });
    }
  }, [dispatch, product]);

  const addToCart = (e) => {
    dispatch({ type: ADD_PRODUCT_TO_CART });
    back(e);
  };

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
          fullWidth={true}
          maxWidth={"sm"}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {product.name}
            <p className={classes.brandTag}>{product.brand}</p>
          </DialogTitle>
          <DialogContent>
            <h3 className={classes.priceTag}>{formatPrice(product.price)}</h3>
            <Chip
              className={product.available ? classes.success : ""}
              size="small"
              label={product.available ? "In stock" : "out stock"}
              variant="outlined"
              icon={
                product.available ? <DoneIcon style={{ color: "green" }} /> : ""
              }
            />
            <Chip
              color="secondary"
              size="small"
              avatar={<Avatar>W</Avatar>}
              label={`${product.weight}`}
              variant="outlined"
              deleteIcon={<DoneIcon />}
            />

            {product.byColor && (
              <>
                <ColorPicker items={product.byColor} />
                <Feature />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={back}
              color="primary"
              className={classes.cancelBtn}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              autoFocus
              className={classes.addToCart}
              onClick={addToCart}
              disabled={isDisabled}
            >
              Add To cart
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
