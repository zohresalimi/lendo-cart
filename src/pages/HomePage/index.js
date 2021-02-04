import React from "react";

import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function HomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper>xs=12 sm=6</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>xs=12 sm=6</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper>xs=6 sm=3</Paper>
      </Grid>
    </Grid>
  );
}
