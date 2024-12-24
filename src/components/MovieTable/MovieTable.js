/* src/components/MovieTable/MovieTable.js */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import URLService from '../../services/URLService';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MovieTable.css';

function MovieTable({ fetchUrl }) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const urlService = new URLService();
  const itemsPerPage = 4;

  // useQuery로 변경하여 데이터 가져오기
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['popularMoviesTable', currentPage],
    queryFn: async () => {
      // 현재 페이지의 데이터를 가져옴
      const response = await urlService.fetchPopularMovies(currentPage);
      return response;
    },
    keepPreviousData: true, // 이전 데이터 유지
  });

  if (isLoading) return <LoadingSpinner />;
  if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

  // 현재 페이지의 영화만 표시
  const currentMovies = data.slice(0, itemsPerPage);

  return (
    <div className="movie-table-wrapper">
      <div className="movie-table-container">
        <table>
          <thead>
            <tr>
              <th>포스터</th>
              <th>제목</th>
              <th>개봉일</th>
              <th>평점</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map(movie => (
              <tr key={movie.id}>
                <td>
                  <img 
                    src={urlService.getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="table-poster"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.vote_average.toFixed(1)}</td>
                <td>
                  <button
                    onClick={() => dispatch(toggleWishlist(movie))}
                    className={`wishlist-btn ${wishlist.some(w => w.id === movie.id) ? 'active' : ''}`}
                  >
                    {wishlist.some(w => w.id === movie.id) ? '찜 취소' : '찜하기'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span className="page-indicator">
            {currentPage}
          </span>
          <button
            className="page-btn"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isFetching || currentMovies.length < itemsPerPage}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieTable;