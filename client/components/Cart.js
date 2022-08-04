import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getCartThunk,
} from "../store/cart";

class Cart extends Component {
  
}

const mapState = (state) => ({
  
});

const mapDispatch = (dispatch) => ({
  
});

export default withRouter(connect(mapState, mapDispatch)(Cart));
