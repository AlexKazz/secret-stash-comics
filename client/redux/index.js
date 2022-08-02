import { combineReducers } from 'redux';
import itemsReducer from './items';
import singleItemReducer from './singleItem';

const appReducer = combineReducers({
  singleItem: singleItemReducer,
  items: itemsReducer,
});

export default appReducer;
