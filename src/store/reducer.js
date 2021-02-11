import {
  SET_PRODUCTS_REDUCER,
  SET_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
  SET_FEATURES,
  INCREASE_QUANTITY,
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
  debugger;
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
    shopingCart: [...state.shopingCart, addProductTo],
  };
};

const increaseQuantity = (state, { id, quantity, selectedFeatures }) => {
  debugger;
  const { productByIds } = state.products;
  const shoppingCartNew = state.shopingCart.map((product) => {
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
    shopingCart: shoppingCartNew,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REDUCER:
      return setProducts(state, action.data);
    case SET_CURRENT_PRODUCT:
      return setCurrentProduct(state, action.data);
    case SET_FEATURES:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          selectedFeatures: {
            ...state.currentProduct.selectedFeatures,
            [action.data.name]: action.data.value,
          },
        },
      };
    case ADD_PRODUCT_TO_CART:
      return addToCart(state);
    case INCREASE_QUANTITY:
      return increaseQuantity(state, action.data);
    default:
      return state;
  }
};

export default reducer;
