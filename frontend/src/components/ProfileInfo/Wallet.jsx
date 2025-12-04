import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../../assets/images/Logo.png";
import './Wallet.scss';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPlusCircle, faTrash, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Wallet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardType: '',
    isDefault: false
  });
  const [editingCardId, setEditingCardId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
  }, [user]);

  const handleNewCardChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 19);
      console.log(`[Wallet.jsx] handleNewCardChange: Cleaning cardNumber. Original: '${value}', Cleaned: '${processedValue}'`);
    }

    setNewCard(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
  };

  const validateCardNumber = (cardNumber) => {
    console.log('--- validateCardNumber START ---');
    console.log(`[Wallet.jsx] validateCardNumber: Input number: '${cardNumber}'`);

    const cleanedNumber = String(cardNumber).replace(/\D/g, ''); 

    if (!cleanedNumber || cleanedNumber.length < 13 || cleanedNumber.length > 19) {
        let reason = '';
        if (!cleanedNumber) reason = 'empty';
        else if (cleanedNumber.length < 13) reason = 'too short';
        else if (cleanedNumber.length > 19) reason = 'too long';
        console.log(`[Wallet.jsx] Validation failed (${reason}). Length: ${cleanedNumber.length}`);
        console.log('--- validateCardNumber END (Early Exit) ---');
        return false;
    }

    let sum = 0;
    let shouldDouble = false; 

    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let char = cleanedNumber.charAt(i);
      let digit = parseInt(char, 10);

      if (isNaN(digit)) {
          console.log(`[Wallet.jsx] Error: Character '${char}' at position ${i} is not a valid digit.`);
          console.log('--- validateCardNumber END (NaN detected) ---');
          return false;
      }

      console.log(`[Wallet.jsx] Loop i=${i}, char='${char}', parsed digit=${digit}, shouldDouble_before_check=${shouldDouble}`);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9; 
        }
        console.log(`[Wallet.jsx] Doubled and summed digit=${digit}`);
      }
      
      sum += digit;
      shouldDouble = !shouldDouble; 
      console.log(`[Wallet.jsx]    Current sum=${sum}, shouldDouble_after_calc=${shouldDouble}`);
    }

    const isValid = (sum % 10 === 0);
    console.log(`[Wallet.jsx] Final Luhn sum: ${sum}`);
    console.log(`[Wallet.jsx] Final Luhn check result (sum % 10 === 0): ${isValid}`);
    console.log('--- validateCardNumber END ---');
    return isValid;
  };


  const getCardType = (cardNumber) => {
    if (/^4/.test(cardNumber)) return 'Visa';
    if (/^5[1-5]/.test(cardNumber)) return 'MasterCard';
    if (/^3[47]/.test(cardNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cardNumber)) return 'Discover';
    return 'Unknown';
  };

  const handleAddOrUpdateCard = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Frontend: handleAddOrUpdateCard - New card data being sent:', newCard);
    if (!user || !user._id) {
      setMessage('Please log in to manage your wallet.');
      setMessageType('error');
      return;
    }

    if (!validateCardNumber(newCard.cardNumber.replace(/\s/g, ''))) {
      setMessage('Invalid card number. Please check your input.');
      setMessageType('error');
      return;
    }

    const cardData = {
      ...newCard,
      cardType: getCardType(newCard.cardNumber.replace(/\s/g, '')),
    };

    try {
        let response;
        if (editingCardId) {
            console.log('Frontend: Sending PUT request for card update.');
            response = await axios.put(`${API_BASE_URL}/api/profile/payment-card`, {
                userId: user._id,
                cardId: editingCardId,
                updatedCard: cardData
            }, { withCredentials: true });
        } else {
            console.log('Frontend: Sending POST request for adding new card.');
            response = await axios.post(`${API_BASE_URL}/api/profile/payment-card`, {
                userId: user._id,
                card: cardData
            }, { withCredentials: true });
        }

        console.log('Frontend: Received response from backend:', response.data);

        if (response.data.success) {
            dispatch(setUser(response.data.user));
            console.log('Frontend: Dispatched setUser. New user state after dispatch:', response.data.user); 
            setMessage(editingCardId ? 'Card updated successfully!' : 'Card added successfully!');
            setMessageType('success');
            setNewCard({ cardHolderName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '', cardType: '', isDefault: false });
            setEditingCardId(null);
            setShowAddCardForm(false);
        } else {
            setMessage(response.data.message || (editingCardId ? 'Failed to update card.' : 'Failed to add card.'));
            setMessageType('error');
        }
    } catch (error) {
        console.error('Frontend: Error adding/updating card:', error.response?.data || error.message); 
        setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        setMessageType('error');
    }
};

  const handleEditCard = (card) => {
    setNewCard({
      cardHolderName: card.cardHolderName,
      cardNumber: card.cardNumber,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: '',
      cardType: card.cardType,
      isDefault: card.isDefault
    });
    setEditingCardId(card._id);
    setShowAddCardForm(true);
    setMessage('');
    setMessageType('');
  };

  const handleDeleteCard = async (cardId) => {
    if (!user || !user._id) {
      setMessage('Please log in to manage your wallet.');
      setMessageType('error');
      return;
    }
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/profile/payment-card`, {
            data: { userId: user._id, cardId },
            withCredentials: true
          });

        if (response.data.success) {
          dispatch(setUser(response.data.user));
          setMessage('Card deleted successfully!');
          setMessageType('success');
        } else {
          setMessage(response.data.message || 'Failed to delete card.');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error deleting card:', error);
        setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        setMessageType('error');
      }
    }
  };

  const formatCardNumberDisplay = (number) => {
    if (!number) return '';
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length <= 4) return cleaned;
    return '**** **** **** ' + cleaned.slice(-4);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(currentYear + i);
    }
    return years;
  };
  if (!user) {
    return (
      <div className="wallet-page-wrapper">

        <div className="app-logo-position">
          <Link to="/">
            <img src={logoImage} alt="Logo" />
          </Link>
        </div>
        <h4 className="appname_login">Culture Cart</h4>

        <div className="wallet-feature-container">
          <p>Please log in to view your wallet details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-page-wrapper">

      <div className="app-logo-position">
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <h4 className="appname_login">Culture Cart</h4>

      <div className="wallet-feature-container">
        <h2>My Wallet & Payment Methods</h2>

        {message && <p className={`message ${messageType}`}>{message}</p>}

        <div className="wallet-section balance-section">
          <h3>Current Balance:</h3>
          <p className="balance">{user.walletBalance ? `$${user.walletBalance.toFixed(2)}` : '$0.00'}</p>
          <div className="wallet-actions">
            <button className="action-button">Add Funds</button>
            <button className="action-button">Withdraw Funds</button>
          </div>
        </div>

        <div className="wallet-section transaction-history-section">
          <h3>Transaction History</h3>
          <p>No transactions yet.</p>
        </div>

        <div className="wallet-section payment-methods-section">
          <h3>
            <FontAwesomeIcon icon={faCreditCard} /> Your Cards
          </h3>
          <div className="card-list">
            {user.paymentCards && user.paymentCards.length > 0 ? (
              user.paymentCards.map(card => (
                <div key={card._id} className={`card-item ${card.isDefault ? 'default-card' : ''}`}>
                  <div className="card-details">
                    <p><strong>{card.cardHolderName}</strong></p>
                    <p>{card.cardType} {formatCardNumberDisplay(card.cardNumber)}</p>
                    <p>Expires: {card.expiryMonth}/{card.expiryYear}</p>
                  </div>
                  <div className="card-actions">
                    {card.isDefault && <FontAwesomeIcon icon={faCheckCircle} className="default-indicator" title="Default Card" />}
                    <button onClick={() => handleEditCard(card)} title="Edit Card">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteCard(card._id)} title="Delete Card">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No payment cards added yet.</p>
            )}
          </div>

          <button className="add-card-button" onClick={() => {
            setShowAddCardForm(!showAddCardForm);
            setEditingCardId(null);
            setNewCard({ cardHolderName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '', cardType: '', isDefault: false }); 
            setMessage(''); setMessageType('');
          }}>
            <FontAwesomeIcon icon={faPlusCircle} /> {showAddCardForm ? 'Cancel' : 'Add New Card'}
          </button>

          {showAddCardForm && (
            <form onSubmit={handleAddOrUpdateCard} className="add-card-form">
              <h3>{editingCardId ? 'Edit Card' : 'Add New Card'}</h3>
              <div className="form-group">
                <label htmlFor="cardHolderName">Card Holder Name:</label>
                <input
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  value={newCard.cardHolderName}
                  onChange={handleNewCardChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleNewCardChange}
                  maxLength="19"
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  autoComplete="cc-number"
                />
              </div>
              <div className="form-group expiry-cvv-group">
                <div>
                  <label htmlFor="expiryMonth">Expiry Month:</label>
                  <select
                    id="expiryMonth"
                    name="expiryMonth"
                    value={newCard.expiryMonth}
                    onChange={handleNewCardChange}
                    required
                    autoComplete="cc-exp-month"
                  >
                    <option value="">Month</option>
                    {[...Array(12).keys()].map(i => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="expiryYear">Expiry Year:</label>
                  <select
                    id="expiryYear"
                    name="expiryYear"
                    value={newCard.expiryYear}
                    onChange={handleNewCardChange}
                    required
                    autoComplete="cc-exp-year"
                  >
                    <option value="">Year</option>
                    {getYearOptions().map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={newCard.cvv}
                    onChange={handleNewCardChange}
                    maxLength="4"
                    required={!editingCardId}
                    autoComplete="cc-csc"
                  />
                </div>
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newCard.isDefault}
                  onChange={handleNewCardChange}
                />
                <label htmlFor="isDefault">Set as default payment method</label>
              </div>
              <button type="submit" className="submit-button">
                {editingCardId ? 'Update Card' : 'Add Card'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
