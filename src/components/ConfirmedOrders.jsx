import React from 'react';

const ConfirmedOrders = ({ orders }) => {
  return (
    <div>
      <h2>Confirmed Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="notification-item done">
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
          </div>
        ))
      ) : (
        <p>No confirmed orders</p>
      )}
    </div>
  );
};

export default ConfirmedOrders;
