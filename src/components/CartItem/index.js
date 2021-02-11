import React, { useContext, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  TableRow,
  TableCell,
  TextField,
  Box,
  IconButton,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { formatPrice } from "../../utils";
import AppContext from "../../store/context";

import { INCREASE_QUANTITY } from "../../constant";

import useStyles from "../CartItem/style";

export default function CartItem({ product }) {
  const location = useLocation();
  const [disabledBtn, setDisabledBtn] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { products } = state;

  const increaseQuantity = useCallback(() => {
    const remaining =
      products.productByIds[product.id].byColor[product.selectedFeatures.color]
        .remaining;
    if (remaining !== 0) {
      dispatch({ type: INCREASE_QUANTITY, data: product });
    } else {
      setDisabledBtn(true);
    }
  }, [dispatch, product, products.productByIds]);

  const classes = useStyles();

  return (
    <TableRow key={product.id}>
      <TableCell component="th" scope="row">
        <Link
          to={{
            pathname: `/product-detail/${product.id}`,
            state: { background: location },
          }}
        >
          {products.productByIds[product.id].name}
        </Link>
        <p>
          Brand: <span>{products.productByIds[product.id].brand}</span>
        </p>
      </TableCell>
      <TableCell align="right">
        {formatPrice(products.productByIds[product.id].price)}
      </TableCell>
      <TableCell align="right">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <TextField
              className={classes.inputWrapper}
              variant="outlined"
              defaultValue={product.quantity}
              value={product.quantity}
              InputProps={{
                className: classes.input,
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            className={classes.btnWrapper}
          >
            <IconButton
              aria-label="plusOne"
              className={classes.plusBtn}
              onClick={increaseQuantity}
              disabled={disabledBtn}
            >
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              aria-label="minusOne"
              className={classes.minusBtn}
              m={1}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        {formatPrice(
          products.productByIds[product.id].price * product.quantity
        )}
      </TableCell>
    </TableRow>
  );
}
