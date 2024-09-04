    // src/components/ProductCard.js
    import React from 'react';
    import './ProductCard.css';

    const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-color">Color: {product.color}</p>
        <p className="product-size">Size: {product.size}</p>
        </div>
    );
    };

    export default ProductCard;
