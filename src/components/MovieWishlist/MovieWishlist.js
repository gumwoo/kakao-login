// src/components/MovieWishlist/MovieWishlist.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import './MovieWishlist.css';

function MovieWishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20; // 페이지당 표시할 영화 수

  const totalPages = Math.ceil(wishlist.length / moviesPerPage);

  const handleToggleWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
  };


  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = wishlist.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    // 찜 목록이 변경될 때 현재 페이지가 전체 페이지를 초과하면 첫 페이지로 리셋
    if (currentPage > totalPages) setCurrentPage(1);
  }, [wishlist, totalPages, currentPage]);

  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <p>총 {wishlist.length}개의 영화를 찜하셨습니다</p>
      </div>
      
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>아직 찜한 영화가 없습니다.</p>
          <p>마음에 드는 영화를 찜해보세요!</p>
        </div>
      ) : (
        <div className="grid-container">
          {currentMovies.map((movie) => (
            <div key={movie.id} className="wishlist-movie-card">
              <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
              <div className="movie-info-overlay">
                <h3 className="movie-title">{movie.title}</h3>
                <button
                  className="remove-button"
                  onClick={() => handleToggleWishlist(movie)}
                >
                  찜 취소
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default MovieWishlist;
