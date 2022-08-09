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
      cart: {},
      items: [],
      quantity: 0,
    };
    this.getCart = this.getCart.bind(this);
    this.removeItems = this.removeItems.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
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
  checkOut(event, items) {
    console.log(items);
    items.forEach(async (item) => {
      await this.props.removeItems(this.props.user, item, 0);
    });
    this.props.history.push(Checkout);
  }
  async changeQuantity(user, item, quantity) {
    await this.props.updateItemQuantity(user, item, quantity);
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
    // console.log("123131231231321", this.state.items);
    // if(this.props.user.id){
    //     this.getCart()

    // }
    // user.orders[0].items[0].cart
    // const navigate = useNavigate();
    console.log(this.checkOut);
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
                {/* {console.log("item.cart", item.cart)} */}
                <div>{item.cart.quantity}</div>
                <form
                  onSubmit={(event) => this.changeQuantity(user, item, event)}
                >
                  <label>Quantity</label>
                  <input />
                </form>
              </div>
            );
          })
        ) : (
          <h2>Your cart is empty</h2>
        )}
        <div>
          <Link to="/checkout">
            <button onClick={(event) => this.checkOut(event, items)}>
              Checkout
            </button>
          </Link>
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
