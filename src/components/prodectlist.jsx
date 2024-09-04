// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => onEdit(product)} className="edit-button">Edit</button>
              <button onClick={() => onDelete(product.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
