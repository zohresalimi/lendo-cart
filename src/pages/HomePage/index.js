import React, { useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import { SET_PRODUCTS_REDUCER } from "../../constant";

import DataTable from "../../components/DataTable";
import useStyles from "./style";

export default function HomePage() {
  const { dispatch } = useContext(AppContext);
  const [{ data, isLoading, isError }] = useAxios("api/products");

  const classes = useStyles();

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_PRODUCTS_REDUCER, data: data.items });
    }
  }, [data, dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isError && <div>Somthing went wrong</div>}
        {isLoading ? (
          <LinearProgress className={classes.progressBar} />
        ) : (
          <DataTable />
        )}
      </Grid>
    </Grid>
  );
}
