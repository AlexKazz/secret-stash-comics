import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1 className='StoreName'>Secret Stash Comics</h1>

    <nav className='NavBar'>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Link to='/home'>Home</Link>
          <a href='#' onClick={handleClick}>
            Logout
          </a>
          <Link to='/cart'>Cart</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/login' className='navText'>
            Login
          </Link>
          <Link to='/signup' className='navText'>
            Sign Up
          </Link>
          <Link to='/cart' className='navText'>
            Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      this.props.history.push('/login');
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
