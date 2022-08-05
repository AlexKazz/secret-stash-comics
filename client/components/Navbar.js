import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1 className="StoreName">(Store Name)</h1>

    <nav className="NavBar">
      {isLoggedIn ? (
        // <div>
        //   {/* The navbar will show these links after you log in */}
        //   <Link to="/home">Home</Link>
        //   <a href="#" onClick={handleClick}>
        //     Logout
        //   <Link to="/cart">Cart</Link>
        //   </a>
        // </div>

        <ul className="NavList">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <a href="#" onClick={handleClick}>
              Logout
              <Link to="/cart">Cart</Link>
            </a>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="navText">Login</Link>
          <Link to="/signup" className="navText">Sign Up</Link>
          <Link to="/cart" className="navText">Cart</Link>
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
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
