import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseconfig';
import Navbar from '../components/navbar';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'admin', 'dashboard'), (doc) => {
      if (doc.exists()) {
        setNotifications(doc.data().notifications || []);
      }
    });

    return () => unsub();
  }, []);

  const handleConfirmOrder = async (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].status = 'done';

    await updateDoc(doc(db, 'admin', 'dashboard'), {
      notifications: updatedNotifications,
    });
  };

  const confirmedOrders = notifications.filter(notification => notification.status === 'done');
  const unconfirmedOrders = notifications.filter(notification => notification.status !== 'done');

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. Use the navigation to manage products.</p>

      <div className="dashboard-container">
        <div className="orders-section">
          <h2>Unconfirmed Orders</h2>
          {unconfirmedOrders.length > 0 ? (
            unconfirmedOrders.map((order, index) => (
              <div key={index} className="notification-item">
                <p>
                  <strong>Product Purchased:</strong> {order.productName} (ID: {order.productId})<br/>
                  <strong>Color:</strong> <span className="color-ring" style={{ backgroundColor: order.color }}></span><br/>
                  <strong>Size:</strong> {order.size}<br/>
                  <strong>Quantity:</strong> {order.quantity}<br/>
                  <strong>Price:</strong>Da{order.price}<br/>
                  <strong>Phone Number:</strong> {order.phone}<br/>
                  <strong>Wilaya:</strong> {order.wilaya}<br/>
                  <strong>Timestamp:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleString()}
                </p>
                <img src={order.imageUrl} alt={order.productName} className="product-thumbnail" />
                <button onClick={() => handleConfirmOrder(index)}>Confirm Order</button>
              </div>
            ))
          ) : (
            <p>No unconfirmed orders</p>
          )}
        </div>

        <div className="orders-section">
          <h2>Confirmed Orders</h2>
          {confirmedOrders.length > 0 ? (
            confirmedOrders.map((order, index) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
