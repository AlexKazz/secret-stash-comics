import React from "react";
import { connect } from "react-redux";
import { _createdItem } from "../store/items";

class ItemForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: ""
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // let stateToken = {
    //   state: this.state,
    //   token: localStorage.getItem("Token:"),
    // };
    // console.log(`stateToken`, stateToken);

    this.props.createItem(this.state, this.props.history);
    this.setState({
      name: "",
      price: "",
    });
  };

  render() {
    return (
      <div id="container">
        <br />
        <br />
        <h2>Add A New Comic</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Comic Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Set A Price: </label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, history) => ({
  createItem: (item) => dispatch(_createdItem(item, history)),
});

export default connect(null, mapDispatchToProps)(ItemForm);