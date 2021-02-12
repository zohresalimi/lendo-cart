import React, { Children, useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppContext from "../store/context";
import reducer from "../store/reducer";

export const getTestStore = () => {
  return {
    currentProduct: {
      id: 1,
      selectedFeatures: {
        color: "whith",
        power: 6.5,
      },
    },
    products: {
      byColor: {
        white: {
          1: { power: [6.5, 9.5], remaining: 3 },
          2: { power: [6.5, 9.5], remaining: 3 },
        },
        red: {
          1: { power: [6.5, 9.5], remaining: 7 },
          2: { power: [6.5, 9.5], remaining: 7 },
        },
      },
      byId: {
        1: {
          id: 1,
          name: "Philips hue bulb",
          brand: "Philips",
          price: "500",
          available: true,
          weight: 0.2,
          options: [
            {
              color: "white",
              power: [6.5, 9.5],
              quantity: 3,
            },
            {
              color: "red",
              power: [6.5, 9.5],
              quantity: 7,
            },
          ],
        },
        2: {
          id: 2,
          name: "Trådfria Lampor",
          brand: "IKEA",
          price: "300",
          available: true,
          weight: 0.2,
          options: [
            {
              color: "white",
              power: [6.5, 9.5],
              quantity: 3,
            },
            {
              color: "red",
              power: [6.5, 9.5],
              quantity: 7,
            },
            {
              color: "green",
              power: [6.5],
              quantity: 0,
            },
          ],
        },
      },
    },
    shoppingCart: [
      { id: 1, quantity: 1, selectedFeatures: { color: "white", power: 6.5 } },
    ],
  };
};

export const WithProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, getTestStore());

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch: props.mockDispatch || dispatch,
      }}
    >
      <Router>{props.children}</Router>
    </AppContext.Provider>
  );
};
