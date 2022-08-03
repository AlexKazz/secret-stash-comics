import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/items';
import Item from './Item';

export class AllItems extends React.Component {
  async componentDidMount() {
    await this.props.fetchItems();
  }

  render() {
    return (
      
      <div style={{display: 'flex', padding: '20px'}}>
        
        {this.props.items.map((item) => ( // items should be item
            <Item item={item} />
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
});

export default connect(mapState, mapDispatch)(AllItems);
