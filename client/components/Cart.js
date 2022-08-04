import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getCartThunk,
} from "../store/cart";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      items: []
    };
    this.getCart = this.getCart.bind(this);
  }
  async componentDidMount() {
    console.log(this.props.user, 'dog')
    await this.props.getCart(this.props.user.id);
  }
//   async componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.user !== prevProps.user) {
//       await this.props.getCart(this.props.user.id);
//       this.setState()
//       console.log(this.props)
//   }
// }
  async getCart() {
    console.log(this.props.user);
        await this.props.getCart(this.props.user.id);
        
  }

  render() {
    let count = 0
    let cart = this.props.cart || {};
    let items = cart.items || []
    // if(this.props.user.id){
    //     this.getCart()
        
    // }
    console.log(this.props)
    return (
      <div>
        {items.map((item) => {
            return(
            <div key={item.id}>
                <img src={item.imageUrl}/>
                <div>{item.name}</div>
                <div>{item.price}</div>
            </div>
            )
        })}
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.auth,
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCart: (userId) => dispatch(getCartThunk(userId))
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
