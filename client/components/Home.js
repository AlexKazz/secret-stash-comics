import React from 'react';
import { connect } from 'react-redux';
import AllItems from './AllItems';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      {username ? (
        <div>
          <h3>Welcome, {username}</h3>
          <AllItems />
        </div>
      ) : (
        <div>
          <h1>hi</h1>
          <AllItems />
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
