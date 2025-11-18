import React from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';

const PropertyCard = ({ property, isFavList = false }) => {
  const { addFavourite, removeFavourite } = useFavourites();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('propertyId', property.id);
    e.dataTransfer.setData('propertyData', JSON.stringify(property));
  };

  return (
    <div 
      className="property-card" 
      draggable="true" 
      onDragStart={handleDragStart}
    >
      <div className="card-image">
        <img src={property.picture} alt={property.type} />
      </div>
      <div className="card-content">
        <h4>{property.location}</h4>
        <p className="price">£{property.price.toLocaleString()}</p>
        <div className="specs">
          <span>{property.type}</span> • <span>{property.bedrooms} Beds</span>
        </div>
        <p className="desc">{property.description}</p>
        
        {/* NEW WRAPPER FOR ALIGNMENT */}
        <div className="card-actions">
          <Link to={`/property/${property.id}`} className="btn-details">View Details</Link>
          
          {isFavList ? (
            <button onClick={() => removeFavourite(property.id)} className="btn-remove">Remove</button>
          ) : (
            <button onClick={() => addFavourite(property)} className="btn-fav">♥ Save</button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default PropertyCard;