import React from 'react';
import { connect } from 'react-redux';
import AllItems from './AllItems';
import Item from './Item';
import { fetchItems } from '../store/items';

/**
 * COMPONENT
 */
fetchItems();

export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      {username ? (
        <div>
          <h2>Welcome, {username}</h2>
          <AllItems />
        </div>
      ) : (
        <AllItems />
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    items: state.items,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
});

export default connect(mapState, mapDispatch)(Home);
