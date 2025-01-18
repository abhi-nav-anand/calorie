import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FoodList.css';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/foods');
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="food-list-container">
      <h2 className="food-list-heading">Select Your Favorite Food</h2>
      <div className="food-grid">
        {foods.map((food) => (
          <div key={food._id} className="food-item-card">
            <img src={food.imageUrl} alt={food.name} className="food-image" />
            <div className="food-info">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-category">{food.category}</p>
              <p className="food-calories">{food.calories} Calories</p>
            </div>
          </div>
        ))}
      </div>
      <button className="go-to-selection-btn" onClick={() => navigate('/food-selection')}>
        Go to Food Selection
      </button>
    </div>
  );
};

export default FoodList;
