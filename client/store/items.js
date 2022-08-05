import axios from "axios";

const SET_ITEMS = "SET_ITEMS";
// const DELETE_ITEMS = "DELETE_ITEMS";
export const setItems = (items) => ({
  type: SET_ITEMS,
  items,
});
const _deleteItems = (items) => ({
  type: DELETE_ITEMS,
  items,
});
export const fetchItems = () => async (dispatch) => {
  const { data } = await axios.get("/api/items");

  dispatch(setItems(data));
};
// export const deleteItems = (id, history) => {
//   return async (dispatch) => {
//     const { data } = await axios.delete(`/api/items/${id}`);
//     dispatch(_deleteItems(data));
//     history.push("/");
//   };
// };

const initialState = [];

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    // case DELETE_ITEMS:
    //   return state.filter((items) => items.id !== action.items.id);
    default:
      return state;
  }
}
