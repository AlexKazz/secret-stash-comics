import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/items';
import { updateCartThunk } from '../store/cart';
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
  
  async addToCart(item) {
    await this.props.updateCart(this.props.user, item, 1);
  }

  render() {
    return (
      
      <div style={{display: 'flex', padding: '20px'}}>
        
        {this.props.items.map((item) => ( // items should be item
            <div>
            <Item item={item} />
            
           
              <div>
                <button
                  type="button"
                  id="add-product-button"
                  onClick={() => this.addToCart(item)}
                >
                  Add To Cart
                </button>
              </div>
            
          </div>

        ))}
      </div>
    );
  }
}

const mapState = (reduxState) => ({
  isLoggedIn: !!reduxState.auth.id,
  items: reduxState.items,
  user: reduxState.auth,
});

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(fetchItems()),
  updateCart: (user, item, quantityChange) =>
       dispatch(updateCartThunk(user, item, quantityChange)),
});

export default connect(mapState, mapDispatch)(AllItems);
