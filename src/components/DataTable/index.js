import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
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
import { formatPrice } from "../../utils";
import AppContext from "../../store/context";

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

export default function DataTable() {
  const { state } = useContext(AppContext);
  const { items } = state.products;
  const location = useLocation();

  const classes = useStyles();

  return (
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
          {items &&
            items.map((row) => (
              <TableRow key={row.id}>
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
                <TableCell align="right">{formatPrice(row.price)}</TableCell>
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
  );
}
