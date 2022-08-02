import React from "react";
import { singleItem } from "../redux/singleItem";

class singleItem extends React.Component {
  render() {
    console.log(this);
    return (
      <div>
        <div>{this.props.items.name}</div>
        <div>{this.props.items.imageUrl}</div>
        <div>{this.props.items.price}</div>
        <button onClick>Add To Cart</button>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return { item: reduxState.singleItem };
};
const mapDispatch = (dispatch) => {
  return {
    singleItem: (id) => dispatch(singleItem(id)),
  };
};

export default connect(mapState, mapDispatch)(singleItem);
