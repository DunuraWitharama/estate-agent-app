import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import data from '../data/properties.json';

const PropertyPage = () => {
  const { id } = useParams();
  const property = data.properties.find(p => p.id === id);
  const [mainImg, setMainImg] = useState(property ? property.picture : '');

  if (!property) return <div>Property not found. <Link to="/">Go Back</Link></div>;

  // Use the new 7-image array
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.picture];

  return (
    <div className="property-page container">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="property-header">
        <h1>{property.type} in {property.location}</h1>
        <h2 className="price">£{property.price.toLocaleString()}</h2>
      </div>

      {/* Gallery */}
      <div className="gallery-section">
        <div className="main-image-display">
          <img src={mainImg} alt="Main" />
        </div>
        <div className="thumbnails-row">
          {galleryImages.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={`View ${idx}`} 
              onClick={() => setMainImg(img)} 
              className={mainImg === img ? 'active' : ''}
            />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="property-details-tabs">
        <Tabs>
          <TabList>
            <Tab>Full Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h3>Property Description</h3>
              <p dangerouslySetInnerHTML={{ __html: property.longDescription || property.description }}></p>
              <p><strong>Tenure:</strong> {property.tenure}</p>
              <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="tab-content floorplan">
               {/* Display the floorplan image if available */}
               {property.floorplan ? (
                  <img src={property.floorplan} alt="Floor Plan" style={{maxWidth: '100%', height: 'auto'}} />
               ) : (
                  <p>Floorplan not available.</p>
               )}
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="tab-content">
              <h3>Location</h3>
              <p>{property.location}</p>
                <iframe 
                width="100%" 
                height="300" 
                style={{border:0}} 
                loading="lazy"
                title="Property Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyPage;