// src/views/Home/HomePopular/HomePopular.js
import React, { useState } from 'react';
import MovieGrid from '../../../components/MovieGrid/MovieGrid';
import MovieTable from '../../../components/MovieTable/MovieTable';
import URLService from '../../../services/URLService';
import './HomePopular.css';

function HomePopular() {
  const [viewType, setViewType] = useState('grid');
  const urlService = new URLService();
  const fetchUrl = urlService.getURL4PopularMovies();

  return (
    <div className="popular-container">
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewType === 'grid' ? 'active' : ''}`}
          onClick={() => setViewType('grid')}
        >
          Grid View
        </button>
        <button 
          className={`toggle-btn ${viewType === 'table' ? 'active' : ''}`}
          onClick={() => setViewType('table')}
        >
          Table View
        </button>
      </div>
      {viewType === 'grid' ? (
        <MovieGrid fetchUrl={fetchUrl} />
      ) : (
        <MovieTable fetchUrl={fetchUrl} />
      )}
    </div>
  );
}

export default HomePopular;
