import axios from 'axios'

const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});
const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/users/${id}`);
      dispatch(getCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateCartThunk = (user, item, amount) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      const { data: updatedCart } = await axios.put(
        `/api/users/${user.id}`,
        {
          item: item,
          quantityChange: amount,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updateCart(updatedCart));
    } catch (e) {
      console.log(e);
    }
  };
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_CART: {
      return action.cart;
    }
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