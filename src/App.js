import React, { useReducer, useEffect } from "react";
import { Server } from "miragejs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import useAxios from "./hooks/useAxios";
import myData from "./mockProducts.json";
import AppContext from "./store/context";
import store from "./store";

//Pages
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

new Server({
  routes() {
    this.namespace = "api";
    this.get("/products", () => {
      return myData;
    });
  },
});

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.state);

  const [{ data, isLoading, isError }, doFetch] = useAxios();

  useEffect(() => {}, [input]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/product-detail" component={ProductDetailPage}></Route>
            <Route path="/checkout" component={CheckoutPage}></Route>
          </Switch>
        </Router>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
