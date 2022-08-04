import axios from 'axios'

const GET_CART = "GET_CART";


const getCart = (cart) => ({
  type: GET_CART,
  cart,
});


export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      // const { data: cart } = await axios.get();
    } catch (e) {
      console.log(e);
    }
  };
};


export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_CART: {
      return action.cart;
    }
    // case CHECKOUT_CART: {
    //   return action.previousOrder;
    // }
    // case REMOVE_PRODUCT: {
    //   return action.cart;
    // }
    default:
      return state;
  }
}