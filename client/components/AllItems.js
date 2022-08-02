import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, deleteItem } from '../redux/items';
import Item from './Item';

export class AllItems extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <div>
        <h2>All Items:</h2>
        {this.props.items.map((items) => (
          <div key={item.id}>
            <Item item={item} />
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (reduxState) => ({
  items: reduxState.items,
});

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
  deleteItem: (itemId) => dispatch(deleteItem(itemId)),
});

export default connect(mapState, mapDispatch)(AllItems);
