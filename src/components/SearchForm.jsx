import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAfter: '',
    dateBefore: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* Test expects this exact title */}
      <h3>Find Your Dream Home</h3>
      
      {/* Type */}
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select 
          id="type"
          name="type" 
          value={criteria.type} 
          onChange={handleChange} 
          className="form-control"
        >
          <option value="any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      {/* Price */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minPrice">Min Price:</label>
          <input 
            id="minPrice"
            type="number" 
            name="minPrice" 
            value={criteria.minPrice} 
            onChange={handleChange} 
            placeholder="£" 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxPrice">Max Price:</label>
          <input 
            id="maxPrice"
            type="number" 
            name="maxPrice" 
            value={criteria.maxPrice} 
            onChange={handleChange} 
            placeholder="£" 
            className="form-control"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Beds:</label>
          <input 
            id="minBedrooms"
            type="number" 
            name="minBedrooms" 
            value={criteria.minBedrooms} 
            onChange={handleChange} 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Beds:</label>
          <input 
            id="maxBedrooms"
            type="number" 
            name="maxBedrooms" 
            value={criteria.maxBedrooms} 
            onChange={handleChange} 
            className="form-control"
          />
        </div>
      </div>

      {/* Postcode */}
      <div className="form-group">
        <label htmlFor="postcode">Postcode:</label>
        <input 
          id="postcode"
          type="text" 
          name="postcode" 
          value={criteria.postcode} 
          onChange={handleChange} 
          className="form-control"
        />
      </div>

      {/* Dates */}
      <div className="form-group">
        <label>Added Between:</label>
        <div className="date-inputs">
           <input 
             type="date" 
             name="dateAfter" 
             value={criteria.dateAfter} 
             onChange={handleChange} 
             className="form-control" 
             aria-label="Date After"
           />
           <span>and</span>
           <input 
             type="date" 
             name="dateBefore" 
             value={criteria.dateBefore} 
             onChange={handleChange} 
             className="form-control"
             aria-label="Date Before"
           />
        </div>
      </div>

      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
};

export default SearchForm;