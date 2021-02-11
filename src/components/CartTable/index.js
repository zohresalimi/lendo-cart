import React, { useContext, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import CartItem from "../CartItem";
import AppContext from "../../store/context";

const TableHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function CartTable() {
  const { state } = useContext(AppContext);
  const { shopingCart } = state;

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableHeader>Product</TableHeader>
            <TableHeader align="right">Price</TableHeader>
            <TableHeader align="right">Qty</TableHeader>
            <TableHeader align="right">Subtotal</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopingCart.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
