import React, { useContext } from "react";
import { Grid, Paper } from "@material-ui/core";

import AppContext from "../../store/context";

import EmptyCart from "../../components/EmptyCart";
import CartTable from "../../components/CartTable";

export default function CheckoutPage() {
  const { state, dispatch } = useContext(AppContext);
  const { shopingCart } = state;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!shopingCart.length ? (
            <EmptyCart />
          ) : (
            <Paper variant="outlined">
              <CartTable />
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
