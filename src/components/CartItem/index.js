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

import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
} from "../../constant";

import useStyles from "../CartItem/style";
import { RemoveCircleOutline } from "@material-ui/icons";

export default function CartItem({ product }) {
  const { state, dispatch } = useContext(AppContext);
  const { products } = state;

  const remaining =
    products.productByIds[product.id].byColor[product.selectedFeatures.color]
      .remaining;

  const increaseQuantity = useCallback(() => {
    if (remaining !== 0) {
      dispatch({ type: INCREASE_QUANTITY, data: product });
    }
  }, [dispatch, product, remaining]);

  const decreaseQuantity = useCallback(() => {
    if (product.quantity !== 1) {
      dispatch({ type: DECREASE_QUANTITY, data: product });
    }
  }, [dispatch, product]);

  const removeItem = useCallback(() => {
    dispatch({ type: REMOVE_ITEM, data: product });
  }, [dispatch, product]);

  const classes = useStyles();

  return (
    <TableRow key={product.id}>
      <TableCell component="th" scope="row">
        <p>{products.productByIds[product.id].name}</p>

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
              disabled={remaining === 0}
            >
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              aria-label="minusOne"
              className={classes.minusBtn}
              onClick={decreaseQuantity}
              disabled={product.quantity <= 1}
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
      <TableCell align="right">
        <IconButton aria-label="remove" onClick={removeItem}>
          <RemoveCircleOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
