import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Chip,
  Button,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

import useAxios from "../../hooks/useAxios";
import AppContext from "../../store/context";
import { formatPrice } from "../../utils";
import { SET_PRODUCTS_REDUCER } from "../../constant";

import useStyles from "./style";

const TableHeader = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function HomePage() {
  const { state, dispatch } = useContext(AppContext);
  const { products } = state;
  const [{ data, isLoading, isError }, doFetch] = useAxios();
  const location = useLocation();

  const classes = useStyles();

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_PRODUCTS_REDUCER, data: data.items });
    }
  }, [data, dispatch]);

  const rowHandelClick = (row) => {
    console.log(row);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isError && <div>Somthing went wrong</div>}
        {isLoading ? (
          <LinearProgress className={classes.progressBar} />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader align="right">Brand</TableHeader>
                  <TableHeader align="right">available</TableHeader>
                  <TableHeader align="right">price</TableHeader>
                  <TableHeader align="right">price</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((row) => (
                    <TableRow key={row.id} onClick={() => rowHandelClick(row)}>
                      <TableCell component="th" scope="row">
                        <Link
                          to={{
                            pathname: `/product-detail/${row.id}`,
                            state: { background: location },
                          }}
                        >
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">
                        {row.available ? (
                          <Chip
                            variant="outlined"
                            size="small"
                            label="In stock"
                            className={classes.success}
                          />
                        ) : (
                          <Chip
                            variant="outlined"
                            size="small"
                            label="Out stock"
                            color="secondary"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(row.price)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          component={Link}
                          to={{
                            pathname: `/product-detail/${row.id}`,
                            state: { background: location },
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}
