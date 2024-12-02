import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDoorOpen, faShippingFast, faTruck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './DeliveryOrder.scss';

const DeliveryPage = () => {
  const [deliveryOption, setDeliveryOption] = useState('Standard');
  
  return (
    <div className="delivery-page">
      <div className="delivery-address">
        <h3>Deliver To</h3>
        <div className="address-block">
          <div className="address-icon">
            <FontAwesomeIcon icon={faBuilding} /> {/* Building icon */}
          </div>
          <div className="address-details">
            <p className="address-title">Patrick F. Taylor Hall</p>
            <p className="address-description">Patrick F. Taylor Hall, Baton Rouge, LA</p>
          </div>
          <button className="edit-oval-button">
            <FontAwesomeIcon icon={faPencilAlt} /> Edit
          </button>
        </div>
        <div className="address-block">
          <div className="address-icon">
            <FontAwesomeIcon icon={faDoorOpen} /> {/* Door icon */}
          </div>
          <div className="address-details">
            <p className="address-title">Meet at door</p>
            <p className="address-description">Add Delivery Instructions</p>
          </div>
          <button className="edit-oval-button">
            <FontAwesomeIcon icon={faPencilAlt} /> Edit
          </button>
        </div>
      </div>

      <div className="delivery-options">
        <h3>Delivery Options</h3>
        <div className="options">
          <button
            className={`option ${deliveryOption === 'Priority' ? 'active' : ''}`}
            onClick={() => setDeliveryOption('Priority')}
          >
            <div className="option-icon">
              <FontAwesomeIcon icon={faShippingFast} /> {/* Fast delivery icon */}
            </div>
            <div>
              <p className="option-title">Priority</p>
              <p className="option-description">15 - 20 minutes. Deliver straight to you!</p>
            </div>
            <p className="option-price">+$1.74</p>
          </button>
          <button
            className={`option ${deliveryOption === 'Standard' ? 'active' : ''}`}
            onClick={() => setDeliveryOption('Standard')}
          >
            <div className="option-icon">
              <FontAwesomeIcon icon={faTruck} /> {/* Standard delivery icon */}
            </div>
            <div>
              <p className="option-title">Standard</p>
              <p className="option-description">25 - 30 minutes.</p>
            </div>
          </button>
        </div>
      </div>

      <div className="order-type">
        <h3>Order Type</h3>
        <div className="order-type-options">
          <button className="oval-button active">Delivery</button>
          <button className="oval-button">Pick up</button>
        </div>
      </div>

      <button className="order-button">Order</button>
    </div>
  );
};

export default DeliveryPage;
