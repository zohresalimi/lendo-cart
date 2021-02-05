import React, { useReducer } from "react";
import { Server } from "miragejs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route
              path="/product-detail/:id"
              component={ProductDetailPage}
            ></Route>
            <Route path="/checkout" component={CheckoutPage}></Route>
          </Switch>
        </Router>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
