import React from 'react';

const UnconfirmedOrders = ({ orders, onConfirm }) => {
  return (
    <div>
      <h2>Unconfirmed Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="notification-item">
            <p>
              <strong>Product Purchased:</strong> {order.productName} (ID: {order.productId})<br/>
              <strong>Color:</strong> <span className="color-ring" style={{ backgroundColor: order.color }}></span><br/>
              <strong>Size:</strong> {order.size}<br/>
              <strong>Quantity:</strong> {order.quantity}<br/>
              <strong>Price:</strong> ${order.price}<br/>
              <strong>Phone Number:</strong> {order.phoneNumber}<br/>
              <strong>Wilaya:</strong> {order.wilaya}<br/>
              <strong>Timestamp:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleString()}
            </p>
            <img src={order.imageUrl} alt={order.productName} className="product-thumbnail" />
            <button onClick={() => onConfirm(index)}>Confirm Order</button>
          </div>
        ))
      ) : (
        <p>No unconfirmed orders</p>
      )}
    </div>
  );
};

export default UnconfirmedOrders;
