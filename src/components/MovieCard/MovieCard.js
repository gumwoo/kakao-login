// src/components/MovieCard/MovieCard.js
import React from 'react';
import URLService from '../../services/URLService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, onToggleWishlist, isInWishlist }) {
  const urlService = new URLService();
  const navigate = useNavigate();
  const posterUrl = urlService.getPosterUrl(movie.poster_path);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // 상세 페이지로 이동
  };

  return (
    <div className="custom-movie-card" onClick={handleClick}>
      <LazyLoadImage
        src={posterUrl}
        alt={movie.title}
        effect="blur"
        className="custom-movie-poster"
        placeholderSrc="/placeholder-image.jpg" // 대체 이미지 경로
      />
      <div className="custom-movie-title">{movie.title}</div>
      <button
        className="custom-wishlist-button"
        onClick={(e) => {
          e.stopPropagation(); // 부모의 onClick 이벤트 방지
          onToggleWishlist(movie);
        }}
      >
        {isInWishlist ? '찜 취소' : '찜하기'}
      </button>
    </div>
  );
}

export default MovieCard;
