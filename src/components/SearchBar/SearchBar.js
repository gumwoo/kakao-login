// src/components/SearchBar/SearchBar.js

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery !== '') {
      // 검색어를 Local Storage에 저장
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const updatedHistory = [trimmedQuery, ...history.filter(q => q !== trimmedQuery)];
      const limitedHistory = updatedHistory.slice(0, 10); // 최근 10개만 저장
      localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
      setSearchHistory(limitedHistory);

      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // 클릭 이벤트 처리를 위해 딜레이 추가
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="영화를 검색하세요..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        autoComplete="off"
      />
      <button type="submit">검색</button>
      {showSuggestions && searchHistory.length > 0 && (
        <ul className="suggestions">
          {searchHistory
            .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
            .map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;
