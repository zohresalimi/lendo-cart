import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import { SET_PRODUCTS_REDUCER } from "../../constant";

import DataTable from "../../components/DataTable";
import SnakBar from "../../components/SnakBar";
import useStyles from "./style";
import { useHistory, useLocation } from "react-router-dom";

export default function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const [showSnakbar, setShowSnakbar] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const [{ data, isLoading, isError }] = useAxios("api/products");

  const classes = useStyles();

  console.log(location);

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_PRODUCTS_REDUCER, data: data.items });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (location.state?.messageText) {
      setShowSnakbar(true);
    }

    return () => {
      history.replace({ ...history.location, state: {} });
    };
  }, [history, location.state]);

  return (
    <>
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
      <SnakBar
        showSnakbar={showSnakbar}
        setShowSnakbar={setShowSnakbar}
        text={location.state?.messageText}
      />
    </>
  );
}
