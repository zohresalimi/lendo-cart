import {
  SET_PRODUCTS_REDUCER,
  SET_CURRENT_PRODUCT,
  ADD_PRODUCT_TO_CART,
  SET_FEATURES,
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
    shopingCart: [
      ...state.shopingCart,
      state.products.productByIds[state.currentProduct.id],
    ],
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
      return addToCart(state, action.data);
    default:
      return state;
  }
};

export default reducer;
