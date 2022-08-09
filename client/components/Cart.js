import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getCartThunk, removeItems, sendItemThunk } from "../store/cart";
import Checkout from "./Checkout";

// import itemsReducer, { deleteItems } from "../store/items";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.getCart = this.getCart.bind(this);
    this.removeItems = this.removeItems.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  async componentDidMount() {
    await this.props.getCart(this.props.user.id);
    this.setState({
      items: this.props.cart.items,
    });
  }
  //   async componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.cart.quantity !== prevProps.cart.quantity) {
  //       await this.props.getCart(this.props.user.id);
  //       console.log(this.props)
  //   }
  // }
  checkOut() {
    this.props.history.push(Checkout);
  }
  async changeQuantity(user, item, quantity) {
    event.preventDefault();
    await this.props.updateItemQuantity(user, item, quantity);
  }
  changeHandler(event){
    event.preventDefault();
    this.setState({quantity: event.target.value})
  }

  async getCart() {
    console.log(this.props.user);
    await this.props.getCart(this.props.user.id);
  }
  async removeItems(user, item, quantity) {
    await this.props.removeItems(user, item, quantity);
    this.props.history.push("/deleted");
  }

  render() {
    let count = 0;
    let cart = this.props.cart || {};
    let items = cart.items || [];
    console.log("123131231231321", this.state.items);
    // if(this.props.user.id){
    //     this.getCart()

    // }
    // user.orders[0].items[0].cart

    return (
      <div>
        {items.length ? (
          items.map((item) => {
            return (
              <div key={item.id}>
                <img src={item.imageUrl} />
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button
                  onClick={() => this.removeItems(this.props.user, item, 0)}
                >
                  Delete
                </button>
                {console.log("item.cart", item.cart)}
                <div>{item.cart.quantity}</div>
                <form
                  onSubmit={(event) => this.changeQuantity(this.props.user, item, this.state.quantity)}
                >
                  <label>Quantity</label>
                  <input onFocus={(event) => event.target.value=''} onChange={(event) => this.changeHandler(event)} />
                  <button type="submit">Submit</button>
                </form>
              </div>
            );
          })
        ) : (
          <h2>Your cart is empty</h2>
        )}
        <div>
          <button onClick={this.checkOut}>Checkout</button>
        </div>
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
  updateItemQuantity: (user, item, quantity) =>
    dispatch(sendItemThunk(user, item, quantity)),
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
