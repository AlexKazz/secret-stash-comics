import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getCartThunk, removeItems } from '../store/cart';

// import itemsReducer, { deleteItems } from "../store/items";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      items: [],
    };
    this.getCart = this.getCart.bind(this);
    this.removeItems = this.removeItems.bind(this);
  }
  async componentDidMount() {
    await this.props.getCart(this.props.user.id);
  }
  //   async componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.cart.quantity !== prevProps.cart.quantity) {
  //       await this.props.getCart(this.props.user.id);
  //       console.log(this.props)
  //   }
  // }

  async getCart() {
    console.log(this.props.user);
    await this.props.getCart(this.props.user.id);
  }
  async removeItems(user, item, quantity) {
    await this.props.removeItems(user, item, quantity);
    this.props.history.push('/deleted');
  }
  render() {
    let count = 0;
    let cart = this.props.cart || {};
    let items = cart.items || [];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.length ? (
          items.map((item) => {
            return (
              <div key={item.id} style={{ padding: '60px' }}>
                <img src={item.imageUrl} />
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button
                  onClick={() => this.removeItems(this.props.user, item, 0)}
                >
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <h2>Your cart is empty</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(getCartThunk(userId)),
  removeItems: (user, item, quantityChange) =>
    dispatch(removeItems(user, item, quantityChange)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
