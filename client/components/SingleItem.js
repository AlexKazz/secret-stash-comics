import React from 'react';
import { singleItem } from '../store/singleItem';
import { connect } from 'react-redux';
function dogs(){
  return
}
class SingleItem extends React.Component {
  async componentDidMount() {
    await this.props.singleItem(this.props.match.params.id);
  }

  render() {
    let item = this.props.item || {};

    return (
      <div>
        <img src={item.imageUrl}/>
        <div>{item.name}</div>
        <div>{item.price}</div>
        <button onClick={dogs()}>Add To Cart</button>
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

export default connect(mapState, mapDispatch)(SingleItem);
