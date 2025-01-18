import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodSelection.css'; // Import custom CSS for styling

const FoodSelection = () => {
  // State to store food items fetched from backend
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);

  // Fetch food items from the backend when the component is mounted
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/foods/'); // API endpoint to fetch food data
        setFoodItems(response.data); // Store the fetched food data in state
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []); // Empty dependency array means it runs only once when the component mounts

  // Function to handle food item selection
  const toggleSelection = (item) => {
    const isSelected = selectedItems.some((selected) => selected._id === item._id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
    } else {
      // Add the item with default quantity of 1
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Handle quantity change inside the card
  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) } // Ensure quantity doesn't go below 1
          : item
      )
    );
  };

  // Calculate total calories from selected items
  const calculateTotalCalories = () => {
    return selectedItems.reduce((acc, item) => acc + item.calories * item.quantity, 0);
  };

  // Function to generate QR code with selected items
  const generateQRCode = async () => {
    try {
      const totalCalories = calculateTotalCalories();
      const qrData = {
        totalCalories,
        itemCount: selectedItems.length,
        items: selectedItems.map(item => item.name),
      };

      const response = await axios.post('http://localhost:5000/api/scan/generate', { qrData });
      setQrCodeData(response.data.qrData); // Set QR code data from the response
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="food-selection-container">
      <h1 className="main-heading">Choose Your Food</h1>
      <div className="food-list">
        {/* Display food items with images */}
        {foodItems.map((item) => (
          <div key={item._id} className="food-item">
            <div
              className={`food-card ${selectedItems.some((selected) => selected._id === item._id) ? 'selected' : ''}`}
              onClick={() => toggleSelection(item)} // Toggle selection on click
            >
              <img src={item.imageUrl} alt={item.name} className="food-image" />
              <h3 className="food-name">{item.name}</h3>
              <p className="food-calories">{item.calories} Calories</p>
            </div>

            {/* Quantity Controls below each food card */}
            {selectedItems.some((selected) => selected._id === item._id) && (
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, -1)} // Decrease quantity
                >
                  -
                </button>
                <span className="quantity">{selectedItems.find((selected) => selected._id === item._id).quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item._id, 1)} // Increase quantity
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="selected-food-section">
        <h2>Selected Food Items</h2>
        <ul className="selected-food-list">
          {selectedItems.map((item) => (
            <li key={item._id} className="selected-food-item">
              <span className="food-name">{item.name}</span> - {item.calories} Calories - {item.quantity} Qty
            </li>
          ))}
        </ul>

        <h3 className="total-calories">Total Calories: {calculateTotalCalories()}</h3>

        {/* Show QR code generation button only if there are selected items */}
        {selectedItems.length > 0 && (
          <button className="generate-qr-btn" onClick={generateQRCode}>Generate QR Code</button>
        )}
      </div>

      {qrCodeData && (
        <div className="qr-code-container">
          <h2>Generated QR Code</h2>
          <img src={qrCodeData} alt="QR Code" className="qr-code-img" />
        </div>
      )}
    </div>
  );
};

export default FoodSelection;
