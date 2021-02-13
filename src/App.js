import React, { useReducer } from "react";
import { Server } from "miragejs";
import { BrowserRouter as Router } from "react-router-dom";

import myData from "./mockProducts.json";
import AppContext from "./store/context";
import store from "./store";

// Components
import NavBar from "./components/NavBar";

import AppSwitch from "./AppSwitch";

/**
 * Using MirageJs to create a fake test
 * server for development purposes
 */
new Server({
  routes() {
    this.namespace = "api";
    this.get("/products", () => {
      return myData;
    });
  },
});

function App() {
  /**
   * We could store a copy of our state in localstorage
   * and read and assign that as a default value for
   * our initial state. This way, we could have our
   * products result cached, and then avoid calling
   * to same API and re-doing the data processing
   * everytime when user opens the page.
   */
  const [state, dispatch] = useReducer(store.reducer, store.state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <NavBar />
        <AppSwitch />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
