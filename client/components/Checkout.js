import React from "react";
import { connect } from "react-redux";

// import { fetchAllUsers } from '../store/user';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="checkout">
        <h1>Your order is confirmed! </h1>
        <h2>Happy reading, nerd!</h2>
      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     user: state.user,
//     orderId: state.cartReducer.orderId,
//     cart: state.cartReducer.cart,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchAllUsers: () => dispatch(fetchAllUsers()),
//   };
// };

export default Checkout;
