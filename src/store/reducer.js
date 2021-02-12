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
  let byId = {};
  let byColor = {};
  data.forEach((item) => {
    byId[item.id] = item;
    item.options?.forEach(({ quantity, color, ...opt }) => {
      const colorKey = typeof color === "object" ? color.join("/") : color;
      byColor[colorKey] = {
        ...byColor[colorKey],
        [item.id]: {
          remaining: quantity,
          ...opt,
        },
      };
    });
  });

  return {
    ...state,
    products: {
      items: data,
      byId,
      byColor,
    },
  };
};

const setCurrentProduct = (state, data) => {
  const currentProduct = { id: data.id };
  const selectedColor =
    data.options.find((option) => option.color)?.color || "";
  const [featureName, featureOptions] =
    Object.entries(state.products.byColor[selectedColor][data.id]).find(
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
  const { selectedFeatures, id } = state.currentProduct;
  const isSameItem = (item) =>
    item.id === id &&
    JSON.stringify(item.selectedFeatures) === JSON.stringify(selectedFeatures);
  const isAddedBefore = state.shoppingCart.some(isSameItem);
  let shoppingCart;

  if (isAddedBefore) {
    shoppingCart = state.shoppingCart.map((item) => {
      return {
        ...item,
        quantity: isSameItem(item) ? item.quantity + 1 : item.quantity,
      };
    });
  } else {
    shoppingCart = [
      ...state.shoppingCart,
      {
        ...state.currentProduct,
        quantity: 1,
      },
    ];
  }

  return {
    ...state,
    products: {
      ...state.products,
      byColor: {
        ...state.products.byColor,
        [selectedFeatures.color]: {
          ...state.products.byColor[selectedFeatures.color],
          [state.currentProduct.id]: {
            ...state.products.byColor[selectedFeatures.color][
              state.currentProduct.id
            ],
            remaining:
              state.products.byColor[selectedFeatures.color][
                state.currentProduct.id
              ].remaining - 1,
          },
        },
      },
    },
    shoppingCart,
  };
};

const increaseQuantity = (state, { id, selectedFeatures }) => {
  const isSameItem = (item) =>
    item.id === id &&
    JSON.stringify(item.selectedFeatures) === JSON.stringify(selectedFeatures);
  const shoppingCartNew = state.shoppingCart.map((product) => {
    if (product.id === id && isSameItem(product)) {
      product.quantity = product.quantity + 1;
    }
    return product;
  });

  return {
    ...state,
    products: {
      ...state.products,
      byColor: {
        ...state.products.byColor,
        [selectedFeatures.color]: {
          ...state.products.byColor[selectedFeatures.color],
          [id]: {
            ...state.products.byColor[selectedFeatures.color][id],
            remaining:
              state.products.byColor[selectedFeatures.color][id].remaining - 1,
          },
        },
      },
    },
    shoppingCart: shoppingCartNew,
  };
};

const decreaseQuantity = (state, { id, selectedFeatures }) => {
  const isSameItem = (item) =>
    item.id === id &&
    JSON.stringify(item.selectedFeatures) === JSON.stringify(selectedFeatures);
  const shoppingCartNew = state.shoppingCart.map((product) => {
    if (product.id === id && isSameItem(product)) {
      product.quantity = product.quantity - 1;
    }
    return product;
  });

  return {
    ...state,
    products: {
      ...state.products,
      byColor: {
        ...state.products.byColor,
        [selectedFeatures.color]: {
          ...state.products.byColor[selectedFeatures.color],
          [id]: {
            ...state.products.byColor[selectedFeatures.color][id],
            remaining:
              state.products.byColor[selectedFeatures.color][id].remaining + 1,
          },
        },
      },
    },
    shoppingCart: shoppingCartNew,
  };
};

const removeItem = (state, { id, quantity, selectedFeatures }) => {
  const isNotSameItem = (item) =>
    item.id !== id ||
    JSON.stringify(item.selectedFeatures) !== JSON.stringify(selectedFeatures);

  const shoppingCart = state.shoppingCart.filter(isNotSameItem);

  const byColor = {
    ...state.products.byColor,
    [selectedFeatures.color]: {
      ...state.products.byColor[selectedFeatures.color],
      [id]: {
        ...state.products.byColor[selectedFeatures.color][id],
        remaining:
          state.products.byColor[selectedFeatures.color][id].remaining +
          quantity,
      },
    },
  };

  return {
    ...state,
    shoppingCart,
    products: {
      ...state.products,
      byColor,
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
