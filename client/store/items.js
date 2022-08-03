import axios from 'axios';

const SET_ITEMS = 'SET_ITEMS';

export const setItems = (items) => ({
  type: SET_ITEMS,
  items,
});

export const fetchItems = () => async (dispatch) => {
  const { data } = await axios.get('/api/items');

  dispatch(setItems(data));
};

const initialState = [];

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  }
}
