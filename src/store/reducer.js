import { SET_PRODUCTS_REDUCER } from "../constant";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REDUCER:
      return {
        ...state,
        products: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
