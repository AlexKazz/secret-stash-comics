import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleItem from "./components/SingleItem";
import AllItems from "./components/AllItems";
import Cart from "./components/Cart";
import Delete from "./components/Delete";
import Checkout from "./components/Checkout";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    // console.log(this.props);
    if (this.props.isLoggedIn === undefined) {
      return <div>Loading</div>;
      this.props.loadInitialData();
    } else {
      return (
        <div>
          {isLoggedIn ? (
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/deleted" component={Delete} />
              <Route path="/home" component={Home} />
              <Route exact path="/items/:id" component={SingleItem} />
              <Route exact path="/cart" component={Cart} />
              <Redirect to="/home" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route exact path="/items/:id" component={SingleItem} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
            </Switch>
          )}
        </div>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' is undefined if unchecked, false if not logged in, and the id of the current user logged in if logged in
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
