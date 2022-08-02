import axios from "axios";

const SINGLE_ITEM = "SINGLE_ITEM";

const _singleItem = (item) => ({
  type: SINGLE_ITEM,
  item,
});

export const singleItem = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/items/${id}`);

  dispatch(_singleItem(data));
};

const initialState = {};

export default function singleItemReducer(state = initialState, action) {
  switch (action.type) {
    case SINGLE_ITEM:
      return action.item;
    default:
      return state;
  }
}
