import React from 'react';
// 1. CHANGED: Import HashRouter (aliased as Router so we don't break your existing code tags)
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './styles.css';

function App() {
  return (
    <FavouritesProvider>
      {/* 2. This <Router> is now actually a HashRouter */}
      <Router>
        <div className="app">
          <header className="main-header">
            <div className="container">
              {/* FIXED NAME HERE */}
              <h1>Estate Agent App</h1>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </div>
      </Router>
    </FavouritesProvider>
  );
}

export default App;