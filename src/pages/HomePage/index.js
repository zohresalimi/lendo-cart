import React, { useEffect, useContext } from "react";

import {
  Grid,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import { formatPrice } from "../../utils";
import { SET_PRODUCTS_REDUCER } from "../../constant";

export default function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const { products } = state;
  const [{ data, isLoading, isError }, doFetch] = useAxios();

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_PRODUCTS_REDUCER, data: data.items });
    }
  }, [data, dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">available</TableCell>
                <TableCell align="right">price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{!!row.available}</TableCell>
                    <TableCell align="right">
                      {formatPrice(row.price)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
