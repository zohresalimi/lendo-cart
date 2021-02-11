import {
  SET_PRODUCTS_REDUCER,
  SET_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
  SET_FEATURES,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
} from "../constant";

const setProducts = (state, data) => {
  let productByIds = {};
  data.forEach((item) => {
    let byColor = {};
    productByIds[item.id] = item;
    item.options?.forEach(({ quantity, color, ...opt }) => {
      const colorKey = typeof color === "object" ? color.join("/") : color;
      byColor[colorKey] = {
        remaining: quantity,
        ...opt,
      };
    });
    productByIds[item.id] = {
      ...productByIds[item.id],
      byColor,
    };
  });

  return {
    ...state,
    products: {
      items: data,
      productByIds,
    },
  };
};

const setCurrentProduct = (state, data) => {
  const currentProduct = { id: data.id };
  const selectedColor = Object.keys(data.byColor)[0];
  const [featureName, featureOptions] =
    Object.entries(data.byColor[selectedColor]).find(
      (item) => item[0] !== "remaining"
    ) || [];

  return {
    ...state,
    currentProduct: {
      ...currentProduct,
      selectedFeatures: {
        color: selectedColor,
        ...(featureName && { [featureName]: featureOptions[0] }),
      },
    },
  };
};

const addToCart = (state) => {
  const { selectedFeatures } = state.currentProduct;
  const addProductTo = {
    quantity: 1,
    ...state.currentProduct,
  };

  return {
    ...state,
    products: {
      ...state.products,
      productByIds: {
        ...state.products.productByIds,
        [state.currentProduct.id]: {
          ...state.products.productByIds[state.currentProduct.id],
          byColor: {
            ...state.products.productByIds[state.currentProduct.id].byColor,
            [selectedFeatures.color]: {
              ...state.products.productByIds[state.currentProduct.id].byColor[
                selectedFeatures.color
              ],
              remaining:
                state.products.productByIds[state.currentProduct.id].byColor[
                  selectedFeatures.color
                ].remaining - 1,
            },
          },
        },
      },
    },
    shoppingCart: [...state.shoppingCart, addProductTo],
  };
};

const increaseQuantity = (state, { id, quantity, selectedFeatures }) => {
  const shoppingCartNew = state.shoppingCart.map((product) => {
    if (product.id === id) {
      product.quantity = product.quantity + 1;
    }
    return product;
  });

  return {
    ...state,
    products: {
      ...state.products,
      productByIds: {
        ...state.products.productByIds,
        [id]: {
          ...state.products.productByIds[id],
          byColor: {
            ...state.products.productByIds[id].byColor,
            [selectedFeatures.color]: {
              ...state.products.productByIds[id].byColor[
                selectedFeatures.color
              ],
              remaining:
                state.products.productByIds[id].byColor[selectedFeatures.color]
                  .remaining - 1,
            },
          },
        },
      },
    },
    shoppingCart: shoppingCartNew,
  };
};

const decreaseQuantity = (state, { id, quantity, selectedFeatures }) => {
  const shoppingCartNew = state.shoppingCart.map((product) => {
    if (product.id === id) {
      product.quantity = product.quantity - 1;
    }
    return product;
  });

  return {
    ...state,
    products: {
      ...state.products,
      productByIds: {
        ...state.products.productByIds,
        [id]: {
          ...state.products.productByIds[id],
          byColor: {
            ...state.products.productByIds[id].byColor,
            [selectedFeatures.color]: {
              ...state.products.productByIds[id].byColor[
                selectedFeatures.color
              ],
              remaining:
                state.products.productByIds[id].byColor[selectedFeatures.color]
                  .remaining + 1,
            },
          },
        },
      },
    },
    shoppingCart: shoppingCartNew,
  };
};

const removeItem = (state, { id, quantity, selectedFeatures }) => {
  const shoppingCart = state.shoppingCart.filter((item) => item.id !== id);
  const productByIds = {
    ...state.products.productByIds,
    [id]: {
      ...state.products.productByIds[id],
      byColor: {
        ...state.products.productByIds[id].byColor,
        [selectedFeatures.color]: {
          ...state.products.productByIds[id].byColor[selectedFeatures.color],
          remaining:
            state.products.productByIds[id].byColor[selectedFeatures.color]
              .remaining + quantity,
        },
      },
    },
  };

  return {
    ...state,
    shoppingCart,
    products: {
      ...state.products,
      productByIds,
    },
  };
};

const setFeatures = (state, data) => {
  return {
    ...state,
    currentProduct: {
      ...state.currentProduct,
      selectedFeatures: {
        ...state.currentProduct.selectedFeatures,
        [data.name]: data.value,
      },
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REDUCER:
      return setProducts(state, action.data);
    case SET_CURRENT_PRODUCT:
      return setCurrentProduct(state, action.data);
    case SET_FEATURES:
      return setFeatures(state, action.data);
    case ADD_PRODUCT_TO_CART:
      return addToCart(state);
    case INCREASE_QUANTITY:
      return increaseQuantity(state, action.data);
    case DECREASE_QUANTITY:
      return decreaseQuantity(state, action.data);
    case REMOVE_ITEM:
      return removeItem(state, action.data);
    default:
      return state;
  }
};

export default reducer;
