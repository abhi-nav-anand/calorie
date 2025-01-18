import React, { useState } from 'react';
import './DishForm.css';

const DishForm = () => {
  const [dishName, setDishName] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Dish: ${dishName}\nCalories: ${calories}\nImage uploaded: ${image}`);
  };

  return (
    <div className="form-container">
      <h1 className="title">Dish Calorie Form</h1>
      <form onSubmit={handleSubmit} className="dish-form">
        <div className="form-group">
          <label className="label">Dish Name</label>
          <input
            type="text"
            className="input"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter dish name"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Calories</label>
          <input
            type="number"
            className="input"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter calories"
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Upload Image</label>
          <input
            type="file"
            className="input"
            onChange={handleImageChange}
            required
          />
          {image && <img src={image} alt="Dish Preview" className="image-preview" />}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default DishForm;
