import axios from "axios";

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_ITEMS = "DELETE_ITEMS";
const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

const _deleteItems = (cart) => ({
  type: DELETE_ITEMS,
  cart,
});

export const getCartThunk = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const { data: cart } = await axios.get(`/api/users/${id}`);
      dispatch(getCart(cart));
    } catch (e) {
      console.log(e);
    }
  };
};
export const removeItems = (user, item, quantityChange) => {
  return async (dispatch) => {
    // const { data } = await axios.put(`/api/items/${id}`);
    const token = window.localStorage.getItem("token");
    const { data: updatedCart } = await axios.put(
      `/api/users/${user.id}`,
      { item: item, quantityChange: quantityChange },
      { headers: { authorization: token } }
    );
    dispatch(_deleteItems(updatedCart));
  };
};

export const sendItemThunk = (user, item, quantityChange) => {
  return async (dispatch) => {
    console.log('dog',user, item, quantityChange);
    try {
      const token = window.localStorage.getItem("token");

      const { data: updatedCart } = await axios.put(
        `/api/users/${user.id}`,
        { item: item, quantityChange: quantityChange },
        { headers: { authorization: token } }
      );
      dispatch(addToCart(updatedCart));
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
    case ADD_TO_CART: {
      return action.cart;
    }
    case DELETE_ITEMS:
      return action.cart;
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
