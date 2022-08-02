import React from 'react';
import { Link } from 'react-router-dom';

const item = ({ item }) => {
  return (
    <div className='item'>
      <Link to={`/items/${item.id}`}>
        <h2>{item.name}</h2>
      </Link>
      <img src={item.imageUrl} />
    </div>
  );
};

export default Item;
