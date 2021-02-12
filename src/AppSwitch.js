import React from "react";
import { Route, useLocation, Switch } from "react-router-dom";

import { Container } from "@material-ui/core";

// Pages
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function AppSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Container maxWidth="md">
        <Switch location={background || location}>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/product-detail/:id" children={ProductDetailPage} />
          <Route path="/checkout" component={CheckoutPage}></Route>
        </Switch>
      </Container>
      {background && (
        <Route path="/product-detail/:id" children={<ProductDetailPage />} />
      )}
    </>
  );
}

export default AppSwitch;
