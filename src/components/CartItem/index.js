import React, { useContext, useCallback } from "react";

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

export default function CartItem({ product, onRemove }) {
  const { state, dispatch } = useContext(AppContext);
  const { byColor, byId } = state.products;
  const { quantity, selectedFeatures } = product;

  const remaining = byColor[selectedFeatures.color][product.id].remaining;

  const increaseQuantity = useCallback(() => {
    if (remaining !== 0) {
      dispatch({ type: INCREASE_QUANTITY, data: product });
    }
  }, [dispatch, product, remaining]);

  const decreaseQuantity = useCallback(() => {
    if (quantity !== 1) {
      dispatch({ type: DECREASE_QUANTITY, data: product });
    }
  }, [dispatch, quantity, product]);

  const removeItem = useCallback(() => {
    dispatch({ type: REMOVE_ITEM, data: product });

    /**
     * This will be used in the parent component
     * for showing the remove notification message
     */
    onRemove();
  }, [dispatch, product, onRemove]);

  const classes = useStyles();

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <p>{byId[product.id].name}</p>

        <p>
          Brand: <span>{byId[product.id].brand}</span>
        </p>

        {Object.keys(product.selectedFeatures).map((feature) => (
          <Box key={feature}>
            {feature}: {product.selectedFeatures[feature]}
          </Box>
        ))}
      </TableCell>
      <TableCell align="right">{formatPrice(byId[product.id].price)}</TableCell>
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
              value={quantity}
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
              data-testid="increase-button"
              aria-label="plusOne"
              className={classes.plusBtn}
              onClick={increaseQuantity}
              disabled={remaining === 0}
            >
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton
              data-testid="decrease-button"
              aria-label="minusOne"
              className={classes.minusBtn}
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="right">
        {formatPrice(byId[product.id].price * quantity)}
      </TableCell>
      <TableCell align="right">
        <IconButton
          data-testid="remove-button"
          aria-label="remove"
          onClick={removeItem}
        >
          <RemoveCircleOutline />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
