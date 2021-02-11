import React, { useContext } from "react";
import { Grid, Paper } from "@material-ui/core";

import AppContext from "../../store/context";

import EmptyCart from "../../components/EmptyCart";
import CartTable from "../../components/CartTable";

export default function CheckoutPage() {
  const { state } = useContext(AppContext);
  const { shoppingCart } = state;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!shoppingCart.length ? <EmptyCart /> : <CartTable />}
        </Grid>
      </Grid>
    </div>
  );
}
