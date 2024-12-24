// src/components/MovieSearch/MovieSearch.js

import React, { useState, useEffect } from 'react';
import './MovieSearch.css';
import { useNavigate } from 'react-router-dom';

function MovieSearch({ changeOptions }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    originalLanguage: '장르 (전체)',
    translationLanguage: '평점 (전체)',
    sorting: '정렬 (기본)'
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdowns = {
    originalLanguage: ['장르 (전체)', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance'], // 장르 수 축소
    translationLanguage: ['평점 (전체)', '9~10', '8~9', '7~8', '6~7', '5~6'],
    sorting: ['정렬 (기본)', '평점 높은순', '평점 낮은순', '최신순','오래된순']
  };

  // 드롭다운 레이블 매핑 추가
  const dropdownLabels = {
    originalLanguage: '장르',
    translationLanguage: '평점',
    sorting: '정렬'
  };

  const dropdownEntries = Object.entries(dropdowns).map(([key, options]) => ({
    key,
    options,
  }));

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      // 검색어를 로컬 스토리지에 저장
      const updatedHistory = [trimmedQuery, ...searchHistory.filter(q => q !== trimmedQuery)];
      const limitedHistory = updatedHistory.slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      setSearchHistory(limitedHistory);

      // 검색 결과 페이지로 이동
      navigate(`/search/results?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const selectOption = (key, option) => {
    const newOptions = {
      ...selectedOptions,
      [key]: option,
    };
    setSelectedOptions(newOptions);
    setActiveDropdown(null);
    changeOptions(newOptions);
  };

  const clearOptions = () => {
    const defaultOptions = {
      originalLanguage: '장르 (전체)',
      translationLanguage: '평점 (전체)',
      sorting: '정렬 (기본)'
    };
    setSelectedOptions(defaultOptions);
    changeOptions(defaultOptions);
  };

  return (
    <div className="movie-search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="영화를 검색하세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="submit">검색</button>
        {showSuggestions && searchHistory.length > 0 && (
          <ul className="suggestions">
            {searchHistory
              .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </form>
      <div className="filter-section">
        <h3>필터링 옵션</h3>
        <div className="dropdown-container">
          {dropdownEntries.map((dropdown) => (
            <div key={dropdown.key} className="custom-select">
              <div className="select-selected" onClick={() => toggleDropdown(dropdown.key)}>
                {dropdownLabels[dropdown.key]}: {selectedOptions[dropdown.key]}
              </div>
              {activeDropdown === dropdown.key && (
                <div className="select-items">
                  {dropdown.options.map((option) => (
                    <div key={option} onClick={() => selectOption(dropdown.key, option)}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="clear-options" onClick={clearOptions}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;
