import { SET_PRODUCTS_REDUCER } from "../constant";

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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REDUCER:
      return setProducts(state, action.data);
    default:
      return state;
  }
};

export default reducer;
