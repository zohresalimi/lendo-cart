import reducer from "../reducer";
import {
  SET_PRODUCTS_REDUCER,
  SET_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
  SET_FEATURES,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
} from "../../constant";

import { getTestStore } from "../../mockTestData/data";

const getEmtyState = () => ({
  currentProduct: {},
  products: {
    items: [],
    byColor: {},
    byId: {},
  },
  shoppingCart: [],
});

describe("Test App Reducer", () => {
  test("should set product to the state", () => {
    const state = getTestStore();
    const initialState = getEmtyState();
    const expextedState = {
      ...initialState,
      products: {
        items: state.products.items,
        byId: state.products.byId,
        byColor: state.products.byColor,
      },
    };

    const resultState = reducer(initialState, {
      type: SET_PRODUCTS_REDUCER,
      data: state.products.items,
    });
    expect(resultState).toEqual(expextedState);
  });

  test("should set current product to the state", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: state.products.byColor,
    };
    const expextedState = {
      ...initialState,
      currentProduct: {
        id: state.products.items[0].id,
        selectedFeatures: {
          color: state.products.items[0].options[0].color,
          power: state.products.items[0].options[0].power[0],
        },
      },
    };
    const resultState = reducer(initialState, {
      type: SET_CURRENT_PRODUCT,
      data: state.products.items[0],
    });
    expect(resultState).toEqual(expextedState);
  });

  test("should add product to the cart", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.currentProduct = state.currentProduct;

    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: state.products.byColor,
    };

    const expextedState = {
      ...initialState,
      products: {
        ...initialState.products,
        byColor: {
          ...initialState.products.byColor,
          [initialState.currentProduct.selectedFeatures.color]: {
            ...initialState.products.byColor[
              initialState.currentProduct.selectedFeatures.color
            ],
            [initialState.currentProduct.id]: {
              ...initialState.products.byColor[
                initialState.currentProduct.selectedFeatures.color
              ][initialState.currentProduct.id],
              remaining: 2,
            },
          },
        },
      },
      shoppingCart: [
        {
          ...initialState.currentProduct,
          quantity: 1,
        },
      ],
    };
    const resultState = reducer(initialState, {
      type: ADD_PRODUCT_TO_CART,
    });
    expect(resultState).toEqual(expextedState);
  });

  test("should increase number of the product to the cart", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.currentProduct = state.currentProduct;

    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: {
        ...state.products.byColor,
        [state.currentProduct.selectedFeatures.color]: {
          ...state.products.byColor[
            state.currentProduct.selectedFeatures.color
          ],
          [state.currentProduct.id]: {
            ...state.products.byColor[
              state.currentProduct.selectedFeatures.color
            ][state.currentProduct.id],
            remaining: 2,
          },
        },
      },
    };

    initialState.shoppingCart = [
      { id: 1, quantity: 1, selectedFeatures: { color: "white", power: 6.5 } },
    ];

    const expextedState = {
      ...initialState,
      products: {
        ...initialState.products,
        byColor: {
          ...initialState.products.byColor,
          [initialState.currentProduct.selectedFeatures.color]: {
            ...initialState.products.byColor[
              initialState.currentProduct.selectedFeatures.color
            ],
            [initialState.currentProduct.id]: {
              ...initialState.products.byColor[
                initialState.currentProduct.selectedFeatures.color
              ][initialState.currentProduct.id],
              remaining: 1,
            },
          },
        },
      },
      shoppingCart: [
        {
          ...initialState.currentProduct,
          quantity: 2,
        },
      ],
    };
    const resultState = reducer(initialState, {
      type: INCREASE_QUANTITY,
      data: state.shoppingCart[0],
    });

    expect(resultState).toEqual(expextedState);
  });

  test("should decrease number of the product to the cart", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.currentProduct = state.currentProduct;

    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: {
        ...state.products.byColor,
        [state.currentProduct.selectedFeatures.color]: {
          ...state.products.byColor[
            state.currentProduct.selectedFeatures.color
          ],
          [state.currentProduct.id]: {
            ...state.products.byColor[
              state.currentProduct.selectedFeatures.color
            ][state.currentProduct.id],
            remaining: 1,
          },
        },
      },
    };

    initialState.shoppingCart = [
      { id: 1, quantity: 2, selectedFeatures: { color: "white", power: 6.5 } },
    ];

    const expextedState = {
      ...initialState,
      products: {
        ...initialState.products,
        byColor: {
          ...initialState.products.byColor,
          [initialState.currentProduct.selectedFeatures.color]: {
            ...initialState.products.byColor[
              initialState.currentProduct.selectedFeatures.color
            ],
            [initialState.currentProduct.id]: {
              ...initialState.products.byColor[
                initialState.currentProduct.selectedFeatures.color
              ][initialState.currentProduct.id],
              remaining: 2,
            },
          },
        },
      },
      shoppingCart: [
        {
          ...initialState.currentProduct,
          quantity: 1,
        },
      ],
    };
    const resultState = reducer(initialState, {
      type: DECREASE_QUANTITY,
      data: state.shoppingCart[0],
    });

    expect(resultState).toEqual(expextedState);
  });

  test("should remove a product from the cart", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.currentProduct = state.currentProduct;

    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: {
        ...state.products.byColor,
        [state.currentProduct.selectedFeatures.color]: {
          ...state.products.byColor[
            state.currentProduct.selectedFeatures.color
          ],
          [state.currentProduct.id]: {
            ...state.products.byColor[
              state.currentProduct.selectedFeatures.color
            ][state.currentProduct.id],
            remaining: 1,
          },
        },
      },
    };

    initialState.shoppingCart = [
      { id: 1, quantity: 2, selectedFeatures: { color: "white", power: 6.5 } },
    ];

    const expextedState = {
      ...initialState,
      products: {
        ...initialState.products,
        byColor: {
          ...initialState.products.byColor,
          [initialState.currentProduct.selectedFeatures.color]: {
            ...initialState.products.byColor[
              initialState.currentProduct.selectedFeatures.color
            ],
            [initialState.currentProduct.id]: {
              ...initialState.products.byColor[
                initialState.currentProduct.selectedFeatures.color
              ][initialState.currentProduct.id],
              remaining: 3,
            },
          },
        },
      },
      shoppingCart: [],
    };
    const resultState = reducer(initialState, {
      type: REMOVE_ITEM,
      data: initialState.shoppingCart[0],
    });

    expect(resultState).toEqual(expextedState);
  });

  test("should set a product feature", () => {
    const state = getTestStore();
    let initialState = getEmtyState();
    initialState.currentProduct = state.currentProduct;

    initialState.products = {
      items: state.products.items,
      byId: state.products.byId,
      byColor: state.products.byColor,
    };

    initialState.shoppingCart = [
      { id: 1, quantity: 2, selectedFeatures: { color: "white", power: 6.5 } },
    ];

    const expextedState = {
      ...initialState,
      currentProduct: {
        ...initialState.currentProduct,
        selectedFeatures: {
          ...initialState.currentProduct.selectedFeatures,
          power: 9.5,
        },
      },
    };

    const resultState = reducer(initialState, {
      type: SET_FEATURES,
      data: { value: 9.5, name: "power" },
    });

    expect(resultState).toEqual(expextedState);
  });
});
