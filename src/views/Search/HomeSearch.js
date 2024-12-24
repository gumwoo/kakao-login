// src/views/Search/HomeSearch.js

import React, { useState } from 'react';
import MovieSearch from '../../components/MovieSearch/MovieSearch';
import MovieInfiniteScroll from '../../components/MovieInfiniteScroll/MovieInfiniteScroll';
import './HomeSearch.css';

function HomeSearch() {
  const [genreId, setGenreId] = useState('0');  // 28에서 0으로 변경
  const [ageId, setAgeId] = useState(-1);
  const [sortId, setSortId] = useState('popularity.desc');

  const genreCode = {
    '장르 (전체)': '0',
    'Action': '28',
    'Adventure': '12',
    'Comedy': '35',
    'Crime': '80',
    'Family': '10751',
    'Drama': '18',
    'Fantasy': '14',
    'Horror': '27',
    'Romance': '10749'
  };

  const sortingCode = {
    '정렬 (기본)': 'popularity.desc',
    '평점 높은순': 'vote_average.desc',
    '평점 낮은순': 'vote_average.asc',
    '최신순': 'release_date.desc',
    '오래된순': 'release_date.asc'
  };

  const ageCode = {
    '평점 (전체)': -1,
    '9~10': 9,
    '8~9': 8,
    '7~8': 7,
    '6~7': 6,
    '5~6': 5,
    '4~5': 4,
    '4점 이하': -2,
  };

  const changeOptions = (options) => {
    setGenreId(genreCode[options.originalLanguage]);
    setAgeId(ageCode[options.translationLanguage]);
    setSortId(sortingCode[options.sorting] || 'popularity.desc');
  };

  return (
    <div className="container-search">
      <div className="container-search-bar">
        <MovieSearch changeOptions={changeOptions} />
      </div>
      <div className="content-search">
        <MovieInfiniteScroll
          genreCode={genreId}
          sortingOrder={sortId}
          voteEverage={ageId}
        />
      </div>
    </div>
  );
}

export default HomeSearch;
