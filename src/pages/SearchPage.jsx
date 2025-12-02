import React, { useState } from 'react';
import data from '../data/properties.json'; // Note: importing the whole object
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import Favourites from '../components/Favourites';

const SearchPage = () => {
  const [properties] = useState(data.properties); // Accessing the array inside the object
  const [filteredProperties, setFilteredProperties] = useState(data.properties);

  const handleSearch = (criteria) => {
    const results = properties.filter(prop => {
      // 1. Type
      const typeMatch = criteria.type === 'any' || prop.type === criteria.type;

      // 2. Price
      const minPriceMatch = !criteria.minPrice || prop.price >= Number(criteria.minPrice);
      const maxPriceMatch = !criteria.maxPrice || prop.price <= Number(criteria.maxPrice);

      // 3. Bedrooms
      const minBedMatch = !criteria.minBedrooms || prop.bedrooms >= Number(criteria.minBedrooms);
      const maxBedMatch = !criteria.maxBedrooms || prop.bedrooms <= Number(criteria.maxBedrooms);

      // 4. Postcode (Check if location contains the search term)
      // The JSON has "Petts Wood, Orpington BR5". We check if "BR5" or "BR" exists.
      const postcodeMatch = !criteria.postcode || 
        prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());

      // 5. Date Logic
      // Convert JSON date object to JS Date
      const propDate = new Date(`${prop.added.month} ${prop.added.day}, ${prop.added.year}`);
      
      let dateMatch = true;
      if (criteria.dateAfter) {
        dateMatch = dateMatch && propDate >= new Date(criteria.dateAfter);
      }
      if (criteria.dateBefore) {
        dateMatch = dateMatch && propDate <= new Date(criteria.dateBefore);
      }

      return typeMatch && minPriceMatch && maxPriceMatch && minBedMatch && maxBedMatch && postcodeMatch && dateMatch;
    });

    setFilteredProperties(results);
  };

  return (
    <div className="page-layout">
      <aside className="sidebar">
        <SearchForm onSearch={handleSearch} />
        <Favourites />
      </aside>
      
      <main className="results-container">
        <h2>Properties For Sale ({filteredProperties.length})</h2>
        <div className="properties-grid">
          {filteredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;