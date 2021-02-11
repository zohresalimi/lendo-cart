import React, { useContext, useState, useMemo } from "react";

import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { formatPrice } from "../../utils";
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
  const { shoppingCart, products } = state;

  const totalAmount = useMemo(() => {
    return shoppingCart.reduce((total, { quantity, id }) => {
      const price = products.byId[id].price;
      return total + price * quantity;
    }, 0);
  }, [shoppingCart, products]);

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
      <Box display="flex" flexDirection="row-reverse" mt={4}>
        Total amount: {formatPrice(totalAmount)}
      </Box>
    </>
  );
}
