import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/items';
import { sendItemThunk } from '../store/cart';
import Item from './Item';

export class AllItems extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchItems();
  }

  async addToCart(user, item, quantity) {
    await this.props.addToCart(user, item, quantity);
  }

  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {this.props.items.map(
          (
            item // items should be item
          ) => (
            <div style={{ padding: '16px' }}>
              <Item item={item} />

              <div>
                <button
                  type='button'
                  id='add-product-button'
                  onClick={() => this.addToCart(this.props.user, item, 1)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

const mapState = (reduxState) => ({
  // isLoggedIn: !!reduxState.auth.id,
  items: reduxState.items,
  user: reduxState.auth,
});

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
  addToCart: (user, item, quantity) =>
    dispatch(sendItemThunk(user, item, quantity)),
});

export default connect(mapState, mapDispatch)(AllItems);
