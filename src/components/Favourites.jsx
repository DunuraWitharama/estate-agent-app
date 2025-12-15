import React from 'react';
import { useFavourites } from '../context/FavouritesContext';
import PropertyCard from './PropertyCard';

const Favourites = () => {
  const { favourites, addFavourite, clearFavourites } = useFavourites();

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('propertyData');
    if (data) {
      addFavourite(JSON.parse(data));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div 
      className="favourites-sidebar"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3>My Favourites</h3>
      <p className="hint">Drag & Drop properties here</p>
      
      {favourites.length === 0 && <p className="empty">No saved properties</p>}
      
      <div className="fav-list">
        {favourites.map(prop => (
          <PropertyCard key={prop.id} property={prop} isFavList={true} />
        ))}
      </div>

      {favourites.length > 0 && (
        <button onClick={clearFavourites} className="btn-clear">Clear All</button>
      )}
    </div>
  );
};

export default Favourites;