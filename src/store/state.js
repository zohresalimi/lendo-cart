/**
 * I decided to restructure the state and
 * group products by ID and color, because
 * we will have to access products with both
 * two factors in our components and to control
 * the quantity by this field
 */
const state = {
  products: {
    items: [],
    byId: {},
    byColor: {},
  },
  currentProduct: null,
  shoppingCart: [],
};

export default state;
