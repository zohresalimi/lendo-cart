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
import SnakBar from "../../components/SnakBar";
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
  const [showSnakbar, setShowSnakbar] = useState(false);
  const { state } = useContext(AppContext);
  const { shoppingCart } = state;

  return (
    <>
      <SnakBar
        visible={showSnakbar}
        hideSnakbar={() => setShowSnakbar(false)}
        type="error"
        text={"Item has removed successfuly"}
      />
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableHeader>Product</TableHeader>
              <TableHeader align="right">Price</TableHeader>
              <TableHeader align="right">Qty</TableHeader>
              <TableHeader align="right">Subtotal</TableHeader>
              <TableHeader align="right">Remove</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingCart.map((product) => (
              <CartItem
                product={product}
                key={product.id}
                onRemove={() => setShowSnakbar(true)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
